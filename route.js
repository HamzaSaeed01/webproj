import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RouteManagement() {
  const [routesData, setRoutesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRoute, setNewRoute] = useState({
    startingPoint: '',
    endingPoint: '',
    totalDistance: '',
    estimatedTime: '',
    totalFare: ''
  });
  const [startingpoint, setSP] = useState('');
  const [endingpoint, setEP] = useState('');
  const [totalfare, setTF] = useState('');
  const [estimatedTime, setET] = useState('');
  const [totalDistance, setTD] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoute({ ...newRoute, [name]: value });
  };

  const handleName = (event) => {
    setSP(event.target.value);
  };
  const handleEmail = (event) => {
    setEP(event.target.value);
  };
  const handleCNIC = (event) => {
    setTF(event.target.value);
  };
  const handleVehicle = (event) => {
    setET(event.target.value);
  };
  const handleVeh = (event) => {
    setTD(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the new route to the local state
    setRoutesData([...routesData, newRoute]);

    // Clear the form fields
    setNewRoute({
      startingPoint: '',
      endingPoint: '',
      totalDistance: '',
      estimatedTime: '',
      totalFare: ''
    });

    // Close the modal
    setShowModal(false);
  };

  const fetchAllDrivers = async () => {
    try {
      // Make a GET request to fetch all drivers
      const response = await axios.get('http://localhost:5000/admin/predefinedRoutes/');

      // Handle the response data, e.g., update the state
      const vehiclesData = response.data;
      setRoutesData(vehiclesData);
      console.log('All vehicles:', vehiclesData);
    } catch (error) {
      // Handle errors
      console.error('Error fetching drivers:', error);
    }
  };

  
  const createDriver = async (e) =>{
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:5000/admin/predefinedRoutes`, {
        startingpoint: `${startingpoint}`,
        endingpoint: `${endingpoint}`,
        totalfare: `${totalfare}`,
        totalDistance: `${totalDistance}`,
        estimatedTime: `${estimatedTime}`
      });

      console.log("Response:",response)
      setSP('')
      setEP('')
      setTF('')
      setET('')
      setTD('')

      // Navigate
    } catch (error) {
      // console.log("Hello Error")
            console.error('Error:', error);
    }
  };

  const handleDeleteRoute = (index) => {
    // Create a copy of the routesData array
    const updatedRoutesData = [...routesData];

    // Remove the route at the specified index
    updatedRoutesData.splice(index, 1);

    // Update the state with the modified array
    setRoutesData(updatedRoutesData);
  };

  useEffect(() => {
    // Define the fetchAllDrivers function inside the useEffect
    

    // Call the fetchAllDrivers function when the component mounts
    fetchAllDrivers();
  }, []); 

  return (
    <div className='container'>
      <h2 className='notification-title'>Route Management</h2>
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
                <button onClick={() => handleDeleteRoute(index)}>Delete Route</button>
              </td>
            </tr>
          ))}
        </tbody>
      </div>
      <button className='NewRoute' onClick={() => setShowModal(true)}>Add New Route</button>
      {showModal &&
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add New Route</h2>
            <form>
              <label>Starting Point</label>
              <input type='text' name='startingPoint' value={startingpoint} onChange={handleName} />
              <br></br>
              <label>Ending Point</label>
              <input type='text' name='endingPoint' value={endingpoint} onChange={handleEmail} />
              <br></br>
              <label>Total Distance</label>
              <input type='text' name='totalDistance' value={totalDistance} onChange={handleVeh} />
              <br></br>
              <label>Estimated Time</label>
              <input type='text' name='estimatedTime' value={estimatedTime} onChange={handleVehicle} />
              <br></br>
              <label>Total Fare</label>
              <input type='text' name='totalFare' value={totalfare} onChange={handleCNIC} />
              <br></br>
              <button className='submit' type='submit' onClick={createDriver}>Submit</button>
            </form>
          </div>
        </div>
      }
    </div>
  );
}

export default RouteManagement;