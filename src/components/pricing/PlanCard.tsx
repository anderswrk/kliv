/*
 * Copyright 2025 Rational Ventures Inc.
 * RATIONAL VENTURES INC PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF RATIONAL VENTURES INC.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */

import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import ReactMarkdown from 'react-markdown';

interface Plan {
    uuid: string;
    productName: string;
    group?: string;
    name: string;
    description?: string;
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

interface PlanCardProps {
    plan?: Plan;
    plans?: Plan[];
    buttonMessage: string;
    onButtonClick: (plan: Plan) => void;
}

export function PlanCard({plan, plans, buttonMessage, onButtonClick}: PlanCardProps) {
    const {t, i18n} = useTranslation();
    const [selectedPlanUuid, setSelectedPlanUuid] = useState<string>('');

    const currentPlan = plans && plans.length > 0
        ? plans.find(p => p.uuid === selectedPlanUuid) || plans[0]
        : plan;

    useEffect(() => {
        if (plans && plans.length > 0) {
            setSelectedPlanUuid(plans[0].uuid);
        } else if (plan) {
            setSelectedPlanUuid(plan.uuid);
        }
    }, [plans, plan]);

    if (!currentPlan) return null;

    // Currency mapping based on language
    const getPreferredCurrency = () => {
        const languageToCurrency: Record<string, string> = {
            'en': 'usd',
            'ja': 'jpy',
            'sv': 'sek'
        };
        return languageToCurrency[i18n.language] || 'usd';
    };

    // Get the best available currency for a plan
    const getPlanCurrency = (plan: Plan) => {
        if (!plan.currencyOptions) {
            return plan.currency || 'usd';
        }

        const preferredCurrency = getPreferredCurrency();

        // Check if preferred currency is available
        if (plan.currencyOptions[preferredCurrency]) {
            return preferredCurrency;
        }

        // Fall back to USD if available
        if (plan.currencyOptions['usd']) {
            return 'usd';
        }

        // Fall back to the first available currency
        const availableCurrencies = Object.keys(plan.currencyOptions);
        return availableCurrencies.length > 0 ? availableCurrencies[0] : (plan.currency || 'usd');
    };

    // Get the unit amount for a plan in the preferred currency
    const getPlanUnitAmount = (plan: Plan) => {
        if (!plan.currencyOptions) {
            return plan.unitAmount || 0;
        }

        const currency = getPlanCurrency(plan);
        const currencyOption = plan.currencyOptions[currency];

        return currencyOption ? currencyOption.unit_amount : (plan.unitAmount || 0);
    };

    // Check if a currency is zero-decimal (doesn't use fractional units)
    const isZeroDecimalCurrency = (currency: string) => {
        const zeroDecimalCurrencies = [
            'bif', 'clp', 'djf', 'gnf', 'jpy', 'kmf', 'krw', 'mga', 'pyg', 'rwf', 'ugx', 'vnd', 'vuv', 'xaf', 'xof', 'xpf'
        ];
        return zeroDecimalCurrencies.includes(currency.toLowerCase());
    };

    // Format currency amount properly based on whether it's zero-decimal
    const formatCurrencyAmount = (amount: number, currency: string) => {
        const isZeroDecimal = isZeroDecimalCurrency(currency);
        const displayAmount = isZeroDecimal ? amount : amount / 100;

        return new Intl.NumberFormat(i18n.language, {
            style: 'currency',
            currency: currency.toUpperCase(),
            currencyDisplay: 'narrowSymbol',
            minimumFractionDigits: isZeroDecimal ? 0 : 0,
            maximumFractionDigits: isZeroDecimal ? 0 : 2
        }).format(displayAmount);
    };

    // Helper methods for plan content localization
    const getLocalizedProductName = (productName: string) => {
        if (!productName) return productName;
        const key = `planContent.products.${productName}`;
        const translated = t(key);
        return translated !== key ? translated : productName;
    };

    const getLocalizedPlanName = (planName: string) => {
        if (!planName) return planName;
        const key = `planContent.plans.${planName}`;
        const translated = t(key);
        return translated !== key ? translated : planName;
    };

    const getLocalizedFeatures = (groupName: string | undefined, productName: string, originalFeatures: string) => {
        const nameToUse = groupName || productName;
        if (!nameToUse) return originalFeatures;
        const key = `planContent.features.${nameToUse}`;
        const translated = t(key);
        return translated !== key ? translated : originalFeatures;
    };

    const getLocalizedDescription = (groupName: string | undefined, productName: string) => {
        const nameToUse = groupName || productName;
        if (!nameToUse) return '';
        const key = `planContent.descriptions.${nameToUse}`;
        const translated = t(key);
        return translated !== key ? translated : '';
    };

    const localizedCurrentPlan = {
        ...currentPlan,
        productName: getLocalizedProductName(currentPlan.productName),
        name: getLocalizedPlanName(currentPlan.name),
        description: getLocalizedPlanName(currentPlan.description || currentPlan.name),
        planDescription: getLocalizedDescription(currentPlan.group, currentPlan.productName),
        features: getLocalizedFeatures(currentPlan.group, currentPlan.productName, currentPlan.features),
        preferredCurrency: getPlanCurrency(currentPlan),
        preferredUnitAmount: getPlanUnitAmount(currentPlan)
    };

    const localizedPlans = plans ? plans.map(plan => ({
        ...plan,
        productName: getLocalizedProductName(plan.productName),
        name: getLocalizedPlanName(plan.name),
        description: getLocalizedPlanName(plan.description || plan.name),
        planDescription: getLocalizedDescription(plan.group, plan.productName),
        features: getLocalizedFeatures(plan.group, plan.productName, plan.features),
        preferredCurrency: getPlanCurrency(plan),
        preferredUnitAmount: getPlanUnitAmount(plan)
    })) : [];

    const getInterval = () => {
        const plan = localizedCurrentPlan;

        if (!plan) return "";

        if (plan.planType === "free") {
            return t('pricing.freeSubtitle');
        }

        if (plan.billingScheme === "per_unit" && plan.unitAmount === 0) {
            return "";
        }

        if (!plan.recurring || plan.tiers?.length) {
            return "";
        }

        if (plan.recurring.interval_count === 1) {
            const intervalMap: Record<string, string> = {
                'month': t('pricing.month'),
                'year': t('pricing.year'),
                'week': t('pricing.week'),
                'day': t('pricing.day')
            };
            const interval = intervalMap[plan.recurring.interval] || plan.recurring.interval;
            return `/ ${interval}`;
        } else {
            const pluralIntervalMap: Record<string, string> = {
                'month': t('pricing.months'),
                'year': t('pricing.years'),
                'week': t('pricing.weeks'),
                'day': t('pricing.days')
            };
            const pluralInterval = pluralIntervalMap[plan.recurring.interval] || plan.recurring.interval + 's';
            return `${t('pricing.every')} ${plan.recurring.interval_count} ${pluralInterval}`;
        }
    };

    const getPrice = () => {
        const plan = localizedCurrentPlan;

        if (!plan) return "";

        if (plan.planType === "free") {
            return t('pricing.free');
        }

        if (plan.planType === "url") {
            return t('pricing.custom');
        }

        const currency = plan.preferredCurrency || plan.currency || "USD";
        const unitAmount = plan.preferredUnitAmount || plan.unitAmount || 0;

        if (plan.tiers?.length) {
            return t('pricing.custom');
        }

        if (plan.billingScheme === "per_unit") {
            if (unitAmount === 0) {
                return t('pricing.free');
            } else if (unitAmount) {
                return formatCurrencyAmount(unitAmount, currency);
            } else {
                return t('pricing.donation');
            }
        } else if (plan.billingScheme === "tiered") {
            let text = t('pricing.startsAt') + " ";
            if (plan.tiers && plan.tiers[0].unit_amount) {
                text += formatCurrencyAmount(plan.tiers[0].unit_amount, currency) + " " + t('pricing.perUnit');
            }
            if (plan.tiers && plan.tiers[0].flat_amount) {
                text += " + " + formatCurrencyAmount(plan.tiers[0].flat_amount, currency) + " " + getInterval();
            }
            return text;
        } else {
            return t('pricing.customPricing');
        }
    };

    const handleJoinClick = () => {
        // Emit the original plan data, not the localized version
        onButtonClick(currentPlan);
    };

    const handlePlanChange = (value: string) => {
        setSelectedPlanUuid(value);
    };

    const isHighlighted = currentPlan.highlight;

    return (
        <div className="plan-card">
            {isHighlighted ? (
                <div className="plan-card-highlight group">
                    <div className="plan-card-highlight-title">
                        {currentPlan.highlight}
                    </div>
                    <div className="plan-card-body">
                        <PlanCardContent
                            currentPlan={localizedCurrentPlan}
                            plans={localizedPlans}
                            selectedPlanUuid={selectedPlanUuid}
                            getPrice={getPrice}
                            getInterval={getInterval}
                            handlePlanChange={handlePlanChange}
                            handleJoinClick={handleJoinClick}
                            buttonMessage={buttonMessage}
                        />
                    </div>
                </div>
            ) : (
                <div className="plan-card-normal group">
                    <div className="plan-card-body">
                        <PlanCardContent
                            currentPlan={localizedCurrentPlan}
                            plans={localizedPlans}
                            selectedPlanUuid={selectedPlanUuid}
                            getPrice={getPrice}
                            getInterval={getInterval}
                            handlePlanChange={handlePlanChange}
                            handleJoinClick={handleJoinClick}
                            buttonMessage={buttonMessage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

interface PlanCardContentProps {
    currentPlan: Plan & {
        productName: string;
        name: string;
        description?: string;
        planDescription?: string;
        features: string;
        preferredCurrency?: string;
        preferredUnitAmount?: number;
    };
    plans?: Array<Plan & {
        productName: string;
        name: string;
        description?: string;
        planDescription?: string;
        features: string;
        preferredCurrency?: string;
        preferredUnitAmount?: number;
    }>;
    selectedPlanUuid: string;
    getPrice: () => string;
    getInterval: () => string;
    handlePlanChange: (value: string) => void;
    handleJoinClick: () => void;
    buttonMessage: string;
}

function PlanCardContent({
                             currentPlan,
                             plans,
                             selectedPlanUuid,
                             getPrice,
                             getInterval,
                             handlePlanChange,
                             handleJoinClick,
                             buttonMessage
                         }: PlanCardContentProps) {
    const {t} = useTranslation();

    return (
        <>
            {/* Notices */}
            <div className="notices">
                {!currentPlan.livemode && currentPlan.planType === 'recurring' && (
                    <div className="notice" title={t('pricing.testPlan')}>
                        {t('pricing.test')}
                    </div>
                )}
                {!currentPlan.allowSignups && (
                    <div className="notice" title={t('pricing.signupsDisabled')}>
                        {t('pricing.disabled')}
                    </div>
                )}
            </div>

            {/* Title */}
            <div className="title">
                {currentPlan.group || currentPlan.productName}
            </div>

            {/* Plan Description */}
            {currentPlan.planDescription && (
                <div className="plan-description">
                    {currentPlan.planDescription}
                </div>
            )}

            {/* Price */}
            <div className="price">
                {getPrice()}
            </div>

            {/* Interval */}
            <div className="period">
                {getInterval()}
            </div>

            {/* Plan selector for multiple plans */}
            {plans && plans.length > 1 && (
                <div className="product-name">
                    <Select value={selectedPlanUuid} onValueChange={handlePlanChange}>
                        <SelectTrigger className="plan-selector">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            {plans.map((planOption) => (
                                <SelectItem key={planOption.uuid} value={planOption.uuid}>
                                    {planOption.description || planOption.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Action Button */}
            {currentPlan.planType === 'url' ? (
                <Button asChild className="select-button">
                    <a href={currentPlan.url} target="_blank" rel="noopener noreferrer">
                        {t('pricing.contactUs')}
                    </a>
                </Button>
            ) : (
                <Button 
                    onClick={handleJoinClick} 
                    className={`select-button ${
                        (currentPlan.group === 'Professional' || currentPlan.productName === 'Professional') 
                            ? 'bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg hover:shadow-xl' 
                            : ''
                    }`}
                >
                    {buttonMessage}
                </Button>
            )}

            {/* Features */}
            <div className="features">
                <ReactMarkdown>{currentPlan.features}</ReactMarkdown>
            </div>
        </>
    );
}
