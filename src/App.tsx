import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookingConfirmationPage from "./components/BookingConfirmationPage";
import BookingHistoryPage from "./components/BookingHistoryPage";
import BookingTrackingPage from "./components/BookingTrackingPage";
import { User, BookingDetails } from "./types";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<"landing" | "signup" | "login">("landing");
  const [loggedInView, setLoggedInView] = useState<"home" | "booking" | "history" | "tracking">("home");
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("serhubUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("serhubUser");
      }
    }
  }, []);

  const handleAuthSuccess = (signedUpUser: User) => {
    localStorage.setItem("serhubUser", JSON.stringify(signedUpUser));
    setUser(signedUpUser);
    setLoggedInView("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("serhubUser");
    setUser(null);
    setBookingDetails(null);
    setCurrentPage("landing");
  };

  const handleBookingComplete = (details: Omit<BookingDetails, 'id' | 'date'>) => {
    const newBooking: BookingDetails = {
      ...details,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setBookingDetails(newBooking);
    setLoggedInView("booking");
  };

  const handlePaymentSuccess = () => {
    setLoggedInView("tracking");
  };
  
  const handleTrackBooking = (details: BookingDetails) => {
    setBookingDetails(details);
    setLoggedInView("tracking");
  };

  const handleBackToHome = () => {
    setBookingDetails(null);
    setLoggedInView("home");
  }

  if (user) {
    let content;
    switch (loggedInView) {
        case "booking":
            content = bookingDetails ? (
                <BookingConfirmationPage 
                    details={bookingDetails} 
                    user={user}
                    onPaymentSuccess={handlePaymentSuccess} 
                />
            ) : null;
            break;
        case "history":
            content = <BookingHistoryPage user={user} onTrackBooking={handleTrackBooking} />;
            break;
        case "tracking":
             content = bookingDetails ? (
                <BookingTrackingPage 
                    details={bookingDetails} 
                    onComplete={handleBackToHome}
                />
            ) : null;
            break;
        case "home":
        default:
            content = <HomePage user={user} onBookNow={handleBookingComplete} />;
            break;
    }

    return (
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Header
          isLoggedIn={true}
          user={user}
          onLogout={handleLogout}
          onMyBookingsClick={() => setLoggedInView("history")}
          showBackButton={loggedInView !== 'home'}
          onBackClick={handleBackToHome}
        />
        <main className="flex-grow">{content}</main>
        <Footer />
      </div>
    );
  }

  const renderContent = () => {
    switch (currentPage) {
      case "signup":
        return (
          <SignupPage
            onSignupSuccess={handleAuthSuccess}
            onSwitchToLogin={() => setCurrentPage("login")}
          />
        );
      case "login":
        return (
          <LoginPage
            onLoginSuccess={handleAuthSuccess}
            onSwitchToSignup={() => setCurrentPage("signup")}
          />
        );
      case "landing":
      default:
        return <LandingPage onGetStartedClick={() => setCurrentPage("signup")} onLoginClick={() => setCurrentPage("login")} />;
    }
  };
  
  const showHeader = currentPage !== 'landing';

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {showHeader && (
         <Header
            isLoggedIn={false}
            onLoginClick={() => setCurrentPage("login")}
            onSignupClick={() => setCurrentPage("signup")}
            showBackButton={currentPage !== 'landing'}
            onBackClick={() => setCurrentPage('landing')}
            onLogout={() => {}}
        />
      )}
      <main className="flex-grow">{renderContent()}</main>
      <Footer />
    </div>
  );
};

export default App;