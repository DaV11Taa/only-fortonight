import React from "react";
import { Link } from "react-router-dom";
import ShippingCss from "./Shipping.module.css"
import { useNavigate } from "react-router-dom";
const ShippingFooter = ({ back, goTo, goToText }) => {
  const navigate=useNavigate();
  
  return (
    <div className={ShippingCss.ShippingFooter}>
     
      <Link to={`/${back}`} >back to {back}</Link>
      <button  type="submit" >{goToText}</button>
    </div>
  );
};

export default ShippingFooter;
