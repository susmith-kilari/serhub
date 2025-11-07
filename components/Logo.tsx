import React from 'react';

const Logo: React.FC = () => (
  <div className="flex items-center space-x-3">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z" fill="url(#paint0_linear_logo)"/>
      <path d="M19 11C19 10.4477 18.5523 10 18 10H14C12.3431 10 11 11.3431 11 13V14C11 14.5523 11.4477 15 12 15H16C17.6569 15 19 16.3431 19 18V19C19 20.6569 17.6569 22 16 22H12C11.4477 22 11 21.5523 11 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="paint0_linear_logo" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2DD4BF"/>
          <stop offset="1" stopColor="#0D9488"/>
        </linearGradient>
      </defs>
    </svg>
    <span className="text-2xl font-bold text-teal-500">SERHUB</span>
  </div>
);

export default Logo;
