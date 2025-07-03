import React, { useEffect, useState } from "react";
import ShippingProgress from "./ShippingProgress/ShippingProgress";
import ShippingCss from "./Shipping.module.css";
import ShippingFooter from "./Footer/ShippingFooter";
import ShippingCartInfo from "./RightSextionCardSum/ShippingCartInfo";
import Context from "../UseContext/Context";
import InfoEntry from "./InfoEntry";
import ShipmentOption from "./ShipmentOption";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
const Shipment = () => {
  const { orderInfo, setOrderInfo, currentCurrency } = useContext(Context);
  const ShipmentPrices = useMemo(() => {

    switch (currentCurrency) {
      case "$":
        return [
          { price: 0, description: "free" },
          { price: 4.99, description: "4.99$" },
        ];
      case "€":
        return [
          { price: 0, description: "free" },
          { price: 10, description: "10€" },
        ];
      case "¥":
        return [
          { price: 0, description: "free" },
          { price: 15, description: "15£" },
        ];
      default:
        return [
          { price: 0, description: "free" },
          { price: 4.99, description: "4.99" },
        ];
    }
  }, [currentCurrency]);
  useEffect(() => {
    setOrderInfo((prev) => ({
      ...prev,
      Shipment: ShipmentPrices[0].price,
      ShipmentDisplay: `Standard Shipping - ${ShipmentPrices[0].description}`,
    }));
  }, [ShipmentPrices, setOrderInfo]);

  const navigate = useNavigate();

  // on form submission navigating to next page
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/paymentMethod");
  };
  // Function to handle shipment option selection,which on defauld is free shipping
  const chooseShipment = (value, description) => {
    setOrderInfo((prev) => ({
      ...prev,
      Shipment: value,
      ShipmentDisplay: description,
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
          {/* we take two options for shipment, free and express shipping 
          and take their value to set Shipments in orderInfo */}
          <ShipmentOption
            description="Standard Shipping"
            price="free"
            value={ShipmentPrices[0].price}
            onChange={() => chooseShipment(0, "Standard Shipping - free")}
            checked={orderInfo.Shipment === ShipmentPrices[0].price}
          />
          <ShipmentOption
            description="Express Shipping"
            price={ShipmentPrices[1].description}
            value={ShipmentPrices[1].price}
            onChange={() =>
              chooseShipment(
                ShipmentPrices[1].price,
                "Express Shipping - " + ShipmentPrices[1].description
              )
            }
            checked={orderInfo.Shipment === ShipmentPrices[1].price}
          />
          <ShippingFooter back="details" goToText="Go to payment" />
        </form>
      </div>
      <ShippingCartInfo
        backGroundColor="#F2F2F2"
        shipping={orderInfo.Shipment}
      />
    </div>
  );
};

export default Shipment;
