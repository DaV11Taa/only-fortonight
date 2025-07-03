import React from "react";
import ShippingFooter from "./Footer/ShippingFooter";
import ShippingProgress from "./ShippingProgress/ShippingProgress";
import InfoEntry from "./InfoEntry";
import ShippingCartInfo from "./RightSextionCardSum/ShippingCartInfo";
import Shipping from "./Shipping.module.css";
import Context from "../UseContext/Context";
import { useContext } from "react";
import PaymentCard from "./PaymentCard/PaymentCard";
const PaymentMethod = () => {
  const { orderInfo } = useContext(Context);

  return (
    <div className={Shipping.ShippingInfoContainer}>
      <div className={Shipping.DetailsBox}>
        <div>
          <ShippingProgress step={3} />
          <div className={Shipping.personalInfo}>
            {/* here goes container for personal info info entered by user */}
            <InfoEntry infoType="Contact" infoValue={orderInfo.contact} />
            <InfoEntry infoType="Ship to" infoValue={orderInfo.shipto} />
            <InfoEntry
              infoType="Method"
              infoValue={orderInfo.ShipmentDisplay}
            />
          </div>
        </div>

       
        <PaymentCard />
      </div>
      {/* right section which contains cart items and total price */}
      <ShippingCartInfo
        backGroundColor="#F2F2F2"
        shipping={orderInfo.Shipment}
      />
    </div>
  );
};

export default PaymentMethod;
