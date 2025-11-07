import React from 'react';

// Simple Icon components for visual flair
const IconShield = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);
const IconTag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm0 0v10m0-10L2 8m5-5l5 5" />
    </svg>
);
const IconClock = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const WhyChooseUs: React.FC = () => {
    return (
        <div>
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white text-center">Why Choose SERHUB?</h2>
                <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="pt-6">
                        <div className="flow-root bg-gray-800 rounded-lg px-6 pb-8 ring-1 ring-gray-700">
                            <div className="-mt-6">
                                <div>
                                    <span className="inline-flex items-center justify-center p-3 bg-teal-500 rounded-md shadow-lg">
                                        <IconShield />
                                    </span>
                                </div>
                                <h3 className="mt-8 text-lg font-medium text-white tracking-tight">Vetted Professionals</h3>
                                <p className="mt-5 text-base text-gray-400">Every professional is background-checked and highly trained to ensure quality and safety.</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6">
                        <div className="flow-root bg-gray-800 rounded-lg px-6 pb-8 ring-1 ring-gray-700">
                            <div className="-mt-6">
                                <div>
                                    <span className="inline-flex items-center justify-center p-3 bg-teal-500 rounded-md shadow-lg">
                                        <IconTag />
                                    </span>
                                </div>
                                <h3 className="mt-8 text-lg font-medium text-white tracking-tight">Transparent Pricing</h3>
                                <p className="mt-5 text-base text-gray-400">No hidden fees. Get clear, upfront pricing for all services before you book.</p>
                            </div>
                        </div>
                    </div>
                     <div className="pt-6">
                        <div className="flow-root bg-gray-800 rounded-lg px-6 pb-8 ring-1 ring-gray-700">
                            <div className="-mt-6">
                                <div>
                                    <span className="inline-flex items-center justify-center p-3 bg-teal-500 rounded-md shadow-lg">
                                        <IconClock />
                                    </span>
                                </div>
                                <h3 className="mt-8 text-lg font-medium text-white tracking-tight">Satisfaction Guaranteed</h3>
                                <p className="mt-5 text-base text-gray-400">We're committed to your happiness. If you're not satisfied, we'll make it right.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;