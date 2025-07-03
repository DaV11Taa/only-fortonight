import React from "react";
import Shipment from "./Shipping.module.css";

const ShipmentOption = ({ description, price, value, onChange, checked }) => {
	return (
		// input takes value of shipment method, which is set in Shipment component
		// and checked is set to true if this option is selected

		<div className={Shipment.shipmentOption}>
				<input
					id="shipmentMethod"
					name="shipmentMethod"
					type="radio"
					value={value}
					onChange={onChange}
					checked={checked}
				/>
				<span className={Shipment.optionDescription}>{description}</span>
				<span className={Shipment.optionPrice}>{price}</span>
		</div>
	);
};

export default ShipmentOption;
