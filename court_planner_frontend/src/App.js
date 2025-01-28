import React, {useState} from 'react';
import './App.css';
import Navbar from './Navbar';
import HomePage from './HomePage';
import {UserProvider} from './UserContext';

function App () {
  const [selectedLocation, setSelectedLocation] = useState (null);

  return (
    <UserProvider>
      <div className="App">
        <Navbar
          onLocationSelect={setSelectedLocation}
          selectedLocationName={
            selectedLocation ? selectedLocation.name : 'LOCATION'
          }
        />
        {selectedLocation && <HomePage selectedLocation={selectedLocation} />}
      </div>
    </UserProvider>
  );
}

export default App;
