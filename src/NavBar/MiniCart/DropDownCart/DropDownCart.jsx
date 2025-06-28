import React from 'react';
import './DropDownCart.css';
import { useNavigate } from "react-router-dom";

const DropDownCart = () => {
  const navigate = useNavigate();
  const cartItems = [
    {
      name: "Apollo Running Short",
      price: 50.00,
      currency: "$",
      sizes: ["XS", "M", "L"],
      selectedSize: "M",
      quantity: 1
    },
    {
      name: "Jupiter Wayfarer",
      price: 75.00,
      currency: "$",
      sizes: ["S", "M"],
      selectedSize: "S",
      quantity: 2
    }
  ];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>My Bag</h2>
        <span className="item-count">{cartItems.reduce((count, item) => count + item.quantity, 0)} Items</span>
      </div>

      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <div className="item-info">
            <h3 className="item-name">{item.name}</h3>
            <p className="item-price">{item.currency}{item.price.toFixed(2)}</p>
            
            <div className="size-selector">
              <p className="size-label">Size:</p>
              <div className="size-options">
                {item.sizes.map((size) => (
                  <button 
                    key={size}
                    className={`size-option ${item.selectedSize === size ? 'selected' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="quantity-controls">
            <button className="quantity-btn">+</button>
            <span className="quantity">{item.quantity}</span>
            <button className="quantity-btn">-</button>
          </div>
          
          <div className="item-image">
            {/* Image would go here */}
          </div>
        </div>
      ))}

      <div className="cart-total">
        <p>Total</p>
        <p className="total-amount">{cartItems[0].currency}{total.toFixed(2)}</p>
      </div>

      <div className="cart-actions">
        <button className="view-bag-btn">VIEW BAG</button>
        <button className="checkout-btn" onClick={() => navigate("/CartPage")}>CHECK OUT</button>
      </div>
    </div>
  );
};

export default DropDownCart;