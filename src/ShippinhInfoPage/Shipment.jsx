import React, { useState } from "react";
import ShippingProgress from "./ShippingProgress";
import ShippingCss from "./Shipping.module.css";
import ShippingFooter from "./ShippingFooter";
import ShippingCartInfo from "./ShippingCartInfo";
import Context from "../UseContext/Context";
import InfoEntry from "./InfoEntry";
import ShipmentOption from "./ShipmentOption";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Shipment = () => {
  const { orderInfo, setOrderInfo } = useContext(Context);
  const navigate = useNavigate();
  // on form submittion navigating to next page
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Selected shipment:", orderInfo.Shipment);
    navigate("/paymentMethod");
  };
  // Function to handle shipment option selection,which on defauld is free shipping
  const chooseShipment = (e) => {
    setOrderInfo((prev) => ({
      ...prev,
      Shipment: e.target.value,
    }));
  };

  return (
    <div className={ShippingCss.ShippingInfoContainer}>
      <div className={ShippingCss.DetailsBox}>
        <ShippingProgress step={2} />
        {/* Section for personal info which takes as probs orderInfo which was set in shipment details page */}
        <section className={ShippingCss.personalInfo}>
          <InfoEntry infoType="Contact" infoValue={orderInfo.contact} />
          <InfoEntry infoType="Ship to" infoValue={orderInfo.shipto} />
        </section>
        <h2>Shipping Methods</h2>
        <form onSubmit={handleSubmit}>
          {/* Removed empty action */}
          {/* we take two options for shipment, free and express shipping 
          and take their value to set Shipments in orderInfo */}
          <ShipmentOption
            description="Standard Shipping"
            price="free"
            value={0}
            onChange={chooseShipment}
            checked={orderInfo.Shipment === 0}
          />
          <ShipmentOption
            description="Express Shipping"
            price="4.99$"
            value={4.99}
            onChange={chooseShipment}
            checked={orderInfo.Shipment === 4.99}
          />
          <ShippingFooter
            back="details"
            goToText="Go to payment"
          />
        </form>
      </div>
      <ShippingCartInfo
        backGroundColor="#56B28033"
        shipping={orderInfo.Shipment}
      />
    </div>
  );
};

export default Shipment;
