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

  const handleSizeSelect = (newSize) => {setCartItems((prev) =>
    prev.map((item) => {
      if (item.id === product.id && item.selectedSize.size === selectedSize) {
        return {
          ...item,
          selectedSize: {
            ...item.selectedSize,
            size: newSize, // update the size
          },
        };
      }
      return item;
    })
  );

  setSelectedSize(newSize);
};

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
                  key={sizes}
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
          <button onClick={() =>  additionToCard(selectedSize,product,'increase')}>+</button>
          <p>{chosenSizeQuantity}</p>
          <button onClick={() => additionToCard(selectedSize,product,'decrease')}>-</button>
        </div>
        <div className={cartStyles.imageInCart} style={imgHeight ? { height: imgHeight } : {}}> <img src={product.ArraysOfImg[currentImageIndex]} alt="" /></div>
      </div>
    </div>
  );
};

export default CartItem;
