import React, { useState, useContext, useEffect } from "react";
import styles from "../LandingPage/ProductPage/ProductPage.module.css";
import cartStyles from "./CartStyles.module.css"
import Context from "../UseContext/Context";

const CartItem = ({ product, fontSize = "", containerHeight ,imageSwap}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // ✅ Keep selectedSize in sync with the actual product size
  const [selectedSize, setSelectedSize] = useState(product.selectedSize.size);
  const { currentCurrency, setCartItems } = useContext(Context);

  // ✅ Update selectedSize whenever the product changes
  useEffect(() => {
    setSelectedSize(product.selectedSize.size);
  }, [product.selectedSize.size]);

  const handleSizeSelect = (newSize) => {
    setCartItems((prev) => {
      // Find the current item being changed
      const currentItem = prev.find(
        (item) => item.id === product.id && item.selectedSize.size === selectedSize
      );
      
      if (!currentItem) return prev; // Safety check
      
      // Find if there's already an item with the new size
      const existingItemWithNewSize = prev.find(
        (item) => item.id === product.id && item.selectedSize.size === newSize
      );
      
      // Get stock limit for the new size
      const newSizeStock = product.sizes.find((s) => s.size === newSize)?.stock || 0;
      
      // Create the updated cart
      const updatedCart = prev.reduce((acc, item) => {
        // Skip the current item being changed
        if (item.id === product.id && item.selectedSize.size === selectedSize) {
          return acc;
        }
        
        // If this is an existing item with the new size, merge quantities
        if (item.id === product.id && item.selectedSize.size === newSize) {
          const mergedQuantity = Math.min(
            item.selectedSize.quantity + currentItem.selectedSize.quantity,
            newSizeStock
          );
          
          acc.push({
            ...item,
            selectedSize: {
              ...item.selectedSize,
              quantity: mergedQuantity,
            },
          });
          return acc;
        }
        
        // Keep all other items unchanged
        acc.push(item);
        return acc;
      }, []);
      
      // If there wasn't an existing item with the new size, add the changed item
      if (!existingItemWithNewSize) {
        const newQuantity = Math.min(currentItem.selectedSize.quantity, newSizeStock);
        
        updatedCart.push({
          ...currentItem,
          selectedSize: {
            ...currentItem.selectedSize,
            size: newSize,
            quantity: newQuantity,
          },
        });
      }
      
      return updatedCart;
    });

    // ✅ Update local state immediately
    setSelectedSize(newSize);
  };

  function localAdditionToCard(change) {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === product.id && item.selectedSize.size === selectedSize) {
          const stock = item.sizes.find((s) => s.size === selectedSize)?.stock || 0;
          const currentQty = item.selectedSize.quantity;

          if (change === "increase") {
            if (currentQty < stock) {
              return {
                ...item,
                selectedSize: {
                  ...item.selectedSize,
                  quantity: currentQty + 1,
                },
              };
            }
          } else if (change === "decrease") {
            if (currentQty > 1) {
              return {
                ...item,
                selectedSize: {
                  ...item.selectedSize,
                  quantity: currentQty - 1,
                },
              };
            }
            return null;
          }
        }
        return item;
      }).filter(Boolean)
    );
  }

  const handleImageSwap = (direction) => {
    if (direction === "right") {
      currentImageIndex < product.ArraysOfImg.length - 1 
        ? setCurrentImageIndex(currentImageIndex + 1) 
        : setCurrentImageIndex(0);
    } else {
      currentImageIndex > 0 
        ? setCurrentImageIndex(currentImageIndex - 1) 
        : setCurrentImageIndex(product.ArraysOfImg.length - 1);
    }
  }

  const chosenSizeQuantity = product.selectedSize.quantity || 0;

  return (
    <div className={cartStyles.itemContainer} style={{height:containerHeight}}>
      <div className={styles.upperInfo} style={fontSize ? { fontSize: fontSize } : {}}>
        <div>
          <p className={styles.productName} style={fontSize ? { fontSize: fontSize } : {}}>{product.name}</p>
          <p className={styles.productType} style={fontSize ? { fontSize: fontSize } : {}}>{product.type}</p>
        </div>
        <div className={styles.priceContainer}>
          <span style={fontSize ? { fontSize: fontSize } : {}}>PRICE:</span>
          <p className={styles.price} style={fontSize ? { fontSize: fontSize } : {}}>
            {currentCurrency + product.price + ".00"}
          </p>
        </div>
        <div className={styles.sizeContainer}>
          <div className="">
            <div className="">
              <span className={styles.sizeLabel} style={fontSize ? { fontSize: fontSize } : {}}>SIZE:</span>
            </div>
            <div className={styles.sizeOptions}>
              {product.sizes.map((sizes) => (
                <button 
                  style={fontSize ? { fontSize: fontSize } : {}}
                  key={sizes.size}
                  onClick={() => handleSizeSelect(sizes.size)}
                  className={styles.sizeOption}
                  data-selected={selectedSize === sizes.size}
                >
                  {sizes.size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={cartStyles.right} >
        <div className={cartStyles.cartManipulation}>
          <button onClick={() => localAdditionToCard('increase')}>+</button>
          <p>{chosenSizeQuantity}</p>
          <button onClick={() => localAdditionToCard('decrease')}>-</button>
        </div>
        <div className={cartStyles.imageInCart} >
          <img src={product.ArraysOfImg[currentImageIndex]} alt="" />
          
          {/* Navigation Arrows - only show if imageSwap is true and there are multiple images */}
          {imageSwap && product.ArraysOfImg.length > 1 && (
            <>
              {/* Left Arrow */}
              <button 
                className={cartStyles.navArrow + ' ' + cartStyles.leftArrow}
                onClick={() => handleImageSwap('left')}
                aria-label="Previous image"
              >
                &#8249; {/* Left chevron symbol */}
              </button>
              
              {/* Right Arrow */}
              <button 
                className={cartStyles.navArrow + ' ' + cartStyles.rightArrow}
                onClick={() => handleImageSwap('right')}
                aria-label="Next image"
              >
                &#8250; {/* Right chevron symbol */}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;