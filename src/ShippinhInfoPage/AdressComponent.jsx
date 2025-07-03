import React from 'react'
import Styles from "./Shipping.module.css";
const AdressComponent = ({name , options , placeholder }) => {
  return (
    <div className={Styles.addressComponent}>
      <select 
        name={name} 
        id={name}
        className={Styles.addressSelect}
        defaultValue="" 
      >
      
         <option value="" disabled hidden>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
       <label className={Styles.addressSelectLabel} htmlFor={name}>
        {placeholder}
      </label></div>
  )
}

export default AdressComponent