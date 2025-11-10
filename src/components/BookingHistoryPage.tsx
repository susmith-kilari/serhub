import React, { useState, useEffect } from 'react';
import { User, BookingDetails } from '../types';
import { SERVICE_IMAGES } from '../constants';

interface BookingHistoryPageProps {
    user: User;
    onTrackBooking: (details: BookingDetails) => void;
}

const BookingHistoryPage: React.FC<BookingHistoryPageProps> = ({ user, onTrackBooking }) => {
    const [bookings, setBookings] = useState<BookingDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const historyKey = `serhubBookings_${user.email}`;
        const storedBookings = localStorage.getItem(historyKey);
        if (storedBookings) {
            setBookings(JSON.parse(storedBookings));
        }
        setLoading(false);
    }, [user.email]);

    const isTrackable = (bookingDate: string) => {
        const bookingTime = new Date(bookingDate).getTime();
        const currentTime = new Date().getTime();
        // A booking is trackable for 1 hour after it's made
        return (currentTime - bookingTime) < (60 * 60 * 1000);
    };

    if (loading) {
        return <div className="text-center p-8 text-white">Loading booking history...</div>;
    }

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                     <h1 className="text-3xl font-extrabold text-white">My Bookings</h1>
                </div>
               

                {bookings.length === 0 ? (
                    <div className="text-center bg-gray-800 p-12 rounded-lg shadow-md ring-1 ring-gray-700">
                        <h2 className="text-xl font-semibold text-white">No bookings yet!</h2>
                        <p className="mt-2 text-gray-400">You haven't booked any services with us. Let's change that!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row ring-1 ring-gray-700">
                                <div className="md:w-1/3">
                                    <img 
                                        src={SERVICE_IMAGES[booking.service]} 
                                        alt={booking.service}
                                        className="h-48 w-full object-cover md:h-full"
                                    />
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-bold text-white">{booking.service}</h2>
                                            <p className="text-sm text-gray-400">{booking.serviceType}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-teal-400">₹{booking.price.toFixed(2)}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(booking.date).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-700 flex-grow">
                                        <p className="text-sm text-gray-300">
                                            <span className="font-semibold text-gray-400">Location:</span> {booking.location}
                                        </p>
                                         <p className="text-sm text-gray-300 mt-1">
                                            <span className="font-semibold text-gray-400">Worker:</span> {booking.servicerName} ({booking.experienceLevel})
                                        </p>
                                        <p className="text-sm text-gray-300 mt-1">
                                            <span className="font-semibold text-gray-400">Contact:</span> <a href={`tel:${booking.servicerContact}`} className="text-teal-400 hover:underline">{booking.servicerContact}</a>
                                        </p>
                                    </div>
                                    {isTrackable(booking.date) && (
                                        <div className="mt-4 text-right">
                                            <button 
                                                onClick={() => onTrackBooking(booking)}
                                                className="px-4 py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors"
                                            >
                                                Track Servicer
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingHistoryPage;