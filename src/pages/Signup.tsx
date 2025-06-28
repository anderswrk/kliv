import { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from "react-i18next";

// Types
interface Tenant {
  tagline?: string;
}

// Password strength calculation
const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;
  if (password.length < 5) return 33;
  if (password.length < 8) return 66;
  return 100;
};

const getPasswordStrengthColor = (strength: number): string => {
  if (strength === 0) return "bg-gray-300"; // Empty/no password
  if (strength <= 33) return "bg-red-500";
  if (strength <= 66) return "bg-orange-500";
  return "bg-green-500";
};

// Schema for step 1
const step1Schema = z.object({
  email: z.string().email(),
  name: z.string().min(2, "Full Name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  password2: z.string(),
}).refine((data) => data.password === data.password2, {
  message: "The passwords don't match.",
  path: ["password2"],
});

// Schema for step 2
const step2Schema = z.object({
  organizationName: z.string().min(1, "Company name is required"),
  domain: z.string()
    .min(1, "Domain is required")
    .max(15, "Domain must be 15 characters or less")
    .regex(/^[a-zA-Z0-9-]+$/, "The domain can only contain letters, numbers, and dashes."),
});

// Combined schema
const signupSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, "Full Name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  password2: z.string(),
  organizationName: z.string().optional(),
  domain: z.string().optional(),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function Signup() {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [googleClient, setGoogleClient] = useState<any>(null);
  const [isSimplified] = useState(true); // Always use simplified flow for now
  const formRef = useRef<HTMLFormElement>(null);
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  
  // Configuration
  const adminDomain = "kliv.dev";
  const oauthGoogleClientId = "154947828315-vn5v7fao25q1o5abf7dridftt0p1ehnu.apps.googleusercontent.com";
  const planType = searchParams.get("plan") || "free";
  const uuid = searchParams.get("uuid") || "";
  const prompt = searchParams.get("prompt") || "";
  
  const numberOfSteps = isSimplified ? 1 : 2;

  const form = useForm<SignupFormData>({
    resolver: zodResolver(isSimplified ? step1Schema : signupSchema),
    mode: "onSubmit", // Only validate on submit
    reValidateMode: "onSubmit", // Don't revalidate on change after error
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
      organizationName: "",
      domain: "",
    },
  });

  // Initialize component
  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await axios.get("/api/v1/tenant", {
          headers: {
            'Accept-Language': i18n.language
          }
        });
        setTenant(response.data);
      } catch (error) {
        console.error("Failed to load tenant info:", error);
      }

      // Handle URL parameters
      const keyedData = searchParams.get("key");
      if (keyedData) {
        try {
          const response = await axios.get(`/api/v1/user/key/${keyedData}`, {
            headers: {
              'Accept-Language': i18n.language
            }
          });
          const data = response.data;
          form.reset({
            email: data.email || "",
            name: data.name || "",
            password: data.password || "",
            password2: data.password || "",
            organizationName: data.organizationName || "",
            domain: data.domain || "",
          });
        } catch (error) {
          console.error("Failed to load keyed data:", error);
        }
      }

      // Handle name from URL param (with splitting logic)
      const name = searchParams.get("name");
      if (name) {
        form.setValue("name", name);
        // Note: The Vue component splits into firstName/lastName but doesn't use them
        // If needed in future: const [firstName, ...lastNameParts] = name.split(" ");
      }

      // Set email from URL param
      const email = searchParams.get("email");
      if (email) {
        form.setValue("email", email);
      }
    };

    initialize();
    initializeGoogleSignin();
    
    // Auto-focus first input
    setTimeout(() => {
      const firstInput = formRef.current?.querySelector('input[type="email"]');
      if (firstInput instanceof HTMLElement) {
        firstInput.focus();
      }
    }, 50);
  }, [searchParams, form, i18n.language]);

  // Google OAuth initialization
  const initializeGoogleSignin = useCallback(async () => {
    if (!oauthGoogleClientId) return;
    
    // Load Google script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    script.onload = () => {
      if (window.google) {
        const client = window.google.accounts.oauth2.initCodeClient({
          client_id: oauthGoogleClientId,
          scope: 'openid email profile',
          callback: (tokenResponse: any) => {
            onGoogleSignInSuccess(tokenResponse);
          },
        });
        setGoogleClient(client);
      }
    };
  }, [oauthGoogleClientId]);

  const onGoogleLoginClick = () => {
    if (googleClient) {
      googleClient.requestCode();
    }
  };

  const onGoogleSignInSuccess = async (googleUser: any) => {
    if (googleUser.error) {
      setErrorMessage(t('tenantSignup.googleAuthError'));
      return;
    }
    await submitSimplified({ googleToken: googleUser.code });
  };

  // Domain validation
  const validateDomain = async (domain: string): Promise<boolean> => {
    try {
      await axios.post("/api/v1/tenant/signup", {
        command: "domain",
        domain: domain
      }, {
        headers: {
          'Accept-Language': i18n.language
        }
      });
      return true;
    } catch (error: any) {
      if (error.response?.data?.message) {
        form.setError("domain", { message: error.response.data.message });
      }
      return false;
    }
  };

  // Handle successful signup
  const handleSuccessfulSignup = (paymentInfo: any, submissionData: any) => {
    const redirectUrl = paymentInfo.existingAccount
      ? paymentInfo.domain + "/!ui?atoken=" + paymentInfo.aToken
      : paymentInfo.url ?? (paymentInfo.domain + "/!ui/login?atoken=" + paymentInfo.atoken);

    // GTM tracking
    if (window.dataLayer) {
      let callbackFired = false;
      const gtmCallback = () => {
        if (!callbackFired) {
          callbackFired = true;
          window.location.href = redirectUrl;
        }
      };

      setTimeout(gtmCallback, 3000);

      const gtmData: any = {
        'event': 'signup',
        'plan_type': planType,
        'eventCallback': gtmCallback
      };

      if (submissionData.email) gtmData.user_email = submissionData.email;
      if (submissionData.name) gtmData.user_name = submissionData.name;
      if (submissionData.organizationName) gtmData.organization_name = submissionData.organizationName;
      if (submissionData.domain) gtmData.organization_domain = submissionData.domain;
      if (paymentInfo.tenantUuid) gtmData.tenant_uuid = paymentInfo.tenantUuid;

      window.dataLayer.push(gtmData);
    } else {
      window.location.href = redirectUrl;
    }
  };

  // Submit simplified flow
  const submitSimplified = async (additionalData: any = {}) => {
    const values = form.getValues();
    const submissionData: any = {
      email: values.email,
      name: values.name,
      password: values.password,
      password2: values.password2,
      ...additionalData,
      locale: i18n.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      prompt: prompt
    };

    // Only include domain and organizationName if they have values
    if (values.domain) {
      submissionData.domain = values.domain;
    }
    if (values.organizationName) {
      submissionData.organizationName = values.organizationName;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("/api/v1/tenant/signup", {
        command: "payment",
        uuid: uuid,
        data: submissionData
      }, {
        headers: {
          'Accept-Language': i18n.language
        }
      });

      const paymentInfo = response.data;

      if (paymentInfo.existingAccount) {
        window.location.href = paymentInfo.domain + "/!ui?atoken=" + paymentInfo.aToken;
      } else {
        handleSuccessfulSignup(paymentInfo, submissionData);
      }
    } catch (error: any) {
      if (error.response?.data) {
        const { error: errorCode, message, domain } = error.response.data;
        if (errorCode === "sso") {
          setErrorMessage(t('tenantSignup.ssoError').replace('{domain}', domain));
        } else if (errorCode === "user_exists") {
          setErrorMessage(t('tenantSignup.userExistsError'));
        } else {
          setErrorMessage(message);
        }
      } else {
        setErrorMessage(error.response?.statusText || error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Form submission handlers
  const onStep1Submit = async (values: SignupFormData) => {
    if (isSimplified) {
      await submitSimplified();
      return;
    }

    // Multi-step flow
    try {
      setIsLoading(true);
      await axios.post("/api/v1/tenant/signup", {
        command: "check",
        data: {
          email: values.email,
          password: values.password,
        }
      }, {
        headers: {
          'Accept-Language': i18n.language
        }
      });
      setErrorMessage(null);
      setStep(2);
    } catch (error: any) {
      if (error.response?.data) {
        const { error: errorCode, message, domain } = error.response.data;
        if (errorCode === "sso") {
          setErrorMessage(t('tenantSignup.ssoError').replace('{domain}', domain));
        } else if (errorCode === "user_exists") {
          setErrorMessage(t('tenantSignup.userExistsError'));
        } else {
          setErrorMessage(message);
        }
      } else {
        setErrorMessage(error.response?.statusText || error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onStep2Submit = async (values: SignupFormData) => {
    // Validate domain first
    if (values.domain) {
      const isValid = await validateDomain(values.domain);
      if (!isValid) return;
    }

    const submissionData = {
      ...values,
      locale: i18n.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    try {
      setIsLoading(true);
      const response = await axios.post("/api/v1/tenant/signup", {
        command: "payment",
        uuid: uuid,
        data: submissionData
      }, {
        headers: {
          'Accept-Language': i18n.language
        }
      });

      const paymentInfo = response.data;

      if (paymentInfo.existingAccount) {
        window.location.href = paymentInfo.domain + "/!ui?atoken=" + paymentInfo.aToken;
      } else {
        handleSuccessfulSignup(paymentInfo, submissionData);
      }
    } catch (error: any) {
      if (error.response?.data) {
        const { error: errorCode, message, domain } = error.response.data;
        if (errorCode === "sso") {
          setErrorMessage(t('tenantSignup.ssoError').replace('{domain}', domain));
        } else if (errorCode === "user_exists") {
          setErrorMessage(t('tenantSignup.userExistsError'));
        } else {
          setErrorMessage(message);
        }
      } else {
        setErrorMessage(error.response?.statusText || error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Watch password field for strength calculation
  const password = form.watch("password");
  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-200px)] pt-24">
        <div className="w-full max-w-[1000px]">
          <Card className="border-0 shadow-lg dark:bg-[#18181b] dark:text-white">
            <CardHeader className="text-center pb-4 pt-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold">{t('tenantSignup.getStarted')}</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-1 dark:text-zinc-300">
                {t('tenantSignup.defaultTagline')}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 sm:px-10 pb-6">
              <div className="text-right text-xs sm:text-sm text-muted-foreground dark:text-zinc-400 mb-4">
                {t('tenantSignup.step', { step: step, total: numberOfSteps })}
              </div>

              {errorMessage && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription dangerouslySetInnerHTML={{ __html: errorMessage }} />
                </Alert>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left: Image (desktop only) */}
                <div className="hidden lg:flex items-center justify-center">
                  <img
                    src={theme === 'dark' ? "https://data.rationalbi.com/assets/kliv/img/kliv-signup-dark.png" : "https://data.rationalbi.com/assets/kliv/img/kliv-signup-light.png"}
                    alt="Sign up illustration"
                    className="max-w-full max-h-[500px] object-contain"
                  />
                </div>
                {/* Right: Form, Divider, Google Signup */}
                <div className="flex flex-col justify-center w-full py-8 lg:py-0 lg:pl-12">
                  <Form {...form}>
                    <form ref={formRef} onSubmit={form.handleSubmit(step === 1 ? onStep1Submit : onStep2Submit)} className="space-y-4">
                      {step === 1 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="sm:col-span-2">
                                <FormLabel className="text-sm">{t('tenantSignup.email')} *</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    placeholder={t('tenantSignup.emailPlaceholder')} 
                                    autoComplete="email"
                                    className="h-10"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="sm:col-span-2">
                                <FormLabel className="text-sm">{t('tenantSignup.name')} *</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={t('tenantSignup.namePlaceholder')} 
                                    autoComplete="name"
                                    className="h-10"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between items-center">
                                  <FormLabel className="text-sm">{t('tenantSignup.password')} *</FormLabel>
                                  <div className="flex gap-1 w-20">
                                    <Progress 
                                      value={passwordStrength} 
                                      className={cn("h-1.5", getPasswordStrengthColor(passwordStrength))}
                                    />
                                  </div>
                                </div>
                                <FormControl>
                                  <Input 
                                    type="password" 
                                    placeholder={t('tenantSignup.passwordPlaceholder')} 
                                    autoComplete="new-password"
                                    className="h-10"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="password2"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">{t('tenantSignup.passwordConfirm')} *</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="password" 
                                    placeholder="" 
                                    autoComplete="new-password"
                                    className="h-10"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="organizationName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">{t('tenantSignup.companyName')} *</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={t('tenantSignup.companyNamePlaceholder')} 
                                    autoComplete="off"
                                    className="h-10"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="domain"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">{t('tenantSignup.adminDomain')} *</FormLabel>
                                <FormControl>
                                  <div className="flex">
                                    <Input 
                                      placeholder={t('tenantSignup.adminDomainPlaceholder')} 
                                      autoComplete="off"
                                      className="rounded-r-none h-10"
                                      {...field} 
                                    />
                                    <span className="inline-flex items-center px-3 border border-l-0 rounded-r-md bg-muted text-muted-foreground text-sm">
                                      .{adminDomain}
                                    </span>
                                  </div>
                                </FormControl>
                                <FormDescription className="text-xs">
                                  {t('tenantSignup.adminDomainHint')}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}

                      <div className="flex gap-3 pt-4">
                        {step === 2 && (
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full h-10"
                            onClick={() => {
                              setStep(1);
                              setErrorMessage(null);
                            }}
                            disabled={isLoading}
                          >
                            {t('tenantSignup.back')}
                          </Button>
                        )}
                        <Button type="submit" className="w-full h-10" disabled={isLoading}>
                          {isLoading ? t('common.loading') : t('tenantSignup.next')}
                        </Button>
                      </div>
                    </form>
                  </Form>

                  {/* Divider */}
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t dark:border-zinc-700" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background dark:bg-[#18181b] px-2 text-muted-foreground dark:text-zinc-400">{t('tenantSignup.or')}</span>
                    </div>
                  </div>

                  {/* Google Signup Button */}
                  <Button
                    variant="outline"
                    className="w-full mb-4"
                    onClick={onGoogleLoginClick}
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 19 19" fill="none">
                      <path d="M17.2627 7.9495H16.625V7.91665H9.5V11.0833H13.9741C13.3214 12.9267 11.5674 14.25 9.5 14.25C6.87681 14.25 4.75 12.1232 4.75 9.49998C4.75 6.87679 6.87681 4.74998 9.5 4.74998C10.7109 4.74998 11.8125 5.20677 12.6512 5.95292L14.8905 3.71369C13.4765 2.39596 11.5853 1.58331 9.5 1.58331C5.12802 1.58331 1.58334 5.128 1.58334 9.49998C1.58334 13.872 5.12802 17.4166 9.5 17.4166C13.872 17.4166 17.4167 13.872 17.4167 9.49998C17.4167 8.96917 17.362 8.45102 17.2627 7.9495Z" fill="#FFC107"/>
                      <path d="M2.49612 5.81517L5.09714 7.72269C5.80094 5.98023 7.50539 4.74998 9.5 4.74998C10.7109 4.74998 11.8125 5.20677 12.6512 5.95292L14.8905 3.71369C13.4765 2.39596 11.5852 1.58331 9.5 1.58331C6.45921 1.58331 3.82217 3.30004 2.49612 5.81517Z" fill="#FF3D00"/>
                      <path d="M9.5 17.4167C11.5449 17.4167 13.4029 16.6341 14.8077 15.3615L12.3575 13.2882C11.536 13.9129 10.5321 14.2508 9.5 14.25C7.44087 14.25 5.69248 12.937 5.03381 11.1047L2.45219 13.0938C3.76239 15.6576 6.42319 17.4167 9.5 17.4167Z" fill="#4CAF50"/>
                      <path d="M17.2627 7.94954H16.625V7.91669H9.5V11.0834H13.9741C13.6619 11.9607 13.0995 12.7273 12.3563 13.2885L12.3575 13.2877L14.8077 15.3611C14.6344 15.5187 17.4167 13.4584 17.4167 9.50002C17.4167 8.96921 17.362 8.45106 17.2627 7.94954Z" fill="#1976D2"/>
                    </svg>
                    {t('tenantSignup.signUpWithGoogle')}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center lg:text-left">
                    {t('tenantSignup.googleSignupTerms')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Add Google OAuth types
declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initCodeClient: (config: any) => any;
        };
      };
    };
    dataLayer: any[];
  }
}