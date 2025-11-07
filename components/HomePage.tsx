import React, { useState, useRef } from "react";
import {
  SERVICES,
  PROMOTIONAL_BANNERS,
  SERVICE_IMAGES,
} from "../constants";
import { User, BookingDetails } from "../types";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "./WhyChooseUs";
import LocationCheckModal from "./LocationCheckModal";
import ServiceInfoModal from "./ServiceInfoModal";

interface HomePageProps {
  user: User;
  onBookNow: (details: BookingDetails) => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, onBookNow }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = SERVICES.filter(service =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleBookNowClick = (service: string) => {
    setSelectedService(service);
    setIsInfoModalOpen(true);
  };
  
  const handleProceedToBooking = () => {
    setIsInfoModalOpen(false);
    setIsLocationModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsInfoModalOpen(false);
    setIsLocationModalOpen(false);
    setSelectedService(null);
  };

  const handleBookingComplete = (details: BookingDetails) => {
    handleCloseModals();
    onBookNow(details);
  }

  return (
    <div className="relative text-white min-h-screen bg-gradient-to-b from-gray-900 to-slate-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-white">Welcome, {user.name}!</h2>
            <p className="mt-2 text-lg text-gray-400">What can we help you with today?</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto my-8">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a service... (e.g., Cleaning)"
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-white">No Services Found</h3>
            <p className="mt-2 text-gray-400">Try a different search term.</p>
          </div>
        ) : (
          <>
            {/* Services Carousel */}
            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex items-center space-x-4 overflow-x-auto pb-4 scrollbar-hide"
              >
                {filteredServices.map((service) => (
                  <div
                    key={service}
                    className="flex-shrink-0 text-center group cursor-pointer w-28"
                    onClick={() => handleBookNowClick(service)}
                  >
                    <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-teal-500/20 ring-1 ring-gray-700 group-hover:ring-teal-500 transition-all overflow-hidden">
                      <img
                        src={SERVICE_IMAGES[service]}
                        alt={service}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-300 break-words">
                      {service}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-4 bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-700 z-10 hidden md:flex ring-1 ring-gray-700"
                aria-label="Scroll left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-4 bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-700 z-10 hidden md:flex ring-1 ring-gray-700"
                aria-label="Scroll right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Promotional Banners */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROMOTIONAL_BANNERS.map((banner, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl shadow-lg overflow-hidden group bg-gray-800/50 p-6 flex items-center h-48 ring-1 ring-gray-700 backdrop-blur-sm`}
                >
                  <div className="z-10 w-1/2">
                    <h3 className="text-lg font-bold text-white">
                      {banner.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {banner.description}
                    </p>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        const serviceName = banner.title.includes("AC") ? "AC Servicing" : banner.title.includes("Fridge") ? "Appliance Repair" : banner.title.includes("Electrician") ? "Electrician" : "Cleaning";
                        handleBookNowClick(serviceName);
                      }}
                      className="mt-4 inline-block font-semibold text-red-400 group-hover:text-red-300 transition-colors"
                    >
                      Book Now &rarr;
                    </a>
                  </div>
                  <div className="w-1/2 h-full flex items-center justify-center">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="h-full w-auto object-contain transform group-hover:scale-110 transition-transform duration-300 z-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <div className="relative z-10">
        <HowItWorks />
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                All Our Services
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Ready to help with any task, big or small. Book with a single
                click.
              </p>
            </div>
            {filteredServices.length > 0 && (
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredServices.map((service) => (
                    <div
                    key={service}
                    className="group bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border-2 border-gray-700 hover:border-teal-500"
                    >
                    <div className="relative h-48">
                        <img
                        src={SERVICE_IMAGES[service]}
                        alt={service}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        />
                    </div>
                    <div className="p-6 text-center">
                        <h3 className="text-lg font-semibold text-white">
                        {service}
                        </h3>
                        <button
                        onClick={() => handleBookNowClick(service)}
                        className="mt-4 w-full px-4 py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                        Book Now
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            )}
          </div>
        </div>
        <WhyChooseUs />
      </div>

      {isInfoModalOpen && selectedService && (
        <ServiceInfoModal
          serviceName={selectedService}
          onClose={handleCloseModals}
          onProceed={handleProceedToBooking}
        />
      )}

      {isLocationModalOpen && selectedService && (
        <LocationCheckModal
          service={selectedService}
          onClose={handleCloseModals}
          user={user}
          onBookingComplete={handleBookingComplete}
        />
      )}
    </div>
  );
};

export default HomePage;
