import React from "react";
import { Link } from "react-router-dom";
import ShippingCss from "./Footer.module.css"
const ShippingFooter = ({ back, goToText }) => {
  // footer takes as a probs back which is a string that is used to create a link to the previous page
  // and goToText which is a string that is used as a text for the button
  return (
    <div className={ShippingCss.ShippingFooter}>
     
      <Link to={`/${back}`} >back to {back}</Link>
      <button  type="submit" >{goToText}</button>
    </div>
  );
};

export default ShippingFooter;
