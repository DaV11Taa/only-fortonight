import React, { useContext } from "react";
import Cartitems from "./Cartitems";
import Context from "../UseContext/Context";
import cartStyles from "./CartStyles.module.css"
import { useNavigate } from "react-router-dom";
const CartPage = () => {
    const {totalPrice,totalQuantity, currentCurrency}=useContext(Context)
   const navigate=useNavigate()
   const sendToShipping=()=>{
    navigate("/shipping/details")
   }

  return (
    <div className={cartStyles.CartPage}>
      <h1>Cart</h1>
      <Cartitems />
      <p><div >Quantity:</div>  <span className={cartStyles.totals}>{totalQuantity}</span></p>
        <p > <div className={cartStyles.totalLabel}>Total:</div>  <span className={cartStyles.totals}>{currentCurrency} {totalPrice}</span></p>
        <button onClick={sendToShipping} className={
            cartStyles.continueButton
        }> CONTINUE</button>
    </div>
  );
};

export default CartPage;
