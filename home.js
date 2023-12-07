import React from 'react';
import { Link } from 'react-router-dom';
import './app.css'; // Import the CSS file for styling

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Online Transport Booking Application</h1>
        <p>Explore below:</p>
        <div className="button-container">
          <Link to="/driver" className="custom-link">
            Drivers
          </Link>
          <Link to="/vehicle" className="custom-link">
            Vehicles
          </Link>
          <Link to="/route" className="custom-link">
            Routes
          </Link>
          <Link to="/booking" className="custom-link">
            Bookings
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Home;
