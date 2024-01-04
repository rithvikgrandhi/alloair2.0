// LabelsFilter.js
import "./LabelsFilter.css"
import React from 'react';

const LabelsFilter = ({ labels, selectedLabels, onLabelToggle }) => {
  return (
    <div className="labels-container">
      {labels.map((label) => (
        <button
          key={label.id}
          className={`label-button ${selectedLabels.includes(label.id) ? 'selected' : ''}`}
          onClick={() => onLabelToggle(label.id)}
        >
          {label.label}
        </button>
      ))}
    </div>
  );
};

export default LabelsFilter;
