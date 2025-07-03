import React, { useState, useContext, useEffect } from "react";
import styles from "../LandingPage/ProductPage/ProductPage.module.css";
import cartStyles from "./CartStyles.module.css"
import Context from "../UseContext/Context";

const CartItem = ({ product,index}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Keep selectedSize in sync with the actual product size
  const [selectedSize, setSelectedSize] = useState(product.selectedSize.size);
  const { currentCurrency, setCartItems } = useContext(Context);

  // updating  selectedSize when the product changes
  useEffect(() => {
    setSelectedSize(product.selectedSize.size);
  }, [product.selectedSize.size]);

  const handleSizeSelect = (newSize) => {
    setCartItems((prev) => {
      // Finding the current item being changed which is differentiated by id and selectedSize
      const currentItem = prev.find(
        (item) => item.id === product.id && item.selectedSize.size === selectedSize
      );
      
      if (!currentItem) return prev; 
      
      // Finding if there's already an item with the new size to be slected
      const existingItemWithNewSize = prev.find(
        (item) => item.id === product.id && item.selectedSize.size === newSize
      );
      
      //  stock limit for the new size
      const newSizeStock = product.sizes.find((s) => s.size === newSize)?.stock || 0;
      
      // Updating cart
      const updatedCart = prev.reduce((acc, item) => {
        // Skipping the current item being changed,as we don't need to keep it in the cart 
        if (item.id === product.id && item.selectedSize.size === selectedSize) {
          return acc;
        }
        
        // If this is an existing item with the new size, we are adding quantities
        if (item.id === product.id && item.selectedSize.size === newSize) {
          // using Math.min to ensure we don't exceed stock limits
          const mergedQuantity = Math.min(
            item.selectedSize.quantity + currentItem.selectedSize.quantity,
            newSizeStock
          );
          //adding the updated item with summed quantity to the cart
          acc.push({
            ...item,
            selectedSize: {
              ...item.selectedSize,
              quantity: mergedQuantity,
            },
          });
          return acc;
        }
        
        // Keeping all other items unchanged
        acc.push(item);
        return acc;
      }, []);
      
      // If there wasn't an existing item with the new size, we just add the item and change its size
      if (!existingItemWithNewSize) {
        
        updatedCart.push({
          ...currentItem,
          selectedSize: {
            ...currentItem.selectedSize,
            size: newSize,
            quantity:Math.min(currentItem.selectedSize.quantity, newSizeStock) // Ensuring we don't exceed stock limits,
          },
        });
      }
      return updatedCart;
    });

    // Updating local state immediately
    setSelectedSize(newSize);
  };
//this function adds or removes quantity of the item in the cart trigered by the buttons in the cart
  function localAdditionToCard(change) {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === product.id && item.selectedSize.size === selectedSize) {
          const stock = item.sizes.find((s) => s.size === selectedSize)?.stock || 0;
          const QntOfGivenItem = item.selectedSize.quantity;

          if (change === "increase") {
            if ( QntOfGivenItem < stock) {
              return {
                ...item,
                selectedSize: {
                  ...item.selectedSize,
                  quantity:  QntOfGivenItem + 1,
                },
              };
            }
          } else if (change === "decrease") {
            if ( QntOfGivenItem > 1) {
              return {
                ...item,
                selectedSize: {
                  ...item.selectedSize,
                  quantity:  QntOfGivenItem - 1,
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
//this function is used to swap images in the cart item
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
    <div className={cartStyles.itemContainer} >
      <div className={styles.upperInfo} >
        <div>
          <p className={styles.productName} >{product.name}</p>
          <p className={styles.productType} >{product.type}</p>
        </div>
        <div className={styles.priceContainer}>
          <span >PRICE:</span>
          <p className={styles.price} >
            {currentCurrency + product.price + ".00"}
          </p>
        </div>
        <div className={styles.sizeContainer}>
          <div >
            <div >
              <span className={styles.sizeLabel}>SIZE:</span>
            </div>
            <div className={styles.sizeOptions}>
              {product.sizes.map((sizes) => (
                <button 
                  key={index+product.id}
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
          <img src={product.ArraysOfImg[currentImageIndex]} alt=""  />
          
          {/* only show if  there are multiple images */}
          { product.ArraysOfImg.length > 1 && (
            <>
              {/* Left Arrow */}
              <button 
                className={cartStyles.navArrow + ' ' + cartStyles.leftArrow}
                onClick={() => handleImageSwap('left')}
                aria-label="Previous image"
              >
                &#8249; {/* Left chevron symbol */}
              </button>
              
              {/* Right Arrow  */}
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