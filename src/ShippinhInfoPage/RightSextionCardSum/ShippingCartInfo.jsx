import { useContext } from "react";
import Context from "../../UseContext/Context";
import ShippingInfoItemCart from "./ShippingInfoItemCart";
import Shipping from "./ShippingInfoCard.module.css";

const ShippingCartInfo = ({ backGroundColor, shipping, paid }) => {
  const { totalPrice, currentCurrency, cartItems } = useContext(Context);
  // calculating the total price of the cart items by summing totalPrice which is calculated in app
  // and adding shipping cost
  const GrandTotal = Number(shipping)
    ? totalPrice + Number(shipping)
    : totalPrice;

  const totaledProducts = cartItems.reduce((acc, item) => {
    // finding if we already have this item in the accumulator
    const existing = acc.find((el) => el.id === item.id);
    // if we do,then we need to add the quantity of the current item's selectedSize to the
    //  existing item's totalQuantity
    if (existing) {
      existing.totalQuantity += item.selectedSize.quantity;
    } else {
      //  if we don't have this item in the accumulator,
      //  add new objectwith all its attributes,plus new attribute totalQuantity
      acc.push({ ...item, totalQuantity: item.selectedSize.quantity });
    }

    return acc;
  }, []);

  return (
    <div
      // this div is used to set background color of the cart info section from the props
      style={backGroundColor ? { backgroundColor: backGroundColor } : {}}
      className={Shipping.cartTotals}
    >
      <div className={Shipping.checkOutItemsContainer}>
        {/* mapping items from accumulator to ShippingInfoItemCart component */}
        {totaledProducts.map((item, index) => (
          <ShippingInfoItemCart key={index} item={item}></ShippingInfoItemCart>
        ))}
      </div>
      {/* this is below section with total price and shipping costs */}
      <div className={Shipping.costs}>
        <div className={Shipping.entry}>
          <span>Subtotal</span>
          <span className={Shipping.amount}>
            {currentCurrency}
            {totalPrice}
          </span>
        </div>
        <div className={Shipping.entry}>
          <span>Shipping</span>
          <span>{shipping}</span>
        </div>
      </div>
      <div className={Shipping.entry}>
        {paid ? (
          <span style={{ color: "#56B280" }}>Paid</span>
        ) : (
          <span>Total</span>
        )}
        <span
          className={paid ? Shipping.paidColor : Shipping.amount}
          style={{ fontSize: "1.3rem" }}
        >
          {currentCurrency}
          {GrandTotal}
        </span>
      </div>
    </div>
  );
};

export default ShippingCartInfo;
