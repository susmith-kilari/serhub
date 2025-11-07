import React, { useState, useEffect, useMemo } from 'react';
import { SERVICEABLE_CITY_COORDS, SERVICE_BASE_PRICES, EXPERIENCE_LEVELS } from '../constants';
import { User, BookingDetails, ServiceProvider } from '../types';
import { generateServiceOptions, generateServiceProviders } from '../services/geminiService';

interface LocationCheckModalProps {
    service: string;
    onClose: () => void;
    user: User;
    onBookingComplete: (details: Omit<BookingDetails, 'id' | 'date'>) => void;
}

type ModalStep = 'locating' | 'providers' | 'form' | 'error';

const LocationCheckModal: React.FC<LocationCheckModalProps> = ({ service, onClose, user, onBookingComplete }) => {
    const [step, setStep] = useState<ModalStep>('locating');
    const [locationAddress, setLocationAddress] = useState("");
    const [userCoords, setUserCoords] = useState<{lat: number, lon: number} | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    
    // Provider state
    const [providers, setProviders] = useState<ServiceProvider[]>([]);
    const [isLoadingProviders, setIsLoadingProviders] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);


    // Booking form state
    const [serviceOptions, setServiceOptions] = useState<string[]>([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState(false);
    const [selectedServiceType, setSelectedServiceType] = useState('');
    const [selectedExperience, setSelectedExperience] = useState(EXPERIENCE_LEVELS[0].name);

     useEffect(() => {
        if (step === 'form') {
            const fetchOptions = async () => {
                setIsLoadingOptions(true);
                const options = await generateServiceOptions(service);
                setServiceOptions(options);
                if (options.length > 0) {
                    setSelectedServiceType(options[0]);
                }
                setIsLoadingOptions(false);
            };
            fetchOptions();
        }
    }, [step, service]);

    const price = useMemo(() => {
        const basePrice = SERVICE_BASE_PRICES[service] || 0;
        const level = EXPERIENCE_LEVELS.find(l => l.name === selectedExperience);
        const experienceMultiplier = level ? level.multiplier : 1;
        
        const serviceTypeIndex = serviceOptions.indexOf(selectedServiceType);
        const serviceTypeMultiplier = 1 + (serviceTypeIndex > 0 ? serviceTypeIndex * 0.05 : 0);
        
        return (basePrice * experienceMultiplier * serviceTypeMultiplier);
    }, [service, selectedExperience, selectedServiceType, serviceOptions]);


    const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    const checkServiceAvailability = (lat: number, lon: number): { available: boolean; nearestCity: string | null } => {
        let nearestCity: string | null = null;
        let minDistance = Infinity;

        for (const city in SERVICEABLE_CITY_COORDS) {
            const cityCoords = SERVICEABLE_CITY_COORDS[city];
            const distance = haversineDistance(lat, lon, cityCoords.lat, cityCoords.lon);
            if (distance < minDistance) {
                minDistance = distance;
                nearestCity = city;
            }
        }

        if (minDistance <= 50) {
            return { available: true, nearestCity: nearestCity };
        }

        return { available: false, nearestCity: nearestCity };
    };

    const handleGetLiveLocation = () => {
        setStep('locating');
        setErrorMsg('');

        if (!navigator.geolocation) {
            setErrorMsg("Geolocation is not supported by your browser.");
            setStep('error');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                setUserCoords({ lat: userLat, lon: userLon });

                const { available, nearestCity } = checkServiceAvailability(userLat, userLon);
                
                const address = `Your Location (Near ${nearestCity})`;
                setLocationAddress(address);

                if (available && nearestCity) {
                    setIsLoadingProviders(true);
                    setStep('providers');
                    const fetchedProviders = await generateServiceProviders(service, nearestCity);
                    setProviders(fetchedProviders);
                    setIsLoadingProviders(false);
                } else {
                    setErrorMsg(`Our services are not yet available here. The nearest serviceable city is ${nearestCity}.`);
                    setStep('error');
                }
            },
            (error) => {
                let errorMessage = "An unknown error occurred.";
                if (error.code === error.PERMISSION_DENIED) {
                    errorMessage = "Location access was denied. Please enable it in your browser settings to continue.";
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    errorMessage = "Location information is unavailable. Please check your device settings.";
                }
                setErrorMsg(errorMessage);
                setLocationAddress('');
                setStep('error');
            }
        );
    };
    
    const handleSelectProvider = (provider: ServiceProvider) => {
        setSelectedProvider(provider);
        setStep('form');
    };

    useEffect(() => {
        handleGetLiveLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userCoords || !selectedProvider) {
            setErrorMsg("Could not determine user coordinates or selected provider for booking.");
            setStep('error');
            return;
        }

        const bookingDetails = {
            service,
            serviceType: selectedServiceType,
            experienceLevel: selectedExperience,
            price: price,
            userName: user.name,
            userMobile: user.mobile,
            location: locationAddress,
            userCoords: userCoords,
            servicerName: selectedProvider.name,
            servicerContact: selectedProvider.contact,
        };
        onBookingComplete(bookingDetails);
    }

    const renderContent = () => {
        switch (step) {
            case 'locating':
                return (
                     <div className="text-center p-4 flex justify-center items-center min-h-[200px]">
                        <svg className="animate-spin h-6 w-6 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="ml-3 text-gray-300">Checking your location against our service areas...</p>
                    </div>
                );
            case 'providers':
                if (isLoadingProviders) {
                    return (
                        <div className="text-center p-4 flex justify-center items-center min-h-[200px]">
                            <svg className="animate-spin h-6 w-6 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="ml-3 text-gray-300">Finding best service providers near you...</p>
                        </div>
                    )
                }
                return (
                    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                        {providers.length > 0 ? providers.map(provider => (
                            <div key={provider.id} className="bg-gray-700/50 p-4 rounded-lg flex items-center space-x-4">
                                <img src={provider.image} alt={provider.name} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                                <div className="flex-grow">
                                    <h4 className="font-bold text-white">{provider.name}</h4>
                                    <p className="text-sm text-gray-400 mt-1">{provider.bio}</p>
                                    <p className="text-sm text-teal-400 font-mono mt-2">{provider.contact}</p>
                                </div>
                                <button
                                    onClick={() => handleSelectProvider(provider)}
                                    className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors self-end"
                                >
                                    Book
                                </button>
                            </div>
                        )) : (
                             <div className="text-center p-4 bg-yellow-900/50 rounded-lg border border-yellow-700">
                                <p className="font-semibold text-yellow-300">No Providers Found</p>
                                <p className="text-yellow-400 mt-1">We couldn't find any available {service} providers in your area at the moment.</p>
                            </div>
                        )}
                    </div>
                )
            case 'error':
                return (
                        <div className="text-center p-4 bg-yellow-900/50 rounded-lg border border-yellow-700 min-h-[200px] flex flex-col justify-center">
                            <p className="font-semibold text-yellow-300">Location Check Failed</p>
                            <p className="text-yellow-400 mt-1">{errorMsg}</p>
                            <button
                                onClick={handleGetLiveLocation}
                                className="mt-4 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    );
            case 'form':
                return (
                    <form onSubmit={handleBookingSubmit} className="space-y-4 text-left">
                        <div>
                            <label className="block text-sm font-medium text-gray-400">Selected Provider</label>
                            <input type="text" value={selectedProvider?.name || ''} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm sm:text-sm text-white"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Service Type</label>
                            <select value={selectedServiceType} onChange={(e) => setSelectedServiceType(e.target.value)} disabled={isLoadingOptions} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                                {isLoadingOptions ? <option>Loading options...</option> : serviceOptions.map(opt => <option key={opt}>{opt}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Worker Experience</label>
                            <select value={selectedExperience} onChange={(e) => setSelectedExperience(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                                {EXPERIENCE_LEVELS.map(level => <option key={level.name} value={level.name}>{level.name}</option>)}
                            </select>
                        </div>
                        <div className="text-center pt-2">
                             <p className="text-2xl font-bold text-white">Total: ₹{price.toFixed(2)}</p>
                        </div>
                        <button type="submit" className="w-full px-4 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors">
                            Book Now
                        </button>
                    </form>
                );
        }
    }
    
    const getModalTitle = () => {
        switch(step) {
            case 'form': return 'Complete Your Booking';
            case 'providers': return `Choose a ${service} Provider`;
            default: return 'Check Availability';
        }
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative transform transition-all ring-1 ring-gray-700">
                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Close modal">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="text-center">
                    <h2 id="modal-title" className="text-2xl font-bold text-white">{getModalTitle()}</h2>
                    <p className="mt-2 text-gray-400">
                        {step === 'locating' ? `Please wait while we confirm your location for ` : 
                         step === 'providers' ? `We found these professionals near you for ` : 
                         `Review your details for `}
                        <span className="font-semibold text-teal-400">{service}</span>.
                    </p>
                </div>

                <div className="mt-6">
                   {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default LocationCheckModal;