import React, { useEffect, useState } from 'react'
import '../styles/App.css'
import { Driver } from '../types';
import { drivers } from '../data/drivers';
import { teams } from '../data/teams';

function App() {
  const [driverData, setDriverData] = useState<Driver[]>([]);

  useEffect(() => {
    fetch('https://api.openf1.org/v1/drivers?session_key=latest')
      .then(response => response.json())
      .then(data => setDriverData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="drivers-row">
      {driverData.map(driver => (
        <img
          key={driver.driver_number}
          src={driver.headshot_url}
          alt={driver.full_name}
          title={`${drivers[driver.name_acronym as keyof typeof drivers]} - ${teams[driver.team_name.replace(' ', '') as keyof typeof teams]}`}
        />
      ))}
    </div>
  );
}

export default App
