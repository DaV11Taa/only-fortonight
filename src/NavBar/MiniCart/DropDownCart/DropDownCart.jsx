import React from 'react';
import styles from './DropDownCart.module.css';
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
    <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <h2>My Bag</h2>
        <span className={styles.itemCount}>{cartItems.reduce((count, item) => count + item.quantity, 0)} Items</span>
      </div>

      <div className={styles.cartItems}>
      {cartItems.map((item, index) => (
        <div key={index} className={styles.cartItem}>
          <div className={styles.itemInfo}>
            <h3 className={styles.itemName}>{item.name}</h3>
            <p className={styles.itemPrice}>{item.currency}{item.price.toFixed(2)}</p>
            
            <div className={styles.sizeSelector}>
              <p className={styles.sizeLabel}>Size:</p>
              <div className={styles.sizeOptions}>
                {item.sizes.map((size) => (
                  <button 
                    key={size}
                    className={`${styles.sizeOption} ${item.selectedSize === size ? styles.selected : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.quantityControls}>
            {/* i need to add function on this 2 button */}
            <button className={styles.quantityBtn}>+</button>
            <span className={styles.quantity}>{item.quantity}</span>
            <button className={styles.quantityBtn}>-</button>
          </div>
          
          <div className={styles.itemImage}>
            {/* Image would go here */}
          </div>
        </div>
      ))}
      </div>

      <div className={styles.cartTotal}>
        <p>Total</p>
        <p className={styles.totalAmount}>{cartItems[0].currency}{total.toFixed(2)}</p>
      </div>

      <div className={styles.cartActions}>
        <button className={styles.viewBagBtn} onClick={() => navigate("/CartPage")}>VIEW BAG</button>
        <button className={styles.checkoutBtn} onClick={() => navigate("/shipping/details")}>CHECK OUT</button>
        {/* <button className={styles.checkoutBtn} onClick={() => console.log(dundula)}>CHECK OUT</button> */}
      </div>
    </div>
  );
};

export default DropDownCart;