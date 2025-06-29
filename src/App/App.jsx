import { useState } from "react";
import "./lala.module.css";
import { products } from "../Data/MostProtectedData.js";
import Context from "../UseContext/Context.js";
import { Route, Routes, Navigate } from "react-router-dom";

import NavBar from "../NavBar/NavBar.jsx";
import LandingPage from "../LandingPage/LandingPage.jsx";
import ProductPage from "../LandingPage/ProductPage/ProductPage.jsx";
import ShippingDetails from "../ShippinhInfoPage/ShippingDetails.jsx";
import ShipingPayment from "../ShippinhInfoPage/ShipingPayment.jsx";
import { useMemo } from "react";
import CartPage from "../Cart/CartPage.jsx";
function App() {
  const [productsData, setProductsData] = useState(products);
  const [orderInfo, setOrderInfo] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const additionToCard = (selectedSize, product, change) => {
    console.log(cartItems);
    const selectedStock = product.sizes.find((s) => s.size === selectedSize);
    const maxStock = selectedStock.stock;
    setCartItems((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        const currentQty = existingProduct.sizeQuantities[selectedSize] || 0;
        return prev.map((item) => {
          if (item.id !== product.id) return item;
          let updatedQty = currentQty;
          if (change === "increase") {
            if (currentQty >= maxStock) {
              alert("Stock limit reached for this size");
              return item;
            }
            updatedQty = currentQty + 1;
          } else if (change === "decrease") {
            updatedQty = Math.max(currentQty - 1, 0);
          } else {
            return item; // ignore unknown change types
          }
          return {
            ...item,
            sizeQuantities: {
              ...item.sizeQuantities,
              [selectedSize]: updatedQty,
            },
          };
        });
      }
      // Product not in cart yet → add only if increasing
      if (change === "increase") {
        return [
          ...prev,
          {
            ...product,
            sizeQuantities: {
              [selectedSize]: 1,
            },
          },
        ];
      }
      // Don't add anything if trying to decrease a non-existing product
      return prev;
    });
    
  };
  	const symbols = {
		USD: "$", // USD Currency
		EUR: "€", // EUR Currency
		JPY: "¥", // JPY Currency
	};
  const { totalPrice, totalQuantity,currentCurrency } = useMemo(() => {
    let totalPrice = 0;
    let totalQuantity = 0;

    for (const item of cartItems) {
      for (const size in item.sizeQuantities) {
        const qty = item.sizeQuantities[size];
        totalQuantity += qty;
        totalPrice += qty * item.price;
      }
    }

    return { totalPrice, totalQuantity,currentCurrency:symbols[cartItems[0]?.currency]};
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
          additionToCard: additionToCard,
          totalPrice: totalPrice,
          totalQuantity: totalQuantity,
          currentCurrency:currentCurrency,
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
					<Route path="/shipping/details" element={<ShippingDetails />} />
					<Route path="/shiping/payment" element={<ShipingPayment />}/>
          <Route path="/CartPage" element={ <>
                <NavBar /> <CartPage />{" "}
              </>}></Route>
				</Routes>
			</Context.Provider>
		</div>
	);
}

export default App;
