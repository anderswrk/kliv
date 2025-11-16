/*
 * Copyright 2025 Rational Ventures Inc.
 * RATIONAL VENTURES INC PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF RATIONAL VENTURES INC.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */

import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {Card, CardContent} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {DollarSign} from 'lucide-react';
import {PlanCard} from '@/components/pricing/PlanCard';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';

interface Plan {
    uuid: string;
    productName: string;
    group?: string;
    name: string;
    features: string;
    planType: 'free' | 'recurring' | 'url';
    currency: string;
    unitAmount: number;
    recurring?: {
        interval: 'month' | 'year';
        interval_count: number;
    };
    billingScheme: 'per_unit' | 'tiered';
    highlight?: string;
    livemode: boolean;
    allowSignups: boolean;
    url?: string;
    currencyOptions?: Record<string, { unit_amount: number }>;
    tiers?: Array<{ unit_amount: number; flat_amount: number }>;
}

interface PricingData {
    plans: Plan[];
}

interface GroupedPlan {
    groupName: string;
    plans: Plan[];
}

export function Pricing() {
    const {t} = useTranslation();
    const [pricingData, setPricingData] = useState<PricingData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedInterval, setSelectedInterval] = useState<'month' | 'year'>('month');

    useEffect(() => {
        const loadPricingData = async () => {
            try {
                const response = await fetch('/api/v1/pricing');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPricingData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load pricing data');
                console.error('Error loading pricing data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadPricingData();
    }, []);

    // Create a free plan object
    const freePlan: Plan = {
        uuid: 'free-plan',
        productName: 'Basic Access',
        name: 'Free Plan',
        features: '• Build unlimited projects\n• Community support\n• Basic templates',
        planType: 'free',
        currency: 'USD',
        unitAmount: 0,
        billingScheme: 'per_unit',
        livemode: true,
        allowSignups: true
    };

    // Group plans by group name (or fallback to product name)
    const groupPlansByGroup = (plans: Plan[]): GroupedPlan[] => {
        const grouped = plans.reduce((acc, plan) => {
            const groupName = plan.group || plan.productName;
            const existing = acc.find(group => group.groupName === groupName);
            if (existing) {
                existing.plans.push(plan);
            } else {
                acc.push({
                    groupName: groupName,
                    plans: [plan]
                });
            }
            return acc;
        }, [] as GroupedPlan[]);

        return grouped;
    };

    const handleFreePlanClick = () => {
        window.location.href = '/!organization/create';
    };

    const handlePaidPlanClick = (plan: Plan) => {
        window.location.href = `/!organization/create/${plan.uuid}`;
    };

    // Filter plans based on selected interval
    const filteredPlans = pricingData ? pricingData.plans.filter(plan => {
        // Include non-recurring plans (like URL plans) in all views
        if (!plan.recurring) return true;
        
        // Filter recurring plans by interval
        return plan.recurring.interval === selectedInterval;
    }) : [];

    const groupedPlans = groupPlansByGroup(filteredPlans);

    return (
        <div className="min-h-screen bg-background pricing-page">
            <Header/>

            <main className="pt-16">
                {/* Header */}
                <div className="border-b border-border/50 bg-gradient-to-b from-muted/30 to-background">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-4 backdrop-blur-sm">
                                <DollarSign className="w-4 h-4 mr-2 text-primary"/>
                                <span className="text-sm font-semibold text-primary">{t('pricing.badge')}</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-[1.1]">
                                <span className="text-gradient">
                                    {t('pricing.title')}
                                </span>
                            </h1>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                {t('pricing.subtitle')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Billing Interval Selector */}
                {pricingData && !loading && !error && (
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex justify-center">
                            <div className="inline-flex rounded-xl border border-border/50 p-1.5 bg-muted/30 backdrop-blur-sm shadow-sm">
                                <button
                                    type="button"
                                    className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                                        selectedInterval === 'month'
                                            ? 'bg-primary text-primary-foreground shadow-md'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                    onClick={() => setSelectedInterval('month')}
                                >
                                    {t('billing.monthly')}
                                </button>
                                <button
                                    type="button"
                                    className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 relative ${
                                        selectedInterval === 'year'
                                            ? 'bg-primary text-primary-foreground shadow-md'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                    onClick={() => setSelectedInterval('year')}
                                >
                                    {t('billing.yearly')}
                                    <span className="absolute -top-4 -right-6 bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-lg">
                                        {t('billing.save20')}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pricing Content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
                    {loading && (
                        <div className="max-w-6xl mx-auto">
                            <div className="plan-container">
                                {[1, 2, 3].map((i) => (
                                    <Card key={i} className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg" style={{width: '320px'}}>
                                        <CardContent className="p-6">
                                            <div className="space-y-4">
                                                <Skeleton className="h-7 w-3/4"/>
                                                <Skeleton className="h-10 w-1/2"/>
                                                <Skeleton className="h-5 w-2/3"/>
                                                <Skeleton className="h-9 w-full"/>
                                                <div className="space-y-2">
                                                    <Skeleton className="h-3 w-full"/>
                                                    <Skeleton className="h-3 w-full"/>
                                                    <Skeleton className="h-3 w-2/3"/>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-12">
                            <p className="text-destructive font-semibold mb-2">{t('pricing.errorLoading')}</p>
                            <p className="text-muted-foreground text-sm">{error}</p>
                        </div>
                    )}

                    {pricingData && !loading && !error && (
                        <div className="max-w-7xl mx-auto">
                            <div className="plan-container">
                                {/* Always show free plan first */}
                                <PlanCard
                                    plan={freePlan}
                                    buttonMessage={t('pricing.getStarted')}
                                    onButtonClick={handleFreePlanClick}
                                />

                                {/* Show grouped plans */}
                                {groupedPlans.map((group) => (
                                    <PlanCard
                                        key={group.groupName}
                                        plans={group.plans}
                                        buttonMessage={t('pricing.subscribe')}
                                        onButtonClick={handlePaidPlanClick}
                                    />
                                ))}

                                {!pricingData.plans.length && (
                                    <div className="col-span-full text-center py-12">
                                        <p className="text-muted-foreground">{t('pricing.noPlansAvailable')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Feature Matrix */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border/50 bg-gradient-to-b from-muted/10 to-background">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                                {t('pricing.featureMatrix.title')}
                            </h2>
                            <p className="text-muted-foreground">
                                {t('pricing.featureMatrix.subtitle')}
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-border">
                                        <th className="text-left p-4 font-semibold text-foreground"></th>
                                        <th className="text-center p-4 font-bold text-foreground">Free</th>
                                        <th className="text-center p-4 font-bold text-primary">Professional</th>
                                        <th className="text-center p-4 font-bold text-foreground">Custom</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-medium text-foreground">{t('pricing.featureMatrix.features.aiCredits')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.free.aiCredits')}</td>
                                        <td className="p-4 text-center text-foreground font-semibold">{t('pricing.featureMatrix.values.professional.aiCredits')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.custom.aiCredits')}</td>
                                    </tr>
                                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-medium text-foreground">{t('pricing.featureMatrix.features.publicProjects')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.free.publicProjects')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.professional.publicProjects')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.custom.publicProjects')}</td>
                                    </tr>
                                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-medium text-foreground">{t('pricing.featureMatrix.features.privateProjects')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.free.privateProjects')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.professional.privateProjects')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.custom.privateProjects')}</td>
                                    </tr>
                                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-medium text-foreground">{t('pricing.featureMatrix.features.customDomains')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.free.customDomains')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.professional.customDomains')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.custom.customDomains')}</td>
                                    </tr>
                                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-medium text-foreground">{t('pricing.featureMatrix.features.hosting')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.free.hosting')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.professional.hosting')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.custom.hosting')}</td>
                                    </tr>
                                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-medium text-foreground">{t('pricing.featureMatrix.features.database')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.free.database')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.professional.database')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.custom.database')}</td>
                                    </tr>
                                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-medium text-foreground">{t('pricing.featureMatrix.features.support')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.free.support')}</td>
                                        <td className="p-4 text-center text-foreground font-semibold">{t('pricing.featureMatrix.values.professional.support')}</td>
                                        <td className="p-4 text-center text-foreground font-semibold">{t('pricing.featureMatrix.values.custom.support')}</td>
                                    </tr>
                                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-medium text-foreground">{t('pricing.featureMatrix.features.branding')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.free.branding')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.professional.branding')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.custom.branding')}</td>
                                    </tr>
                                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-medium text-foreground">{t('pricing.featureMatrix.features.collaboration')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.free.collaboration')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.professional.collaboration')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.custom.collaboration')}</td>
                                    </tr>
                                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-medium text-foreground">{t('pricing.featureMatrix.features.analytics')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.free.analytics')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.professional.analytics')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.custom.analytics')}</td>
                                    </tr>
                                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-medium text-foreground">{t('pricing.featureMatrix.features.sso')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.free.sso')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.professional.sso')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.custom.sso')}</td>
                                    </tr>
                                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-medium text-foreground">{t('pricing.featureMatrix.features.enclave')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.free.enclave')}</td>
                                        <td className="p-4 text-center text-muted-foreground">{t('pricing.featureMatrix.values.professional.enclave')}</td>
                                        <td className="p-4 text-center text-primary">{t('pricing.featureMatrix.values.custom.enclave')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border/50">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
                            {t('pricing.faq.title')}
                        </h2>
                        <p className="text-muted-foreground text-center mb-8">
                            {t('pricing.subtitle')}
                        </p>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-left">
                                    {t('pricing.faq.q1.question')}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {t('pricing.faq.q1.answer')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-left">
                                    {t('pricing.faq.q2.question')}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {t('pricing.faq.q2.answer')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-left">
                                    {t('pricing.faq.q3.question')}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {t('pricing.faq.q3.answer')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger className="text-left">
                                    {t('pricing.faq.q4.question')}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {t('pricing.faq.q4.answer')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger className="text-left">
                                    {t('pricing.faq.q5.question')}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {t('pricing.faq.q5.answer')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-6">
                                <AccordionTrigger className="text-left">
                                    {t('pricing.faq.q6.question')}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {t('pricing.faq.q6.answer')}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}