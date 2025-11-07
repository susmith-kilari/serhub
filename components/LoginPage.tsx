import React, { useState } from 'react';
import { User, Role } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onSwitchToSignup: () => void;
}

// Fix: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
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


const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');

    const usersJSON = localStorage.getItem('serhubUsers');
    if (!usersJSON) {
        setLoginError('No users found. Please sign up first.');
        return;
    }

    const users: User[] = JSON.parse(usersJSON);
    const foundUser = users.find(user => user.email === email);

    if (!foundUser || foundUser.password !== password) {
        setLoginError('Invalid email or password. Please try again or sign up.');
        return;
    }
    
    onLoginSuccess(foundUser);
  };
  
  const handleGithubLogin = () => {
    setLoginError('');
    const githubUser: User = {
        name: 'GitHub User',
        email: 'user@github.com',
        mobile: '9876543210',
        password: 'github_oauth_user',
        country: 'India',
        role: Role.CUSTOMER,
    };

    const usersJSON = localStorage.getItem('serhubUsers');
    const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

    const existingUser = users.find(user => user.email === githubUser.email);
    
    if (existingUser) {
        onLoginSuccess(existingUser);
    } else {
        // User doesn't exist, create an account for them and log in
        users.push(githubUser);
        localStorage.setItem('serhubUsers', JSON.stringify(users));
        onLoginSuccess(githubUser);
    }
  };

  const FeatureIcons = {
    Account: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-4 0h4m-9 6h.01M13 12h.01M16 12h.01M13 15h.01M16 15h.01" /></svg>,
    Trust: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Solution: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  };

  return (
     <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Left Panel */}
          <div className="relative w-full md:w-2/5 p-8 text-white flex flex-col justify-center space-y-8 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
            <div className="absolute inset-0 bg-teal-800 bg-opacity-80"></div>
            <div className="relative z-10">
                <h2 className="text-3xl font-bold">Welcome Back to SERHUB</h2>
                <div className="mt-8 space-y-6">
                    <SignupFeature icon={FeatureIcons.Account} title="BOOK A SERVICE ONLINE" />
                    <SignupFeature icon={FeatureIcons.Trust} title="TRUST & TRANSPARENCY" />
                    <SignupFeature icon={FeatureIcons.Solution} title="ONE STOP SOLUTION" />
                </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
             <h2 className="text-3xl font-bold text-white mb-4">Sign In</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sign In
                </button>
              </form>
               <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-600"></div>
              </div>
              <button
                type="button"
                onClick={handleGithubLogin}
                className="w-full flex items-center justify-center bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <GithubIcon />
                Sign In with GitHub
              </button>
              <p className="mt-6 text-center text-sm text-gray-400">
                Don't have an Account?{' '}
                <button onClick={onSwitchToSignup} className="font-medium text-green-500 hover:text-green-400">
                  Sign Up Now
                </button>
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;