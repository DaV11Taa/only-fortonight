import React from "react";
import ShippingProgress from "./ShippingProgress";
import ShippingFooter from "./ShippingFooter";
import ShippingCss from "./Shipping.module.css";
import AdressComponent from "./AdressComponent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShippingCartInfo from "./ShippingCartInfo";
const ShippingDetails = () => {
   const [errors, setErrors] = useState({});
   const navigate=useNavigate()
   const {setOrderInfo}=useContext(context)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    let newErrors = {};

    // Required validation
    if (!data.contact?.trim()) newErrors.contact = "Contact is required";
    if (!data.firstName?.trim()) newErrors.firstName = "First name is required";
        if (!data.secondName?.trim()) newErrors.secondName = "Second name is required";
            if (!data.address?.trim()) newErrors.address = "Address or number is required";
             
    if (!data.city?.trim()) newErrors.city = "City is required";
       
    if (!data.postalCode?.trim()) newErrors.postalCode = "Postal code is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.contact && !emailRegex.test(data.contact)) {
      newErrors.contact = "Enter a valid email";
    }
    setErrors(newErrors);

    if(errors.length==0){
      const contact=data.contact
      const shipTo=data.address+","+data.postalCode+","

      setOrderInfo({contact:contact,shipto:shipTo})
    }
  }

  return (
    <div className={ShippingCss.ShippingInfoContainer}>
      <div className={ShippingCss.ShippingDetailsBox}>
        <ShippingProgress step={1} />
        <form className={ShippingCss.detailsForm} action="" onSubmit={handleSubmit}>
          <div className={ShippingCss.inputBox}>
            <p>Contact</p>
            <input
              type="text"
              placeholder="Email or mobile phone number"
              style={{ marginBottom: "1.8rem" }}
              name="contact"
            />
            <div className={ShippingCss.required}>{errors?.contact}</div>
          </div>
          <p>Shipping Address</p>
          <div className={ShippingCss.nameInputRow}>
            <div className={ShippingCss.inputBox}>
              <input type="text" placeholder="First Name" name="firstName"/>
              <div className={ShippingCss.required}>{errors?.firstName}</div>
            </div>
            <div className={ShippingCss.inputBox}>
              <input type="text" placeholder="Second Name" name="secondName"/>
              <div className={ShippingCss.required}>{errors?.secondName}</div>
            </div>
          </div>
          <div className={ShippingCss.inputBox}>
            <input type="text" placeholder="Address and number" name="address" />
            <div className={ShippingCss.required}>{
              errors?.address}</div>
          </div>
          <div>
            <input type="text" placeholder="Shipping note (optional)" />
          </div>
          <div className={ShippingCss.nameInputRow}>
            <div className={ShippingCss.inputBox}>
              {" "}
              <input type="text" placeholder="City" name="city" />
              <div className={ShippingCss.required}>{errors?.city}</div>
            </div>
            <div className={ShippingCss.inputBox}>
              {" "}
              <input type="text" placeholder="Postal Code" name="postalCode" />
              <div className={ShippingCss.required}>{errors.postalCode}</div>
            </div>
            <div>
              {" "}
              <AdressComponent placeholder="Province" options={[]} />
            </div>
          </div>
          <AdressComponent placeholder="Country/Region " options={[]} />
          <div className={ShippingCss.cookies}>
            <input type="checkbox" />
            <div>Save this informations for a future fast checkout</div>
          </div>
          <ShippingFooter
            back="Card"
            goTo="Shipping"
            goToText="Go to shipping"
            handleSubmit={handleSubmit}
          />
        </form>
      </div>
      <ShippingCartInfo backGroundColor="white" shipping="Calculated at next Step"  ></ShippingCartInfo>
    </div>
  );
};

export default ShippingDetails;
