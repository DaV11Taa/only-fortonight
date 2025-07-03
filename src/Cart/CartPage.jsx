import React, { useContext } from "react";
import Cartitems from "./Cartitems";
import Context from "../UseContext/Context";
import cartStyles from "./CartStyles.module.css"
import { useNavigate } from "react-router-dom";
const CartPage = () => {
    const {totalPrice,totalQuantity, currentCurrency}=useContext(Context)
   const navigate=useNavigate()
   const sendToShipping=()=>{
    if(totalQuantity===0){
      alert("Your cart is empty")
      return
    }
    navigate("/shipping/details")
   }

  return (
    <div className={cartStyles.CartPage}>
     
      <h1>Cart</h1>
      { totalQuantity === 0 ? <h2>Your cart is empty</h2>:
      <Cartitems />}
      <div><p >Quantity:</p>  <span className={cartStyles.totals}>{totalQuantity}</span></div>
        <div> <p className={cartStyles.totalLabel}>Total:</p>  <span className={cartStyles.totals}>{currentCurrency} {totalPrice}</span></div>
        <button onClick={sendToShipping} className={
            cartStyles.continueButton
        }> CONTINUE</button>
    </div>
  );
};

export default CartPage;
