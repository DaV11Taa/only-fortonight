import React from "react";
import { useContext } from "react";
import Shipping from "./ShippingInfoCard.module.css";
import Context from "../../UseContext/Context";
const ShippingInfoItemCart = ({ item }) => {
  const { currentCurrency } = useContext(Context);
  // this component is used to display each item in the cart
  return (
    <div className={Shipping.ShippingInfoItemCart}>
      <div className={Shipping.imgContainer}>
        {/* item is indivisual object in the cart,whith no dublicate items ,with totalQuantity
        that is calculated in ShippingCartInfo component using reduce method */}
        <img src={item.imgMain} alt="" />
        <div className={Shipping.infoCardAmount}>
          {/* this is used to display the total quantity of the item in the cart
        that has position relative to the image */}
          <div className={Shipping.infoCardAmountCircle}>
            {item.totalQuantity}
          </div>
        </div>
      </div>
      <div>
        <h2>{item.name}</h2>
        <h3>
          {currentCurrency} {item.price}
        </h3>
      </div>
    </div>
  );
};

export default ShippingInfoItemCart;
