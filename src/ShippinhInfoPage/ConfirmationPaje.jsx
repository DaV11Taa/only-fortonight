import React from "react";
import ShippingProgress from "./ShippingProgress/ShippingProgress";
import ShippingCartInfo from "./RightSextionCardSum/ShippingCartInfo";
import styles from "./Shipping.module.css";
import { useContext } from "react";
import Context from "../UseContext/Context";
import ShipingPayment from "./ShipingPayment";

const ConfirmationPaje = () => {
    const{orderInfo}=useContext(Context);
  return (
    <div className={styles.ShippingInfoContainer}>
      <div>
        <ShippingProgress step={4} />
        <ShipingPayment />
      </div>
      <ShippingCartInfo backGroundColor="#F2F2F2"
      shipping={orderInfo.Shipment}
      
         paid={true}/>
    </div>
  );
};

export default ConfirmationPaje;
