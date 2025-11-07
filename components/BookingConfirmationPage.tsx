import React, { useState } from 'react';
import { BookingDetails, User } from '../types';

interface BookingConfirmationPageProps {
    details: BookingDetails;
    user: User;
    onPaymentSuccess: () => void;
}

type CheckoutStep = 'review' | 'payment' | 'processing' | 'confirmed';

const UpiOption: React.FC<{ name: string; icon: string; }> = ({ name, icon }) => (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-600 rounded-lg w-28 h-28 bg-gray-700/50">
        <img src={icon} alt={name} className="h-12 w-12 object-contain rounded-full"/>
        <span className="mt-2 text-sm font-medium text-gray-300">{name}</span>
    </div>
);

const BookingConfirmationPage: React.FC<BookingConfirmationPageProps> = ({ details, user, onPaymentSuccess }) => {
    const [step, setStep] = useState<CheckoutStep>('review');

    const handlePaymentConfirmation = () => {
        setStep('processing');
        // Simulate payment verification API call
        setTimeout(() => {
            // Save booking to history on successful payment
            const historyKey = `serhubBookings_${user.email}`;
            const existingBookingsJSON = localStorage.getItem(historyKey);
            const existingBookings: BookingDetails[] = existingBookingsJSON ? JSON.parse(existingBookingsJSON) : [];
            localStorage.setItem(historyKey, JSON.stringify([details, ...existingBookings]));

            setStep('confirmed');
        }, 2500);
    }
    
    const renderStep = () => {
        switch(step) {
            case 'review':
                return (
                    <>
                        <div className="p-8 text-center bg-gray-800/50">
                            <h2 className="text-3xl font-bold text-white">Review Your Booking</h2>
                            <p className="mt-2 text-gray-400">Please confirm the details before proceeding to payment.</p>
                        </div>
                        <div className="p-8 space-y-6">
                            {/* ... Booking details ... */}
                            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                                <span className="text-gray-400">Service:</span>
                                <span className="font-semibold text-white text-lg">{details.service}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                                <span className="text-gray-400">Service Type:</span>
                                <span className="font-semibold text-white">{details.serviceType}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                                <span className="text-gray-400">Experience Level:</span>
                                <span className="font-semibold text-white">{details.experienceLevel}</span>
                            </div>
                             <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                                <span className="text-gray-400">Servicer:</span>
                                <span className="font-semibold text-white">{details.servicerName}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                                <span className="text-gray-400">Location:</span>
                                <span className="font-semibold text-white text-right max-w-xs">{details.location}</span>
                            </div>
                            <div className="flex justify-between items-center pt-4">
                                <span className="text-gray-300 text-xl">Total Amount:</span>
                                <span className="font-bold text-teal-400 text-3xl">₹{details.price.toFixed(2)}</span>
                            </div>
                            <div className="pt-6">
                                <button
                                    onClick={() => setStep('payment')}
                                    className="w-full bg-teal-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-teal-700 transition-colors text-lg"
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </>
                );
            case 'payment':
                 return (
                    <>
                        <div className="p-8 text-center bg-gray-800/50">
                            <h2 className="text-3xl font-bold text-white">Complete Your Payment</h2>
                            <p className="mt-4 font-bold text-teal-400 text-3xl">Total: ₹{details.price.toFixed(2)}</p>
                        </div>
                        <div className="p-8 text-center space-y-6">
                             <div>
                                <p className="text-gray-400">To complete your booking, please transfer the amount via UPI to:</p>
                                <div className="my-3 p-3 bg-teal-900/50 border border-teal-700 rounded-lg">
                                    <p className="text-lg font-bold text-teal-300 tracking-widest">7671997268</p>
                                </div>
                                <p className="text-xs text-gray-500">You can use any of the UPI apps below.</p>
                            </div>
                            <div className="flex justify-center items-center gap-6">
                                <UpiOption name="GPay" icon="https://i.pinimg.com/originals/05/3c/59/053c59b7ba37051bc7886ec935f6da25.png" />
                                <UpiOption name="Paytm" icon="https://assetscdn1.paytm.com/images/catalog/category/5165/paytm_logo.png" />
                                <UpiOption name="PhonePe" icon="https://i.pinimg.com/originals/f7/f4/ec/f7f4ecb8a5572f3114d573c18e42f437.jpg" />
                            </div>
                             <div className="pt-4">
                                <button
                                    onClick={handlePaymentConfirmation}
                                    className="w-full bg-green-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-green-700 transition-colors text-lg"
                                >
                                    I Have Paid, Confirm Booking
                                </button>
                            </div>
                        </div>
                    </>
                );
            case 'processing':
                return (
                    <div className="p-16 flex flex-col items-center justify-center text-center">
                        <svg className="animate-spin h-12 w-12 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <h2 className="text-2xl font-bold text-white mt-6">Confirming Payment...</h2>
                        <p className="mt-2 text-gray-400">Please wait, we are verifying your transaction.</p>
                    </div>
                );
            case 'confirmed':
                 return (
                    <>
                        <div className="p-8 text-center bg-green-500">
                             <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white mt-4">Booking Confirmed!</h2>
                            <p className="mt-2 text-green-100">Your service is scheduled. Thank you for choosing us.</p>
                        </div>
                        <div className="p-8 space-y-4">
                            <div className="text-center text-gray-300">
                                <p><strong>Service:</strong> {details.service} ({details.serviceType})</p>
                                 <p><strong>Servicer:</strong> {details.servicerName}</p>
                                <p><strong>Price:</strong> ₹{details.price.toFixed(2)}</p>
                            </div>
                            <div className="pt-4">
                                <button
                                    onClick={onPaymentSuccess}
                                    className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                                >
                                    Track Your Servicer
                                </button>
                            </div>
                        </div>
                    </>
                );
        }
    }

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden min-h-[400px] flex flex-col justify-center ring-1 ring-gray-700">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmationPage;