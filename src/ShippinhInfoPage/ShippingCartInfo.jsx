
import { useContext } from "react";
import Context from "../UseContext/Context";
const ShippingCartInfo = ({ backGroundColor, shipping }) => {
  const { totalPrice,currentCurrency}=useContext(Context)
    const GrandTotal = Number(shipping)
    ? totalPrice + Number(shipping)
    : totalPrice;
  return (
    <div>
      <div>
        <div>
          <span>Subtotal</span>
          <span>{currentCurrency}{totalPrice}</span>
        </div>
        <div>
          <span>Shipping</span>
          <span>{shipping}</span>
        </div>
      </div>
      <div>
        <span>Total</span>
        <span>{currentCurrency}{GrandTotal}</span>
      </div>
    </div>
  );
};

export default ShippingCartInfo;
