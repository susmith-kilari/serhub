import React, { useState, useEffect, useMemo } from 'react';
import { BookingDetails } from '../types';
import { SERVICE_ICONS } from '../constants';

interface BookingTrackingPageProps {
    details: BookingDetails;
    onComplete: () => void;
}

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

const MapView: React.FC<{ user: { x: number, y: number }, servicer: { x: number, y: number } }> = ({ user, servicer }) => {
    return (
        <div className="relative w-full aspect-video bg-gray-700/50 rounded-lg overflow-hidden border-2 border-gray-600">
            {/* Servicer Icon */}
            <div 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear"
                style={{ left: `${servicer.x}%`, top: `${servicer.y}%` }}
            >
                <div className="relative flex flex-col items-center">
                    <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-md mb-1">Servicer</span>
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center ring-4 ring-teal-500/30">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* User Icon */}
            <div 
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${user.x}%`, top: `${user.y}%` }}
            >
                <div className="relative flex flex-col items-center">
                     <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center ring-4 ring-pink-500/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-md mt-1">You</span>
                </div>
            </div>
        </div>
    );
};


const BookingTrackingPage: React.FC<BookingTrackingPageProps> = ({ details, onComplete }) => {
    const [servicerCoords, setServicerCoords] = useState<{ lat: number; lon: number } | null>(null);
    const [status, setStatus] = useState<'en_route' | 'arrived'>('en_route');

    // Generate a plausible starting point for the servicer (e.g., up to 10km away)
    useEffect(() => {
        const angle = Math.random() * 2 * Math.PI;
        const distanceKm = 5 + Math.random() * 5; // 5 to 10 km
        const earthRadiusKm = 6371;

        const lat1 = details.userCoords.lat * (Math.PI / 180);
        const lon1 = details.userCoords.lon * (Math.PI / 180);
        
        const lat2 = Math.asin(Math.sin(lat1) * Math.cos(distanceKm / earthRadiusKm) + Math.cos(lat1) * Math.sin(distanceKm / earthRadiusKm) * Math.cos(angle));
        const lon2 = lon1 + Math.atan2(Math.sin(angle) * Math.sin(distanceKm / earthRadiusKm) * Math.cos(lat1), Math.cos(distanceKm / earthRadiusKm) - Math.sin(lat1) * Math.sin(lat2));

        setServicerCoords({
            lat: lat2 * (180 / Math.PI),
            lon: lon2 * (180 / Math.PI)
        });
    }, [details.userCoords]);
    
    // Simulate servicer movement
    useEffect(() => {
        if (!servicerCoords || status === 'arrived') return;

        const interval = setInterval(() => {
            setServicerCoords(prevCoords => {
                if (!prevCoords) return null;

                const distance = haversineDistance(prevCoords.lat, prevCoords.lon, details.userCoords.lat, details.userCoords.lon);
                if (distance < 0.1) { // Arrived if less than 100m away
                    clearInterval(interval);
                    setStatus('arrived');
                    return details.userCoords;
                }
                
                // Move 5% closer each step
                const newLat = prevCoords.lat + (details.userCoords.lat - prevCoords.lat) * 0.05;
                const newLon = prevCoords.lon + (details.userCoords.lon - prevCoords.lon) * 0.05;

                return { lat: newLat, lon: newLon };
            });
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [servicerCoords, details.userCoords, status]);

    const distance = useMemo(() => {
        if (!servicerCoords) return null;
        return haversineDistance(servicerCoords.lat, servicerCoords.lon, details.userCoords.lat, details.userCoords.lon);
    }, [servicerCoords, details.userCoords]);
    
    const etaMinutes = useMemo(() => {
        if (distance === null) return null;
        // Assume average speed of 25 km/h
        return Math.ceil((distance / 25) * 60);
    }, [distance]);

    const mapPositions = useMemo(() => {
        if (!servicerCoords) return { user: {x: 50, y: 50}, servicer: {x: 50, y: 50} };
        // A simple projection for the visual map
        return {
            user: { x: 75, y: 50 }, // User is fixed on the right
            servicer: { x: 25, y: 50 }, // Servicer starts on the left and moves
        };
    }, [servicerCoords]);
    
    if (!servicerCoords || distance === null || etaMinutes === null) {
        return <div className="text-center p-8 text-white">Initializing tracking...</div>;
    }

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                     <h1 className="text-3xl font-extrabold text-white">Tracking Your Servicer</h1>
                     <p className="mt-2 text-gray-400">Your professional for <span className="font-bold text-teal-400">{details.service}</span> is on the way!</p>
                </div>

                <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden ring-1 ring-gray-700">
                    <div className="p-6">
                        {status === 'arrived' ? (
                            <div className="text-center py-10 bg-green-900/50 rounded-lg">
                                <h3 className="text-2xl font-bold text-green-400">{details.servicerName} has arrived!</h3>
                                <p className="text-gray-300 mt-2">Your service is about to begin.</p>
                            </div>
                        ) : (
                             <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <p className="text-sm text-gray-400">ETA</p>
                                    <p className="text-2xl font-bold text-white">{etaMinutes} mins</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Distance</p>
                                    <p className="text-2xl font-bold text-white">{distance.toFixed(1)} km</p>
                                </div>
                            </div>
                        )}
                    </div>
                    
                     <div className="px-6 pb-6">
                        <MapView user={mapPositions.user} servicer={mapPositions.servicer} />
                    </div>

                    <div className="bg-gray-800/50 p-6 border-t border-gray-700 flex items-center justify-between">
                       <div className="flex items-center">
                           <img src={SERVICE_ICONS[details.service]} alt={details.service} className="w-10 h-10 bg-gray-700 p-2 rounded-full"/>
                           <div className="ml-4">
                               <p className="font-bold text-white">{details.servicerName}</p>
                               <p className="text-sm text-gray-400">{details.experienceLevel}</p>
                           </div>
                       </div>
                       <a href={`tel:${details.userMobile}`} className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">
                            Call
                       </a>
                    </div>
                </div>
                 <div className="mt-8 text-center">
                    <button onClick={onComplete} className="text-gray-400 hover:text-white underline">
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingTrackingPage;