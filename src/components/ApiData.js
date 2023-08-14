import React, { useState, useEffect } from 'react';
import './ApiData.css';

function ApiData() {
  const [data, setData] = useState([]);

  async function fetchData(){
    const response = await fetch('https://bsedunet-backend.techsaas.cloud/indiacares/campaign/getAllCampaigns');
    const json = await response.json();
    setData(json.campaigns);
  }
  useEffect(() => {
    // Replace 'your-api-url' with the actual API endpoint
    fetchData();
  }, []);

  return (
    <div className="api-data">
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
