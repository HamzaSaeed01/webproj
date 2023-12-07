import React, { useEffect, useState } from 'react';
import './home.css';

// Import axios or your preferred HTTP client library
import axios from 'axios';

// Define your component or function where you want to interact with the backend

// Example React component
// class DriverComponent extends React.Component {
//   componentDidMount() {
//     // Fetch all drivers when the component mounts
//     this.fetchAllDrivers();
//   }

//   fetchAllDrivers = async () => {
//     try {
//       // Make a GET request to fetch all drivers
//       const response = await axios.get('/api/drivers');
      
//       // Handle the response data, e.g., update the state
//       const drivers = response.data;
//       console.log('All drivers:', drivers);
//     } catch (error) {
//       // Handle errors
//       console.error('Error fetching drivers:', error);
//     }
//   };

//   createDriver = async () => {
//     try {
//       // Make a POST request to create a new driver
//       const response = await axios.post('/api/drivers', {
//         // Provide data for creating a driver (you might have a form)
//         // Example: { name: 'John Doe', licenseNumber: '123456' }
//       });

//       // Handle the response data, e.g., update the state
//       const newDriver = response.data;
//       console.log('New driver created:', newDriver);

//       // Optionally, you might want to fetch all drivers again after creating one
//       this.fetchAllDrivers();
//     } catch (error) {
//       // Handle errors
//       console.error('Error creating driver:', error);
//     }
//   };

//   render() {
//     return (
//       <div>
//         {/* Your component UI goes here */}
//         <button onClick={this.createDriver}>Create Driver</button>
//       </div>
//     );
//   }
// }
function DriverManagement() {
  const [driversData, setDriversData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: '',
    email: '',
    CNic: ''
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [CNic, setCNic] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

  const fetchAllDrivers = async () => {
    try {
      // Make a GET request to fetch all drivers
      const response = await axios.get('http://localhost:5000/admin/driver/');

      // Handle the response data, e.g., update the state
      const driversData = response.data;
      setDriversData(driversData);
      console.log('All drivers:', driversData);
    } catch (error) {
      // Handle errors
      console.error('Error fetching drivers:', error);
    }
  };
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleCNIC = (event) => {
    setCNic(event.target.value);
  };
  const handleVehicle = (event) => {
    setVehicleNumber(event.target.value);
  };

  const createDriver = async (e) =>{
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:5000/admin/driver/`, {
        name: `${name}`,
        email: `${email}`,
        cnic: `${CNic}`,
        vehicle: `${vehicleNumber}`
      });

      console.log("Response:",response)
      setName('')
      setEmail('')
      setCNic('')
      setVehicleNumber('')

      // Navigate
    } catch (error) {
      // console.log("Hello Error")
            console.error('Error:', error);
    }
  };
  // const createDriver = async () => {
  //   try {
  //     // Make a POST request to create a new driver
  //     const response = await axios.post('http://localhost:5000/admin/driver/', newDriver);

  //     // Handle the response data, e.g., update the state
  //     const newDriver = response.data;
  //     console.log('New driver created:', newDriver);

  //     // Optionally, you might want to fetch all drivers again after creating one
  //     this.fetchAllDrivers();
  //   } catch (error) {
  //     // Handle errors
  //     console.error('Error creating driver:', error);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Add the new driver to the local state
  //   // setDriversData([...driversData, { ...newDriver, vehicleNumber }]);

  //   console.log(newDriver)
  //   createDriver();
  //   // Clear the form fields
  //   setNewDriver({
  //     name: '',
  //     email: '',
  //     CNic: ''
  //   });
  //   setVehicleNumber('');

  //   // Close the modal
  //   setShowModal(false);
  // };



  useEffect(() => {
    // Define the fetchAllDrivers function inside the useEffect
    

    // Call the fetchAllDrivers function when the component mounts
    fetchAllDrivers();
  }, []); 

  const handleDeleteDriver = (index) => {
    // Create a copy of the driversData array
    const updatedDriversData = [...driversData];

    // Remove the driver at the specified index
    updatedDriversData.splice(index, 1);

    // Update the state with the modified array
    setDriversData(updatedDriversData);
  };

  return (
    <div className='container'>
      <h2 className='notification-title'>Driver Information</h2>
      <div className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>CNic</th>
            <th>Vehicle Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {driversData.map((driver, index) => (
            <tr key={index}>
              <td>{driver.name}</td>
              <td>{driver.email}</td>
              <td>{driver.CNic}</td>
              <td>{driver.vehicleNumber}</td>
              <td>
                <button onClick={() => handleDeleteDriver(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </div>
      <button className='NewDriver' onClick={() => setShowModal(true)}>Add New Driver</button>
      {showModal &&
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add New Driver</h2>
            <form>
              <label>Name</label>
              <input type='text' name='name' value={name} onChange={handleName} />
              <br></br>
              <label>Email</label>
              <input type='text' name='email' value={email} onChange={handleEmail} />
              <br></br>
              <label>CNic</label>
              <input type='text' name='CNic' value={CNic} onChange={handleCNIC} />
              <br></br>
              <label>Vehicle Number</label>
              <input type='text' value={vehicleNumber} onChange={handleVehicle} />
              <br></br>
              <button className='submit' type='submit' onClick={createDriver}>Submit</button>
            </form>
          </div>
        </div>
      }
    </div>
  );
}

export default DriverManagement;