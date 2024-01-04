// PassengerSelector.js
import React from 'react';
import "./PassengerSelector.css"

const PassengerSelector = ({ passengers, selectedPassenger, onSelectPassenger, onAddPassenger }) => {
  return (
    <div className="passenger-selector">
      {passengers.map((passenger) => (
        <button
          key={passenger.id}
          className={`passenger-button ${selectedPassenger === passenger.id ? 'selected' : ''}`}
          onClick={() => onSelectPassenger(passenger.id)}
        >
          Passenger {passenger.id}
        </button>
      ))}
      <button onClick={onAddPassenger}>Add Passenger</button>
    </div>
  );
};

export default PassengerSelector;
