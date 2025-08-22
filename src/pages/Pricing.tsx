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
                <div className="border-b border-border bg-muted/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                                <DollarSign className="w-4 h-4 mr-2 text-primary"/>
                                <span className="text-sm font-medium text-primary">{t('pricing.badge')}</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                                {t('pricing.title')}
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                {t('pricing.subtitle')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Billing Interval Selector */}
                {pricingData && !loading && !error && (
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex justify-center">
                            <div className="inline-flex rounded-lg border border-border p-1 bg-muted/30">
                                <button
                                    type="button"
                                    className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                                        selectedInterval === 'month'
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                    onClick={() => setSelectedInterval('month')}
                                >
                                    {t('billing.monthly')}
                                </button>
                                <button
                                    type="button"
                                    className={`px-6 py-2 text-sm font-medium rounded-md transition-all relative ${
                                        selectedInterval === 'year'
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                    onClick={() => setSelectedInterval('year')}
                                >
                                    {t('billing.yearly')}
                                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                                        {t('billing.save20')}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pricing Content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {loading && (
                        <div className="max-w-6xl mx-auto">
                            <div className="plan-container">
                                {[1, 2, 3].map((i) => (
                                    <Card key={i} className="border-0 shadow-sm" style={{width: '300px'}}>
                                        <CardContent className="p-8">
                                            <div className="space-y-6">
                                                <Skeleton className="h-8 w-3/4"/>
                                                <Skeleton className="h-12 w-1/2"/>
                                                <Skeleton className="h-6 w-2/3"/>
                                                <Skeleton className="h-10 w-full"/>
                                                <div className="space-y-3">
                                                    <Skeleton className="h-4 w-full"/>
                                                    <Skeleton className="h-4 w-full"/>
                                                    <Skeleton className="h-4 w-2/3"/>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-8">
                            <p className="text-destructive mb-4">{t('pricing.errorLoading')}</p>
                            <p className="text-muted-foreground text-sm">{error}</p>
                        </div>
                    )}

                    {pricingData && !loading && !error && (
                        <div className="max-w-6xl mx-auto">
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
                                    <div className="col-span-full text-center py-8">
                                        <p className="text-muted-foreground">{t('pricing.noPlansAvailable')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}