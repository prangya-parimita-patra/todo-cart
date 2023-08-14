import React, { useState, useEffect } from 'react';
import './ApiData.css';

function ApiData() {
  // State to hold the fetched data
  const [data, setData] = useState([]);

  // Function to fetch data from the API
  async function fetchData() {
    try {
      const response = await fetch('https://bsedunet-backend.techsaas.cloud/indiacares/campaign/getAllCampaigns');
      const json = await response.json();
      // Update the state with the fetched campaigns data
      setData(json.campaigns);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="api-data">
      {/* Display fetched data as cards */}
      <div className="card-container">
        {data.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.campaignImage} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p className="amount">INR {item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApiData;
