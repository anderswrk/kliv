import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../components/theme-provider';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Separator } from '../components/ui/separator';
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft, Key, Shield } from 'lucide-react';
import axios from 'axios';
import { startAuthentication } from '@simplewebauthn/browser';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// Form schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const recoverySchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const totpSchema = z.object({
  code: z.string().length(6, 'Please enter a 6-digit code'),
});

const ssoSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RecoveryFormData = z.infer<typeof recoverySchema>;
type TotpFormData = z.infer<typeof totpSchema>;
type SsoFormData = z.infer<typeof ssoSchema>;

type LoginState = 'login' | 'recover' | 'totp' | 'sso' | 'sso-reauth';

interface LoginProps {
  knownFirstName?: string;
  knownEmail?: string;
  reauthentication?: boolean;
  embedded?: boolean;
  ssoBoot?: string;
  isSso?: boolean;
  display?: string;
  oauthGoogleClientId?: string;
  oauthMicrosoftClientId?: string;
  onAuthenticated?: () => void;
}

export default function Login({
  knownFirstName,
  knownEmail,
  reauthentication = false,
  embedded = false,
  ssoBoot,
  isSso = false,
  display,
  oauthGoogleClientId = '154947828315-vn5v7fao25q1o5abf7dridftt0p1ehnu.apps.googleusercontent.com',
  oauthMicrosoftClientId,
  onAuthenticated
}: LoginProps) {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [state, setState] = useState<LoginState>('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [authReason, setAuthReason] = useState<string | null>(null);
  const [ignoreKnownEmail, setIgnoreKnownEmail] = useState(false);
  const [atoken, setAtoken] = useState<string | null>(null);
  const [loginData, setLoginData] = useState<any>({});
  const googleClientRef = useRef<any>(null);

  // Form instances
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: knownEmail || '',
      password: '',
    },
  });

  const recoveryForm = useForm<RecoveryFormData>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      email: '',
    },
  });

  const totpForm = useForm<TotpFormData>({
    resolver: zodResolver(totpSchema),
    defaultValues: {
      code: '',
    },
  });

  const ssoForm = useForm<SsoFormData>({
    resolver: zodResolver(ssoSchema),
    defaultValues: {
      email: '',
    },
  });

  // Initialize Google Sign-In
  useEffect(() => {
    const initializeGoogleSignin = async () => {
      if (!oauthGoogleClientId) return;
      
      try {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          if (window.google) {
            googleClientRef.current = google.accounts.oauth2.initCodeClient({
              client_id: oauthGoogleClientId,
              scope: 'openid email profile',
              callback: (tokenResponse: any) => {
                onSignInSuccess(tokenResponse);
              },
              error_callback: (error: any) => {
                onSignInError(error);
              }
            });
          }
        };

        script.onerror = () => {
          console.error('Failed to load Google OAuth script');
          setMessage('Failed to load Google authentication');
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to initialize Google Sign-In:', error);
        setMessage('Failed to initialize Google authentication');
      }
    };

    if (ssoBoot) {
      window.location.href = `/!saml/login/${ssoBoot}?return=${encodeURIComponent(window.location.href)}`;
    } else {
      initializeGoogleSignin();
    }
  }, [oauthGoogleClientId, ssoBoot]);

  // Check for atoken on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const atokenParam = urlParams.get('atoken');
    
    if (atokenParam) {
      setAtoken(atokenParam);
      onSubmit({ aToken: atokenParam });
    }

    if (isSso && reauthentication) {
      setState('sso-reauth');
    }
  }, [isSso, reauthentication]);

  const clearAuthenticationData = () => {
    setLoginData({});
    setMessage(null);
  };

  const onBackToLogin = () => {
    setState('login');
    clearAuthenticationData();
    setResetSuccess(false);
  };

  const onRecoveryButtonClick = () => {
    setState('recover');
    clearAuthenticationData();
  };

  const onSsoButtonClick = () => {
    setState('sso');
    clearAuthenticationData();
  };

  const onNotKnownUserClick = async () => {
    try {
      await axios.delete('/api/v1/user/session', {
        headers: {
          'Accept-Language': i18n.language
        }
      });
      setIgnoreKnownEmail(true);
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  };

  const onGoogleLoginClick = () => {
    if (googleClientRef.current) {
      googleClientRef.current.requestCode();
    }
  };

  const onSignInSuccess = (googleUser: any) => {
    onSubmit({ googleToken: googleUser.code });
  };

  const onSignInError = (error: any) => {
    console.error('Google Sign-In error:', error);
    setMessage('Unable to authenticate with Google');
  };

  const loginAzureAd = async () => {
    try {
      setMessage('Microsoft authentication requires MSAL.js implementation');
    } catch (error) {
      setMessage('Unable to authenticate with Microsoft');
      console.error(error);
    }
  };

  const onPasskeyLoginClick = async () => {
    try {
      setLoading(true);
      const passkeyData = await axios.post('/api/v1/user/passkey', {
        command: 'assert'
      }, {
        headers: {
          'Accept-Language': i18n.language
        }
      });

      const passkeyResponse = passkeyData.data;
      passkeyResponse.data.publicKey.allowedCredentials = [];
      console.log("Assert", passkeyResponse.data);

      const publicKeyCredential = await startAuthentication({
        optionsJSON: passkeyResponse.data.publicKey
      });

      setLoading(false);
      await onSubmit({ passkeyToken: publicKeyCredential, uuid: passkeyResponse.uuid });

    } catch (error) {
      console.error('Passkey authentication error:', error);
      setMessage('Unable to authenticate with the selected passkey.');
    } finally {
      setLoading(false);
    }
  };

  const onReauthenticateWithSSOButtonClick = () => {
    setMessage('SSO reauthentication requires organization UUID');
  };

  const onSubmit = async (data: any) => {
    setMessage(null);
    setLoading(true);

    const submitData = {
      email: data.email ?? knownEmail,
      password: data.password,
      googleToken: data.googleToken,
      azureAdToken: data.azureAdToken,
      passkeyToken: data.passkeyToken,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      embedded,
      aToken: data.aToken,
      uuid: data.uuid
    };

    try {
      const sessionResponse = await axios.post('/api/v1/user/session', submitData, {
        headers: {
          'Accept-Language': i18n.language
        }
      });

      console.log("Session response", sessionResponse);
      
      if (sessionResponse.data.url) {
        // Strip language code from URL using regex
        let redirectUrl = sessionResponse.data.url;
        redirectUrl = redirectUrl.replace(/\/[a-z]{2}\/login(\?|$)/, '/login$1');
        window.location.href = redirectUrl;
        return;
      }

      if (display === 'popup') {
        onAuthenticated?.();
        return;
      }

      // Handle successful login redirect
      let targetUrl = window.location.href;
      const updatedUrl = new URL(targetUrl);
      const params = new URLSearchParams(updatedUrl.search);

      params.delete('atoken');
      params.delete('auth');

      if (params.toString() === '') {
        targetUrl = updatedUrl.origin + "/!ui";
      } else {
        targetUrl = updatedUrl.origin + '/!ui?' + params.toString();
      }

      if (window.location.href === targetUrl) {
        window.location.reload();
      } else {
        window.location.href = targetUrl;
      }
    } catch (error: any) {
      setLoading(false);
      
      if (error.response?.data?.error === 'sso') {
        window.location.href = `/!saml/login/${error.response.data.domain}?return=${encodeURIComponent(window.location.href)}`;
        return;
      } else if (error.response?.data?.error === 'totp') {
        setLoginData(data);
        setState('totp');
        return;
      }

      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.statusText) {
        setMessage(error.response.statusText);
      } else {
        setMessage(error.message);
      }
    }
  };

  const onRecoverSubmit = async (data: RecoveryFormData) => {
    setMessage(null);
    try {
      await axios.post('/api/v1/user/reset_password', { email: data.email }, {
        headers: {
          'Accept-Language': i18n.language
        }
      });
      setResetSuccess(true);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.statusText) {
        setMessage(error.response.statusText);
      } else {
        setMessage(error.message);
      }
    }
  };

  const onTotpSubmit = async (data: TotpFormData) => {
    setMessage(null);
    try {
      const sessionResponse = await axios.post('/api/v1/user/session', {
        email: loginData.email ?? knownEmail,
        password: loginData.password,
        twoFactorTotp: data.code,
        embedded
      }, {
        headers: {
          'Accept-Language': i18n.language
        }
      });

      console.log("TOTP Session response", sessionResponse);
      
      if (sessionResponse.data.url) {
        window.location.href = sessionResponse.data.url;
        return;
      }

      if (display === 'popup') {
        onAuthenticated?.();
        return;
      }

      // Handle successful login redirect - same logic as main login
      let targetUrl = window.location.href;
      const updatedUrl = new URL(targetUrl);
      const params = new URLSearchParams(updatedUrl.search);

      params.delete('atoken');
      params.delete('auth');

      if (params.toString() === '') {
        targetUrl = updatedUrl.origin + "/!ui";
      } else {
        targetUrl = updatedUrl.origin + '/!ui?' + params.toString();
      }

      if (window.location.href === targetUrl) {
        window.location.reload();
      } else {
        window.location.href = targetUrl;
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.statusText) {
        setMessage(error.response.statusText);
      } else {
        setMessage(error.message);
      }
    }
  };

  const onSsoSubmit = async (data: SsoFormData) => {
    setMessage(null);
    const domain = data.email.split('@')[1];
    
    try {
      const ssoInfo = await axios.post('/api/v1/user/check_sso', { domain }, {
        headers: {
          'Accept-Language': i18n.language
        }
      });
      window.location.href = `/!saml/login/${ssoInfo.data.data}?return=${encodeURIComponent(window.location.href)}`;
    } catch (error: any) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.statusText) {
        setMessage(error.response.statusText);
      } else {
        setMessage(error.message);
      }
    }
  };

  const handleLoginSubmit = (data: LoginFormData) => {
    setLoginData(data);
    onSubmit(data);
  };

  if (atoken) {
    return null; // Loading state while processing atoken
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 pt-28 sm:pt-24 lg:pt-20">
        <div className="w-full max-w-[1000px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Image (desktop only) */}
            <div className="hidden lg:flex items-center justify-center">
              <img
                src={theme === 'dark' ? "https://data.rationalbi.com/assets/kliv/img/kliv-signup-dark.png" : "https://data.rationalbi.com/assets/kliv/img/kliv-signup-light.png"}
                alt="Login"
                className="w-full max-w-md"
              />
            </div>

            {/* Right side - Login form */}
            <div className="flex justify-center">
              <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">
                    {t('login.welcomeBack')}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {t('login.enterCredentials')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Error/Success Messages */}
                  {message && (
                    <Alert variant="destructive">
                      <AlertDescription>{message}</AlertDescription>
                    </Alert>
                  )}

                  {resetSuccess && (
                    <Alert>
                      <AlertDescription>{t('login.resetSuccess')}</AlertDescription>
                    </Alert>
                  )}

                  {authReason && (
                    <Alert>
                      <AlertDescription>{authReason}</AlertDescription>
                    </Alert>
                  )}

                  {/* SSO Reauthentication */}
                  {state === 'sso-reauth' && (
                    <div className="space-y-4">
                      <p className="text-center">{t('login.reauthenticateWithSAML')}</p>
                      <Button 
                        onClick={onReauthenticateWithSSOButtonClick}
                        className="w-full"
                        disabled={loading}
                      >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t('login.continue')}
                      </Button>
                    </div>
                  )}

                  {/* SSO Form */}
                  {state === 'sso' && (
                    <Form {...ssoForm}>
                      <form onSubmit={ssoForm.handleSubmit(onSsoSubmit)} className="space-y-4">
                        <FormField
                          control={ssoForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('login.ssoSchema.email')}</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder={t('login.ssoSchema.emailPlaceholder')}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {t('login.goToLoginButton')}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={onBackToLogin}
                          className="w-full"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          {t('login.logInWithoutSSO')}
                        </Button>
                      </form>
                    </Form>
                  )}

                  {/* Recovery Form */}
                  {state === 'recover' && (
                    <Form {...recoveryForm}>
                      <form onSubmit={recoveryForm.handleSubmit(onRecoverSubmit)} className="space-y-4">
                        <FormField
                          control={recoveryForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('login.recoverySchema.email')}</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder={t('login.recoverySchema.emailPlaceholder')}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {t('login.send')}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={onBackToLogin}
                          className="w-full"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          {t('login.returnToLogin')}
                        </Button>
                      </form>
                    </Form>
                  )}

                  {/* TOTP Form */}
                  {state === 'totp' && (
                    <div className="space-y-4">
                      <p className="text-center">{t('login.enterCode')}</p>
                      <Form {...totpForm}>
                        <form onSubmit={totpForm.handleSubmit(onTotpSubmit)} className="space-y-4">
                          <FormField
                            control={totpForm.control}
                            name="code"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('login.totpSchema.code')}</FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder={t('login.totpSchema.enterDigitCode')}
                                    maxLength={6}
                                    autoComplete="one-time-code"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {t('login.logInButton')}
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={onBackToLogin}
                            className="w-full"
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {t('login.cancel')}
                          </Button>
                        </form>
                      </Form>
                    </div>
                  )}

                  {/* Main Login Form */}
                  {state === 'login' && (
                    <>
                      {/* Welcome back message */}
                      {knownEmail && !ignoreKnownEmail && (
                        <div className="text-center mb-4">
                          <p>
                            {t(reauthentication ? 'login.pleaseReauthenticate' : 'login.welcomeBackWithName', { 
                              knownFirstName: knownFirstName || 'User' 
                            })}
                          </p>
                          {!reauthentication && (
                            <p className="text-sm text-muted-foreground">
                              Not {knownFirstName}?{' '}
                              <button
                                type="button"
                                onClick={onNotKnownUserClick}
                                className="text-primary hover:underline"
                              >
                                Click here
                              </button>
                            </p>
                          )}
                        </div>
                      )}

                      <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
                          {/* Email field (hidden if known email and not ignored) */}
                          {(!knownEmail || ignoreKnownEmail) && (
                            <FormField
                              control={loginForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t('login.loginSchema.email')}</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="email"
                                      placeholder={t('login.loginSchema.emailPlaceholder')}
                                      autoComplete="email"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}

                          {/* Password field */}
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('login.loginSchema.password')}</FormLabel>
                                <FormControl>
                                  <Input
                                    type="password"
                                    placeholder={t('login.loginSchema.passwordPlaceholder')}
                                    autoComplete="current-password"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Forgot password link */}
                          {!reauthentication && (
                            <div className="text-right">
                              <button
                                type="button"
                                onClick={onRecoveryButtonClick}
                                className="text-sm text-primary hover:underline"
                              >
                                {t('login.forgotPassword')}
                              </button>
                            </div>
                          )}

                          <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {t(reauthentication ? 'login.continueButton' : 'login.logInButton')}
                          </Button>
                        </form>
                      </Form>

                      {/* OAuth Buttons */}
                      <div className="space-y-3">
                        <div className="relative my-4">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t dark:border-zinc-700" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background dark:bg-card px-2 text-muted-foreground dark:text-zinc-400">{t('login.or')}</span>
                          </div>
                        </div>

                        {/* Google OAuth */}
                        {oauthGoogleClientId && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={onGoogleLoginClick}
                            className="w-full"
                            disabled={loading}
                          >
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 19 19" fill="none">
                              <path d="M17.2627 7.9495H16.625V7.91665H9.5V11.0833H13.9741C13.3214 12.9267 11.5674 14.25 9.5 14.25C6.87681 14.25 4.75 12.1232 4.75 9.49998C4.75 6.87679 6.87681 4.74998 9.5 4.74998C10.7109 4.74998 11.8125 5.20677 12.6512 5.95292L14.8905 3.71369C13.4765 2.39596 11.5853 1.58331 9.5 1.58331C5.12802 1.58331 1.58334 5.128 1.58334 9.49998C1.58334 13.872 5.12802 17.4166 9.5 17.4166C13.872 17.4166 17.4167 13.872 17.4167 9.49998C17.4167 8.96917 17.362 8.45102 17.2627 7.9495Z" fill="#FFC107"/>
                              <path d="M2.49612 5.81517L5.09714 7.72269C5.80094 5.98023 7.50539 4.74998 9.5 4.74998C10.7109 4.74998 11.8125 5.20677 12.6512 5.95292L14.8905 3.71369C13.4765 2.39596 11.5852 1.58331 9.5 1.58331C6.45921 1.58331 3.82217 3.30004 2.49612 5.81517Z" fill="#FF3D00"/>
                              <path d="M9.5 17.4167C11.5449 17.4167 13.4029 16.6341 14.8077 15.3615L12.3575 13.2882C11.536 13.9129 10.5321 14.2508 9.5 14.25C7.44087 14.25 5.69248 12.937 5.03381 11.1047L2.45219 13.0938C3.76239 15.6576 6.42319 17.4167 9.5 17.4167Z" fill="#4CAF50"/>
                              <path d="M17.2627 7.94954H16.625V7.91669H9.5V11.0834H13.9741C13.6619 11.9607 13.0995 12.7273 12.3563 13.2885L12.3575 13.2877L14.8077 15.3611C14.6344 15.5187 17.4167 13.4584 17.4167 9.50002C17.4167 8.96921 17.362 8.45106 17.2627 7.94954Z" fill="#1976D2"/>
                            </svg>
                            {t(reauthentication ? 'login.continueWithGoogle' : 'login.signInWithGoogle')}
                          </Button>
                        )}

                        {/* Microsoft OAuth */}
                        {oauthMicrosoftClientId && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={loginAzureAd}
                            className="w-full"
                            disabled={loading}
                          >
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 19 19" fill="none">
                              <path d="M9.0299 9.0299H0V0H9.0299V9.0299Z" fill="#F1511B"/>
                              <path d="M19 9.0299H9.97018V0H19V9.0299Z" fill="#80CC28"/>
                              <path d="M9.02968 19.0001H0V9.97021H9.02968V19.0001Z" fill="#00ADEF"/>
                              <path d="M19 19.0001H9.97018V9.97021H19V19.0001Z" fill="#FBBC09"/>
                            </svg>
                            {t(reauthentication ? 'login.continueWithMicrosoft' : 'login.signInWithMicrosoft')}
                          </Button>
                        )}

                        {/* Passkey */}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={onPasskeyLoginClick}
                          className="w-full"
                          disabled={loading}
                        >
                          <Key className="mr-2 h-4 w-4" />
                          {t(reauthentication ? 'login.continueWithPasskey' : 'login.signInWithPasskey')}
                        </Button>

                        {/* SSO Link */}
                        {!reauthentication && (
                          <div className="text-center">
                            <button
                              type="button"
                              onClick={onSsoButtonClick}
                              className="text-sm text-primary hover:underline"
                            >
                              {t('login.logInWithSSO')}
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
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
  }
}