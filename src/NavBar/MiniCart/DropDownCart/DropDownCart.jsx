import React from 'react';  
import styles from './DropDownCart.module.css';
import { useNavigate } from "react-router-dom";

const DropDownCart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  console.log(`cartItems`, cartItems);
  // Change size for a specific item
  const handleSizeSelect = (index, newSize) => {
    setCartItems(prev =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              selectedSize: {
                ...item.selectedSize,
                size: newSize
              }
            }
          : item
      )
    );
  };

  // Increase quantity
  const increaseQuantity = (index) => {
    setCartItems(prev =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              selectedSize: {
                ...item.selectedSize,
                quantity: item.selectedSize.quantity + 1
              }
            }
          : item
      )
    );
  };

  // Decrease quantity (min 1)
  const decreaseQuantity = (index) => {
    setCartItems(prev =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              selectedSize: {
                ...item.selectedSize,
                quantity: Math.max(1, item.selectedSize.quantity - 1)
              }
            }
          : item
      )
    );
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.selectedSize.quantity), 0);

  // Currency symbol resolver
  const getCurrencySymbol = (currency) => {
    return currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "JPY" ? "¥" : "";
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <h2>My Bag</h2>
        <span className={styles.itemCount}>
          {cartItems.reduce((count, item) => count + item.selectedSize.quantity, 0)} Items
        </span>
      </div>

      <div className={styles.cartItems}>
        {cartItems.map((item, index) => (
          <div key={index} className={styles.cartItem}>
            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemPrice}>
                {getCurrencySymbol(item.currency)}{item.price.toFixed(2)}
              </p>

              <div className={styles.sizeSelector}>
                <p className={styles.sizeLabel}>Size:</p>
                <div className={styles.sizeOptions}>
                  {item.sizes.map(({ size }) => (
                    <button
                      key={size}
                      className={`${styles.sizeOption} ${item.selectedSize.size === size ? styles.selected : ''}`}
                      onClick={() => handleSizeSelect(index, size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.quantityControls}>
              <button className={styles.quantityBtn} onClick={() => increaseQuantity(index)}>+</button>
              <span className={styles.quantity}>{item.selectedSize.quantity}</span>
              <button className={styles.quantityBtn} onClick={() => decreaseQuantity(index)}>-</button>
            </div>

            <div className={styles.itemImage}>
              <img src={item.imgMain} alt={item.name} className={styles.productCard_img}/>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cartTotal}>
        <p>Total</p>
        <p className={styles.totalAmount}>
          {getCurrencySymbol(cartItems[0]?.currency)}{total.toFixed(2)}
        </p>
      </div>

      <div className={styles.cartActions}>
        <button className={styles.viewBagBtn} onClick={() => navigate("/Cart")}>VIEW BAG</button>
        <button className={styles.checkoutBtn} onClick={() => if(cartItems.length===0) {navigate("/shipping/details")}else alert("Your cart is empty")}>CHECK OUT</button>
      </div>
    </div>
  );
};

export default DropDownCart;