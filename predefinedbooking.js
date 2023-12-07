import React, { useState } from 'react';

function RouteManagement() {
  const [routesData] = useState([
    {
      startingPoint: 'CityA',
      endingPoint: 'CityB',
      totalDistance: '150 km',
      estimatedTime: '2 hours',
      totalFare: '$50'
    },
    {
      startingPoint: 'CityC',
      endingPoint: 'CityD',
      totalDistance: '120 km',
      estimatedTime: '1.5 hours',
      totalFare: '$40'
    },
    // Add more hardcoded routes if needed
  ]);

  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBillingModal, setShowBillingModal] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    cnic: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('');

  const handleBookNow = (index) => {

  };

  const handleNextCustomerModal = () => {
    setShowCustomerModal(false);
    setShowPaymentModal(true);
  };

  const handleNextPaymentModal = () => {
    // Implement your logic for handling the next step (e.g., processing payment information)
    // For now, just close the modal
    setShowPaymentModal(false);
    setShowBillingModal(true);
  };

  const handleConfirmBooking = () => {
    // Implement your logic for confirming the booking
    // For now, just close the modal
    setShowBillingModal(false);
  };

  return (
    <div className='container'>
      <h2 className='notification-title'>Booking</h2>
      <div className='table'>
        <thead>
          <tr>
            <th>Starting Point</th>
            <th>Ending Point</th>
            <th>Total Distance</th>
            <th>Estimated Time</th>
            <th>Total Fare</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {routesData.map((route, index) => (
            <tr key={index}>
              <td>{route.startingPoint}</td>
              <td>{route.endingPoint}</td>
              <td>{route.totalDistance}</td>
              <td>{route.estimatedTime}</td>
              <td>{route.totalFare}</td>
              <td>
                <button onClick={() => handleBookNow(index)}>Book Now</button>
              </td>
            </tr>
          ))}
        </tbody>
      </div>

      {showCustomerModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setShowCustomerModal(false)}>&times;</span>
            <h2>Customer Information</h2>
            <form>
              <label>Name</label>
              <input type='text' name='name' value={customerInfo.name} onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })} />
              <br></br>
              <label>Phone</label>
              <input type='text' name='phone' value={customerInfo.phone} onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })} />
              <br></br>
              <label>Address</label>
              <input type='text' name='address' value={customerInfo.address} onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })} />
              <br></br>
              <label>CNIC</label>
              <input type='text' name='cnic' value={customerInfo.cnic} onChange={(e) => setCustomerInfo({ ...customerInfo, cnic: e.target.value })} />
              <br></br>
              <button className='submit' type='button' onClick={handleNextCustomerModal}>Next</button>
            </form>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setShowPaymentModal(false)}>&times;</span>
            <h2>Payment Method</h2>
            <h3>Payment Information</h3>
            <div className='payment-options'>
              <div className='payment-option'>
                <input
                  type='radio'
                  id='payOnArrival'
                  name='paymentMethod'
                  value='payOnArrival'
                  checked={paymentMethod === 'payOnArrival'}
                  onChange={() => setPaymentMethod('payOnArrival')}
                />
                <label className='payment-option-label' htmlFor='payOnArrival'>Pay on Arrival</label>
              </div>
              <div className='payment-option'>
                <input
                  type='radio'
                  id='creditCard'
                  name='paymentMethod'
                  value='creditCard'
                  checked={paymentMethod === 'creditCard'}
                  onChange={() => setPaymentMethod('creditCard')}
                />
                <label className='payment-option-label' htmlFor='creditCard'>Credit/Debit Card</label>
              </div>
              <div className='payment-option'>
                <input
                  type='radio'
                  id='jazzCash'
                  name='paymentMethod'
                  value='jazzCash'
                  checked={paymentMethod === 'jazzCash'}
                  onChange={() => setPaymentMethod('jazzCash')}
                />
                <label className='payment-option-label' htmlFor='jazzCash'>JazzCash</label>
              </div>
              <div className='payment-option'>
                <input
                  type='radio'
                  id='easyPaisa'
                  name='paymentMethod'
                  value='easyPaisa'
                  checked={paymentMethod === 'easyPaisa'}
                  onChange={() => setPaymentMethod('easyPaisa')}
                />
                <label className='payment-option-label' htmlFor='easyPaisa'>EasyPaisa</label>
              </div>
            </div>
            <button className='payment-next-button' onClick={handleNextPaymentModal}>Next</button>
          </div>
        </div>
      )}

      {showBillingModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setShowBillingModal(false)}>&times;</span>
            <h2>Billing Information</h2>
            <h3>Customer Name: {customerInfo.name}</h3>
            <h3>Address: {customerInfo.address}</h3>
            <h3>Phone Number: {customerInfo.phone}</h3>
            <h3>Payment Method: {paymentMethod}</h3>
            <button className='confirm-booking-button' onClick={handleConfirmBooking}>Confirm Booking</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RouteManagement;