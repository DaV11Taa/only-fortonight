import React from "react";
import ShippingProgress from "./ShippingProgress/ShippingProgress.jsx";
import ShippingFooter from "./Footer/ShippingFooter.jsx";
import ShippingCss from "./Shipping.module.css";
import AdressComponent from "./AdressComponent/AdressComponent.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShippingCartInfo from "./RightSextionCardSum/ShippingCartInfo.jsx";
import { useContext } from "react";
import Context from "../UseContext/Context";
import { countryProvinces , countries} from "./AdressData.js";

const ShippingDetails = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setOrderInfo } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    let newErrors = {};

    // 1. Contact Validation
    if (!data.contact?.trim()) {
      newErrors.contact = "Contact is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?\d{7,15}$/;
      const isEmail = emailRegex.test(data.contact);
      const isPhone = phoneRegex.test(data.contact);

      if (!(isEmail || isPhone)) {
        newErrors.contact = "Enter a valid email or phone number";
      }
    }

    // 4. Address Validation
    if (!data.address?.trim()) {
      newErrors.address = "Address is required";
    } else if (data.address.trim().length < 5) {
      newErrors.address = "Address is too short";
    }

    // keep other validations here
    if (!data.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!data.secondName?.trim())
      newErrors.secondName = "Second name is required";
    if (!data.city?.trim()) newErrors.city = "City is required";
    if (!data.postalCode?.trim())
      newErrors.postalCode = "Postal code is required";
    if (!data.country?.trim())
      newErrors.country = "Country is required";
    if (!data.province?.trim())
      newErrors.province = "Province is required";
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const contact = data.contact;
      const shipTo =
        data.address +
        "," +
        data.postalCode +
        "," +
        data?.city +
        "," +
        data?.province +
        "," +
        data?.country;
      setOrderInfo({ contact: contact, shipto: shipTo });
      navigate("/shipping");
    }
  };

  return (
    <div className={ShippingCss.ShippingInfoContainer}>
      <div className={ShippingCss.ShippingDetailsBox}>
        <ShippingProgress step={1} />
        <form
          className={ShippingCss.detailsForm}
          action=""
          onSubmit={handleSubmit}
        >
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
              <input type="text" placeholder="First Name" name="firstName" />
              <div className={ShippingCss.required}>{errors?.firstName}</div>
            </div>
            <div className={ShippingCss.inputBox}>
              <input type="text" placeholder="Second Name" name="secondName" />
              <div className={ShippingCss.required}>{errors?.secondName}</div>
            </div>
          </div>
          <div className={ShippingCss.inputBox}>
            <input
              type="text"
              placeholder="Address and number"
              name="address"
            />
            <div className={ShippingCss.required}>{errors?.address}</div>
          </div>
          <div>
            <input type="text" placeholder="Shipping note (optional)" />
          </div>
          <div
            className={ShippingCss.nameInputRow}
            style={{ marginTop: "1.1rem" }}
          >
            <div className={ShippingCss.inputBox}>
              <input type="text" placeholder="City" name="city" />
              <div className={ShippingCss.required}>{errors?.city}</div>
            </div>
            <div className={ShippingCss.inputBox}>
              <input type="text" placeholder="Postal Code" name="postalCode" />
              <div className={ShippingCss.required}>{errors.postalCode}</div>
            </div>
            <div>
              <AdressComponent
                name="province"
                options={countryProvinces}
                placeholder="Select Province"
              />
              <div className={ShippingCss.required}>{errors.province}</div>
            </div>
          </div>
          <AdressComponent
            name="country"
            placeholder="Country/Region "
            options={countries}
          />
          <div className={ShippingCss.required}>{errors.country}</div>
          <div className={ShippingCss.cookies}>
            <input type="checkbox" />
            <div>Save this informations for a future fast checkout</div>
          </div>
          <ShippingFooter
            back="Cart"
            goTo="ShippingMethod"
            goToText="Go to shipping"
          />
        </form>
      </div>
      <ShippingCartInfo
        backGroundColor="white"
        shipping="Calculated at next Step"
      ></ShippingCartInfo>
    </div>
  );
};

export default ShippingDetails;
