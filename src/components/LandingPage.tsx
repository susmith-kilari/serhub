import React from 'react';
import ServicesGrid from './ServicesGrid';
import HowItWorks from './HowItWorks';
import WhyChooseUs from './WhyChooseUs';
import Chatbot from './Chatbot';
import Logo from './Logo';

interface LandingPageProps {
    onGetStartedClick: () => void;
    onLoginClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStartedClick, onLoginClick }) => {
    const [isChatbotOpen, setIsChatbotOpen] = React.useState(false);

    return (
        <div className="bg-gray-900">
            {/* Header and Hero Section */}
            <div className="relative">
                <div className="absolute inset-0">
                    <img
                        src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Modern home interior"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gray-900/60" />
                </div>

                <div className="relative z-10">
                    {/* Header-like section within the landing page */}
                    <header className="absolute top-0 left-0 right-0">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-20">
                                <Logo />
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={onLoginClick}
                                        className="text-sm font-medium text-gray-200 hover:text-white"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={onGetStartedClick}
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Hero Content */}
                    <div className="min-h-screen flex items-center justify-center text-center px-4 pt-20">
                        <div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                                Focus on Comfort & Peace
                            </h1>
                            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
                                Connect with trusted, skilled professionals for all your household needs. Quick, reliable, and right in your neighborhood.
                            </p>
                            <div className="mt-8">
                                <button
                                    onClick={onGetStartedClick}
                                    className="inline-block px-8 py-4 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105 shadow-lg"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <ServicesGrid />
            <HowItWorks />
            <WhyChooseUs />

            {/* Contact/Chatbot Section */}
            <div className="bg-gray-900 py-16 text-center">
                <h2 className="text-3xl font-extrabold text-white">Have Questions?</h2>
                <p className="mt-4 text-lg text-gray-300">Our AI assistant is here to help you 24/7.</p>
                <div className="mt-8">
                    <button
                        onClick={() => setIsChatbotOpen(true)}
                        className="inline-block px-8 py-4 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105 shadow-lg"
                    >
                        Chat Now
                    </button>
                </div>
            </div>

            {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
        </div>
    );
};

export default LandingPage;
