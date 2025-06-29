import React, { useState,useContext } from "react";
import styles from "../LandingPage/ProductPage/ProductPage.module.css";
import cartStyles from "./CartStyles.module.css"
import Context from "../UseContext/Context";
import Cartitems from "./Cartitems";
const CartItem = ({ product,fontSize="",imgHeight }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.selectedSize.size);
  const { additionToCard,currentCurrency ,setCartItems} = useContext(Context);

 const handleSizeSelect = (newSize) => {
  setCartItems((prev) => {
    const existingNewItem = prev.find(
      (item) => item.id === product.id && item.selectedSize.size === newSize
    );

    if (existingNewItem) {
      // Merge quantities into existingNewItem
      return prev
        .map((item) => {
          if (item.id === product.id && item.selectedSize.size === newSize) {
            return {
              ...item,
              selectedSize: {
                ...item.selectedSize,
                quantity: Math.min(
                  item.selectedSize.quantity + product.selectedSize.quantity,
                  item.sizes.find((s) => s.size === newSize).stock
                ),
              },
            };
          }
          // Remove the old size item (with selectedSize) after merging
          if (item.id === product.id && item.selectedSize.size === selectedSize) {
            return null; // This removes old size
          }
          return item;
        })
        .filter(Boolean); // removes nulls
    } else {
      // No existing new size, just update the size in the item
      return prev.map((item) => {
        if (item.id === product.id && item.selectedSize.size === selectedSize) {
          return {
            ...item,
            selectedSize: {
              ...item.selectedSize,
              size: newSize,
            },
          };
        }
        return item;
      });
    }
  });

  setSelectedSize(newSize);
  console.log(Cartitems);
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
    }).filter((item)=>!null)
  );
  console.log(Cartitems);
  
}

  const handleImageSwap=(direction)=>{
    if(direction=="right"){
        currentImageIndex<product.ArraysOfImg.length-1 ? setCurrentImageIndex(currentImageIndex+1):setCurrentImageIndex(0) 
    }else{
        currentImageIndex<product.ArraysOfImg.length>0 ? setCurrentImageIndex(currentImageIndex-1):setCurrentImageIndex(product.ArraysOfImg.lenght-1) 
    }

  }
  const chosenSizeQuantity=product.selectedSize.quantity || 0
  return (
    <div className={cartStyles.itemContainer} >
      <div className={styles.upperInfo} style={fontSize ? { fontSize: fontSize } : {}}>
        <div>
          <p className={styles.productName} style={fontSize ? { fontSize: fontSize } : {}} >{product.name}</p>
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
            {/* Size Label */}
            <div className="">
              <span className={styles.sizeLabel} style={fontSize ? { fontSize: fontSize } : {}}>SIZE:</span>
            </div>

            {/* Size Options */}
            <div className={styles.sizeOptions} >
              {product.sizes.map((sizes) => (
                <button style={fontSize ? { fontSize: fontSize } : {}}
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
      <div className={cartStyles.right}>
        <div className={cartStyles.cartManipulation}>
          <button onClick={() =>  localAdditionToCard('increase')}>+</button>
          <p>{chosenSizeQuantity}</p>
          <button onClick={() => localAdditionToCard('decrease')}>-</button>
        </div>
        <div className={cartStyles.imageInCart} style={imgHeight ? { height: imgHeight } : {}}> <img src={product.ArraysOfImg[currentImageIndex]} alt="" /></div>
      </div>
    </div>
  );
};

export default CartItem;
