// AddressComponent.jsx
import React, { useState } from 'react';
import Styles from "./AdressComponent.module.css";

const AddressComponent = ({ name, options, placeholder }) => {
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e) => {
    setHasValue(e.target.value !== '');
  };

  return (
    <div className={Styles.addressComponent}>
      <select 
        name={name} 
        id={name}
        className={Styles.addressSelect}
        defaultValue="" 
        onChange={handleChange}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className={Styles.selectArrow}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
    </div>
  );
};

export default AddressComponent;