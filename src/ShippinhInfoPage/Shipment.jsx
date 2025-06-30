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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (orderInfo.Shipment) {
      console.log("Selected shipment:", orderInfo.Shipment); 
      navigate("/paymentMethod");
    } else {
      alert("Select Shipment Method");
      return;
    }
  };

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
        <section className={ShippingCss.personalInfo}>
          <InfoEntry infoType="Contact" infoValue={orderInfo.contact} />
          <InfoEntry infoType="Ship to" infoValue={orderInfo.shipto} />
        </section>
        <h2>Shipping Methods</h2>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Removed empty action */}
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
            goTo="payment" 
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
