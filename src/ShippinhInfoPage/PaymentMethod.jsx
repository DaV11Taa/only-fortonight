import React from "react";
import ShippingFooter from "./ShippingFooter";
import ShippingProgress from "./ShippingProgress";
import InfoEntry from "./InfoEntry";
import ShippingCartInfo from "./ShippingCartInfo";
import Shipping from "./Shipping.module.css";
import Context from "../UseContext/Context";
import { useContext } from "react";
const PaymentMethod = () => {
  const { orderInfo, setOrderInfo } = useContext(Context);

  return (
    <div className={Shipping.ShippingInfoContainer}>
      <div style={{ width:"45%"}}>
        <div className={Shipping.DetailsBox}>
          <ShippingProgress step={3} />
          <div className={Shipping.personalInfo}>
            <InfoEntry infoType="Contact" infoValue={orderInfo.contact} />
            <InfoEntry infoType="Ship to" infoValue={orderInfo.shipto} />
            <InfoEntry infoType="Method" infoValue={orderInfo.shipment} />
          </div>
          {/* Here goes card payment component */}
        </div>
        <ShippingFooter back="Shipping" goToText="Pay Now" />
      </div>

      <ShippingCartInfo
        backGroundColor="#F2F2F2"
        shipping={orderInfo.Shipment}
      />
    </div>
  );
};

export default PaymentMethod;
