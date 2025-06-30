import React from "react";
import { useContext } from "react";
import Shipping from "./Shipping.module.css"
import Context from "../UseContext/Context";
const ShippingInfoItemCart = ({ item }) => {
  const { cartItems } = useContext(Context);
  const { currentCurrency } = useContext(Context);
//  const totalQuantity = cartItems
//     .filter((cartItem) => cartItem.id === item.id)
//     .reduce((sum, cartItem) => sum + (cartItem.selectedSize.quantity || 0), 0);
  return (
    <div className={Shipping.ShippingInfoItemCart}>
      <div className={Shipping.imgContainer}>
        <img src={item.imgMain} alt="" />
        <div className={Shipping.infoCardAmountCircle}>{item.totalQuantity}</div>
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
