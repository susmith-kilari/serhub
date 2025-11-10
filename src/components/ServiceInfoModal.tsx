import React, { useState, useEffect } from 'react';
import { generateServiceDescription } from '../services/geminiService';
import { ServiceInfo } from '../types';
import { SERVICE_IMAGES } from '../constants';

interface ServiceInfoModalProps {
    serviceName: string;
    onClose: () => void;
    onProceed: () => void;
}

const FeatureListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start">
        <svg className="h-6 w-6 text-green-400 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>{children}</span>
    </li>
);

const ServiceInfoModal: React.FC<ServiceInfoModalProps> = ({ serviceName, onClose, onProceed }) => {
    const [serviceInfo, setServiceInfo] = useState<ServiceInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDescription = async () => {
            setIsLoading(true);
            const info = await generateServiceDescription(serviceName);
            setServiceInfo(info);
            setIsLoading(false);
        };
        fetchDescription();
    }, [serviceName]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all ring-1 ring-gray-700">
                <div className="relative">
                    <img src={SERVICE_IMAGES[serviceName]} alt={serviceName} className="w-full h-64 object-cover" />
                    <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black bg-opacity-40 rounded-full p-2 hover:bg-opacity-60" aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-8">
                    {isLoading ? (
                        <div className="text-center min-h-[200px] flex flex-col justify-center">
                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400 mx-auto"></div>
                            <p className="mt-4 text-gray-400">Loading service details...</p>
                        </div>
                    ) : serviceInfo && (
                        <>
                            <h2 id="modal-title" className="text-3xl font-bold text-white">{serviceInfo.title}</h2>
                            <p className="mt-4 text-gray-300 leading-relaxed">
                                {serviceInfo.description}
                            </p>
                            
                            <ul className="mt-6 space-y-2 text-gray-300">
                                {serviceInfo.keyFeatures.map((feature, index) => (
                                    <FeatureListItem key={index}>{feature}</FeatureListItem>
                                ))}
                            </ul>

                            <div className="mt-8 text-right">
                                <button
                                    onClick={onProceed}
                                    className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors"
                                >
                                    Proceed to Book
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceInfoModal;