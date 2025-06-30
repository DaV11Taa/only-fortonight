
import { useContext } from "react";
import Context from "../UseContext/Context";
import ShippingInfoItemCart from "./ShippingInfoItemCart";
import Shipping from "./Shipping.module.css"
const ShippingCartInfo = ({ backGroundColor, shipping }) => {
  const { totalPrice,currentCurrency,cartItems}=useContext(Context)
    const GrandTotal = Number(shipping)
    ? totalPrice + Number(shipping)
    : totalPrice;

    const totaledProducts = cartItems.reduce((acc, item) => {
  // find same id  in accumulator array
  const existing = acc.find((el) => el.id === item.id);

  if (existing) {
    //  add the current item's quantity to the existing totalQuantity
    existing.totalQuantity += item.selectedSize.quantity;
  } else {
    //  add a new item with totalQuantity initialized to this item's quantity
    acc.push({ ...item, totalQuantity: item.selectedSize.quantity });
  }

  return acc; 
}, []);

  return (
    <div style={backGroundColor ? { backgroundColor: backGroundColor } : {}} className={Shipping.cartTotals}>
      <div className={Shipping.checkOutItemsContainer}>{totaledProducts.map((item,index)=>
      <ShippingInfoItemCart key={index} item={item}></ShippingInfoItemCart>
      )
        }</div>
      <div className={Shipping.costs}>
        <div className={Shipping.entry}>
          <span>Subtotal</span>
          <span className={Shipping.amount}>{currentCurrency}{totalPrice}</span>
        </div>
        <div className={Shipping.entry}>
          <span>Shipping</span>
          <span>{shipping}</span>
        </div>
      </div>
      <div className={Shipping.entry}>
        <span>Total</span>
        <span className={Shipping.amount} style={{fontSize:"1.3rem"}}>{currentCurrency}{GrandTotal}</span>
      </div>
    </div>
  );
};

export default ShippingCartInfo;
