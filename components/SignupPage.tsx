import React, { useState } from "react";
import { Role, User } from "../types";

interface SignupPageProps {
  onSignupSuccess: (user: User) => void;
  onSwitchToLogin: () => void;
}

const SignupFeature: React.FC<{ icon: React.ReactElement; title: string }> = ({ icon, title }) => (
  <div className="flex items-center space-x-4">
    <div className="flex-shrink-0">{icon}</div>
    <span className="text-lg font-semibold text-white">{title}</span>
  </div>
);

const GithubIcon = () => (
    <svg className="w-5 h-5 mr-3" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
        <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3.3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.3zM256 0C114.6 0 0 114.6 0 256c0 113.3 73.3 209.1 175.1 242.9 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.3-6.2-10.1-27.8 2.3-57.2 0 0 21.3-6.8 70 25.8 20.3-5.6 42.1-8.3 63.6-8.3 21.6 0 43.4 2.8 63.6 8.3 48.6-32.6 70-25.8 70-25.8 12.4 29.4 4.6 51 2.3 57.2 16 17.6 23.6 31.4 23.6 58.9 0 96.5-58.6 104.2-114.6 110.2 9.3 7.9 17.3 23.6 17.3 45.9 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C422.7 465.1 496 369.3 496 256 496 114.6 381.4 0 256 0z"></path>
    </svg>
);

export default function SignupPage({ onSignupSuccess, onSwitchToLogin }: SignupPageProps) {
  const [step, setStep] = useState<'details' | 'otp_choice' | 'otp'>('details');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [otpDestination, setOtpDestination] = useState<'email' | 'mobile' | null>(null);
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupError('');

    const usersJSON = localStorage.getItem('serhubUsers');
    const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];
    const userExists = users.some(user => user.email === formData.email);

    if (userExists) {
        setSignupError('This email is already registered. Please sign in.');
        return;
    }

    setStep('otp_choice');
  };
  
  const handleOtpChoice = (destination: 'email' | 'mobile') => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(newOtp);
    setOtpDestination(destination);
    console.info(`[SIMULATION] OTP for ${destination} (${destination === 'email' ? formData.email : formData.mobile}): ${newOtp}`);
    setStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOtpError('');
    if (enteredOtp === simulatedOtp) {
      const newUser: User = {
        ...formData,
        country: "India",
        role: Role.CUSTOMER,
      };
      
      const usersJSON = localStorage.getItem('serhubUsers');
      const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];
      users.push(newUser);
      localStorage.setItem('serhubUsers', JSON.stringify(users));
      
      onSignupSuccess(newUser);
    } else {
      setOtpError('Invalid OTP. Please try again.');
    }
  };
  
  const handleGithubSignup = () => {
    setSignupError('');
    setIsGithubLoading(true);

    // Simulate network delay
    setTimeout(() => {
        const githubUser: User = {
            name: 'GitHub User',
            email: 'user@github.com',
            mobile: '9876543210', // A dummy mobile number
            password: 'github_oauth_user', // A dummy password to satisfy the User type
            country: 'India',
            role: Role.CUSTOMER,
        };

        const usersJSON = localStorage.getItem('serhubUsers');
        const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];
        
        const existingUser = users.find(user => user.email === githubUser.email);
        
        if (existingUser) {
            // If user already exists, just log them in
            onSignupSuccess(existingUser);
        } else {
            // If user does not exist, add them and then log them in
            users.push(githubUser);
            localStorage.setItem('serhubUsers', JSON.stringify(users));
            onSignupSuccess(githubUser);
        }
    }, 1500);
  };

  const FeatureIcons = {
    Account: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-4 0h4m-9 6h.01M13 12h.01M16 12h.01M13 15h.01M16 15h.01" /></svg>,
    Trust: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Solution: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  };

  const renderContent = () => {
    switch(step) {
      case 'details':
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Sign Up</h2>
            <form onSubmit={handleDetailsSubmit} className="space-y-5">
              <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="tel" name="mobile" placeholder="Enter Mobile Number" pattern="[0-9]{10}" maxLength={10} value={formData.mobile} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <button type="submit" className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors">
                Continue
              </button>
            </form>
            <div className="mt-6">
              <button 
                onClick={handleGithubSignup}
                disabled={isGithubLoading}
                className="w-full flex items-center justify-center py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">
                <GithubIcon />
                {isGithubLoading ? 'Signing up...' : 'Continue with GitHub'}
              </button>
            </div>
            {signupError && (
              <p className="mt-4 text-red-500">{signupError}</p>
            )}
            <p className="mt-6 text-gray-400 text-center">
              Already have an account?{' '}
              <button onClick={onSwitchToLogin} className="text-teal-500 hover:underline">
                Sign In
              </button>
            </p>
          </div>
        );
      case 'otp_choice':
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Verify your account</h2>
            <p className="text-gray-300 mb-6">How would you like to receive your verification code?</p>
            <div className="space-y-4">
              <button
                onClick={() => handleOtpChoice('email')}
                className="w-full py-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-3"
              >
                <span>Send code to email</span>
                <span className="text-gray-400">({formData.email})</span>
              </button>
              <button
                onClick={() => handleOtpChoice('mobile')}
                className="w-full py-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-3"
              >
                <span>Send code to mobile</span>
                <span className="text-gray-400">({formData.mobile})</span>
              </button>
            </div>
          </div>
        );
      case 'otp':
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Enter verification code</h2>
            <p className="text-gray-300 mb-6">
              We've sent a code to your {otpDestination}{' '}
              {otpDestination === 'email' ? formData.email : formData.mobile}
            </p>
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <input
                type="text"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                pattern="[0-9]{6}"
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {otpError && <p className="text-red-500">{otpError}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors"
              >
                Verify
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {renderContent()}
        </div>
        <div className="mt-8 space-y-6">
          <SignupFeature
            icon={FeatureIcons.Account}
            title="Secure Account Management"
          />
          <SignupFeature
            icon={FeatureIcons.Trust}
            title="Trusted by Thousands"
          />
          <SignupFeature
            icon={FeatureIcons.Solution}
            title="Complete Service Solution"
          />
        </div>
      </div>
    </div>
  );
};