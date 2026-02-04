import React from 'react';
import { Check, Star, Shield, Zap, Sparkles } from 'lucide-react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const plans = [
    {
        name: 'Silver',
        price: '$29',
        period: '/mo',
        description: 'Essential maintenance for worry-free living.',
        features: [
            '1 Priority Service Visit/mo',
            'Basic Maintenance Checks',
            '24h Response Time',
            '5% Discount on Parts'
        ],
        icon: Shield,
        active: false,
    },
    {
        name: 'Gold',
        price: '$59',
        period: '/mo',
        description: 'Most popular choice for active households.',
        features: [
            '3 Priority Service Visits/mo',
            'Comprehensive Maintenance',
            '12h Response Time',
            '15% Discount on Parts',
            'Free Annual Inspection'
        ],
        icon: Zap,
        active: true, // Highlights this card
    },
    {
        name: 'Platinum',
        price: '$99',
        period: '/mo',
        description: 'Ultimate protection and peace of mind.',
        features: [
            'Unlimited Priority Visits',
            'Advanced Diagnostics',
            '1h Emergency Response',
            '25% Discount on Parts',
            'Quarterly Deep Cleaning',
            'Dedicated Account Manager'
        ],
        icon: Star,
        active: false,
    },
];

const ServicePlans = () => {
    return (
        <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply blur-3xl animate-blob" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Service Plan</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Flexible plans designed to save you time and money. Cancel anytime, no hidden fees.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative rounded-3xl p-8 transition-all duration-300 transform hover:-translate-y-2
                ${plan.active
                                    ? 'bg-slate-900 text-white shadow-2xl ring-4 ring-blue-500/20 scale-105 z-10'
                                    : 'bg-white text-slate-900 shadow-xl border border-slate-100 hover:shadow-2xl'
                                }
              `}
                        >
                            {plan.active && (
                                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold uppercase tracking-wider py-2 px-6 rounded-full shadow-lg flex items-center gap-2">
                                        <Sparkles className="w-3 h-3" /> Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 
                    ${plan.active ? 'bg-white/10 text-blue-400' : 'bg-slate-100 text-slate-600'}`}>
                                        <plan.icon className="w-7 h-7" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                                        <span className={`text-sm font-medium ${plan.active ? 'text-slate-400' : 'text-slate-500'}`}>{plan.period}</span>
                                    </div>
                                    <p className={`text-sm mb-8 ${plan.active ? 'text-slate-300' : 'text-slate-500'}`}>
                                        {plan.description}
                                    </p>

                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className={`mt-0.5 rounded-full p-0.5 ${plan.active ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-100 text-slate-600'}`}>
                                                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                                </div>
                                                <span className={`text-sm font-medium ${plan.active ? 'text-slate-200' : 'text-slate-600'}`}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link to="/bookings" className="w-full">
                                    <Button
                                        className={`w-full py-6 rounded-xl font-bold text-base transition-all duration-300
                      ${plan.active
                                                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-blue-500/25 text-white border-none'
                                                : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border-transparent'}
                    `}
                                    >
                                        Choose {plan.name}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicePlans;
