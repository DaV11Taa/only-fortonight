import { useState } from "react";
import "./lala.module.css";
import { products } from "../Data/MostProtectedData.js";
import Context from "../UseContext/Context.js";
import { Route, Routes, Navigate } from "react-router-dom";

import NavBar from "../NavBar/NavBar.jsx";
import LandingPage from "../LandingPage/LandingPage.jsx";
import ProductPage from "../LandingPage/ProductPage/ProductPage.jsx";
import ShippingDetails from "../ShippinhInfoPage/ShippingDetails.jsx";
import ShipingPayment from "../ShippinhInfoPage/ConfirmationPage/ShipingPayment.jsx";
import { useMemo } from "react";
import CartPage from "../Cart/CartPage.jsx";
import Shipment from "../ShippinhInfoPage/Shipment.jsx";
import PaymentMethod from "../ShippinhInfoPage/PaymentMethod.jsx";
import Payment from "../ShippinhInfoPage/Payment.jsx";
import ConfirmationPaje from "../ShippinhInfoPage/ConfirmationPage/ConfirmationPaje.jsx";

// daikide,gamoaswora importi ukve

function App() {
  const [productsData, setProductsData] = useState(products);
  const [orderInfo, setOrderInfo] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const additionToCard = (selectedSize, product) => {
    const selectedStock = product.sizes.find((s) => s.size === selectedSize);
    if (!selectedStock || selectedStock.stock <= 0) {
      return;
    }
    const existingProduct = cartItems.find(
      (item) =>
        item.id === product.id && item.selectedSize.size === selectedSize
    );

    // Exit early if quantity is already at stock limit
    if (
      existingProduct &&
      existingProduct.selectedSize.quantity === selectedStock.stock
    ) {
      return; // Function exits here
    }

    setCartItems((prev) => {
      if (existingProduct) {
        return prev.map((item) => {
          if (
            item.id === product.id &&
            item.selectedSize.size === selectedSize
          ) {
            return {
              ...item,
              selectedSize: {
                ...item.selectedSize,
                quantity: item.selectedSize.quantity + 1,
              },
            };
          }
          return item;
        });
      }

      // Add new product if it didn't exist
      return [
        ...prev,
        {
          ...product,
          selectedSize: {
            size: selectedSize,
            quantity: 1,
          },
        },
      ];
    });
  };

  const symbols = {
    USD: "$", // USD Currency
    EUR: "€", // EUR Currency
    JPY: "¥", // JPY Currency
  };
  const { totalPrice, totalQuantity, currentCurrency } = useMemo(() => {
    let totalPrice = 0;
    let totalQuantity = 0;

    for (const item of cartItems) {
      {
        totalQuantity += item?.selectedSize.quantity || 0;
        totalPrice += item?.selectedSize.quantity * item.price;
      }
    }

    return {
      totalPrice,
      totalQuantity,
      currentCurrency: symbols[productsData[0]?.currency],
    };
  }, [cartItems]);
  // hope it merged well
  return (
    <div>
      <Context.Provider
        value={{
          data: productsData,
          setData: setProductsData,
          orderInfo: orderInfo,
          setOrderInfo: setOrderInfo,
          cartItems: cartItems,
          setCartItems: setCartItems,
          additionToCard: additionToCard,
          totalPrice: totalPrice,
          totalQuantity: totalQuantity,
          currentCurrency: currentCurrency,
        }}
      >
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Navigate to="/women" replace />} />
          <Route
            path="/women"
            element={
              <>
                <NavBar /> <LandingPage sort="WOMEN" />
              </>
            }
          />
          <Route
            path="/men"
            element={
              <>
                <NavBar /> <LandingPage sort="MEN" />{" "}
              </>
            }
          />
          <Route
            path="/kids"
            element={
              <>
                <NavBar /> <LandingPage sort="KIDS" />{" "}
              </>
            }
          />
          <Route path="/women/:id" element={<ProductPage />} />
          <Route path="/men/:id" element={<ProductPage />} />
          <Route path="/kids/:id" element={<ProductPage />} />
          <Route path="/details" element={<ShippingDetails />} />
          <Route path="/shiping/payment" element={<ShipingPayment />} />
          <Route
            path="/Cart"
            element={
              <>
                <NavBar /> <CartPage />{" "}
              </>
            }
          ></Route>
          <Route path="/shipping" element={<Shipment />}></Route>
          <Route path="/paymentMethod" element={<PaymentMethod />}></Route>
          <Route
            path="/confirmationPage"
            element={<ConfirmationPaje></ConfirmationPaje>}
          ></Route>
          {/* here goes my nerves */}
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
