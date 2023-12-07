import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VehicleManagement() {
  const [vehiclesData, setVehiclesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    company: '',
    registrationNumber: '',
    model: ''
  });
  const [company, setCompany] = useState('');
  const [model, setModel] = useState('');
  const [regNumber, setRegNumber] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Add the new vehicle to the local state
  //   setVehiclesData([...vehiclesData, newVehicle]);

  //   // Clear the form fields
  //   setNewVehicle({
  //     company: '',
  //     registrationNumber: '',
  //     model: ''
  //   });

  //   // Close the modal
  //   setShowModal(false);
  // };
  const handleEmail = (event) => {
    setCompany(event.target.value);
  };
  const handleCNIC = (event) => {
    setModel(event.target.value);
  };
  const handleVehicle = (event) => {
    setRegNumber(event.target.value);
  };
  const createDriver = async (e) =>{
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:5000/admin/vehicle`, {
        company: `${company}`,
        model: `${model}`,
        regNumber: `${regNumber}`
      });

      console.log("Response:",response)
      setCompany('')
      setModel('')
      setRegNumber('')

      // Navigate
    } catch (error) {
      // console.log("Hello Error")
            console.error('Error:', error);
    }
  };

  const handleDeleteVehicle = (index) => {
    // Create a copy of the vehiclesData array
    const updatedVehiclesData = [...vehiclesData];

    // Remove the vehicle at the specified index
    updatedVehiclesData.splice(index, 1);

    // Update the state with the modified array
    setVehiclesData(updatedVehiclesData);
  };

  const fetchAllDrivers = async () => {
    try {
      // Make a GET request to fetch all drivers
      const response = await axios.get('http://localhost:5000/admin/vehicle/');

      // Handle the response data, e.g., update the state
      const vehiclesData = response.data;
      setVehiclesData(vehiclesData);
      console.log('All vehicles:', vehiclesData);
    } catch (error) {
      // Handle errors
      console.error('Error fetching drivers:', error);
    }
  };

  useEffect(() => {
    // Define the fetchAllDrivers function inside the useEffect
    

    // Call the fetchAllDrivers function when the component mounts
    fetchAllDrivers();
  }, []); 
  return (
    <div className='container'>
      <h2 className='notification-title'>Vehicle Management</h2>
      <div className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th>Registration Number</th>
            <th>Model</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehiclesData.map((vehicle, index) => (
            <tr key={index}>
              <td>{vehicle.company}</td>
              <td>{vehicle.registrationNumber}</td>
              <td>{vehicle.model}</td>
              <td>
                <button onClick={() => handleDeleteVehicle(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </div>
      <button className='NewVehicle' onClick={() => setShowModal(true)}>Add New Vehicle</button>
      {showModal &&
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add New Vehicle</h2>
            <form>
              <label>Company</label>
              <input type='text' name='company' value={company} onChange={handleEmail} />
              <br></br>
              <label>Registration Number</label>
              <input type='text' name='registrationNumber' value={regNumber} onChange={handleVehicle } />
              <br></br>
              <label>Model</label>
              <input type='text' name='model' value={model} onChange={handleCNIC} />
              <br></br>
              <button className='submit' type='submit' onClick={createDriver}>Submit</button>
            </form>
          </div>
        </div>
      }
    </div>
  );
}

export default VehicleManagement;