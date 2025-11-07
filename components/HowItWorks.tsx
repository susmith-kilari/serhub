import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../constants';

const HowItWorks: React.FC = () => {
    return (
        <div className="py-16 overflow-hidden">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-white">How it works</h2>
                    <p className="mt-4 text-lg text-gray-400">3 simple steps to a hassle-free home.</p>
                </div>
                <div className="mt-16 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 hidden md:block" aria-hidden="true"></div>
                    <div className="relative flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
                        {HOW_IT_WORKS_STEPS.map((step, index) => (
                            <div key={step.title} className="flex flex-col items-center text-center max-w-xs relative">
                                <div className="bg-gray-800 p-2 rounded-2xl shadow-lg ring-1 ring-gray-700">
                                    <img src={step.image} alt={step.title} className="w-48 h-48 object-contain rounded-xl" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-bold text-green-400">Step {index + 1}</h3>
                                    <p className="mt-1 text-xl font-semibold text-white">{step.title}</p>
                                </div>
                                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                                   <div className="hidden md:block absolute top-1/2 left-full transform translate-x-1/2 -translate-y-1/2 ml-10">
                                        <svg className="w-24 h-auto text-gray-600" fill="none" viewBox="0 0 108 23" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4">
                                            <path d="M1 21.3662C21.4554 21.3662 38.6219 9.53213 54.2185 9.53213C69.815 9.53213 89.2825 21.3662 107 21.3662" />
                                        </svg>
                                   </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
             </div>
        </div>
    );
};

export default HowItWorks;