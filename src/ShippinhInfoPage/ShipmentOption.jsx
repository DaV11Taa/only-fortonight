import React from "react";
import Shipment from "./Shipping.module.css";

const ShipmentOption = ({ description, price, value, onChange, checked }) => {
  return (
    <div className={Shipment.shipmentOption}>
      <input 
        name="shipmentMethod"
        type="radio" 
        value={value} 
        onChange={onChange}
        checked={checked} // ← This is essential
      />
      <span className={Shipment.optionDescription}>{description}</span>
      <span className={Shipment.optionPrice}>{price}</span>
    </div>
  );
};

export default ShipmentOption;
