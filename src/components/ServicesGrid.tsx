import React from 'react';
import { FEATURED_SERVICES, SERVICE_IMAGES } from '../constants';

const ServicesGrid: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Explore Our Services
            </h2>
            <p className="mt-4 text-lg text-gray-400">
                A wide range of services to keep your home running smoothly.
            </p>
        </div>
        <div className="mt-12 grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {FEATURED_SERVICES.map((service) => (
            <div key={service} className="group text-center">
              <div className="relative rounded-lg overflow-hidden aspect-square bg-gray-800 ring-1 ring-gray-700 transition-all duration-300 group-hover:ring-2 group-hover:ring-teal-400 group-hover:shadow-2xl group-hover:shadow-teal-500/20">
                <img 
                    src={SERVICE_IMAGES[service]} 
                    alt={service} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" 
                    loading="lazy"
                    decoding="async"
                />
                 <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-20"></div>
              </div>
              <h3 className="mt-4 text-md font-semibold text-gray-300">{service}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid;