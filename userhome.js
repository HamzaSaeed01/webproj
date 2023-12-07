import React from 'react';
import { Link } from 'react-router-dom';

function BookingPage() {
  return (
    <div className="container">
      <h2 className="notification-title">Welcome to Online Transport Booking Portal</h2>
      <div className="button-container">
        <Link to="/predefinedbooking" className="custom-link">
          PreDefined Routes
        </Link>
        <Link to="/custombooking" className="custom-link">
          Custom Booking
        </Link>
        <Link to="/mybooking" className="custom-link">
          My Bookings
        </Link>
      </div>
    </div>
  );
}

export default BookingPage;
