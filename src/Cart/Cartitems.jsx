import React from 'react'
import CartItem from './CartItem'
import { useContext } from 'react'
import cartStyles from "./CartStyles.module.css"
import Context from '../UseContext/Context'
const Cartitems = () => {
  const {cartItems}=useContext(Context)
  return (
    <div className={cartStyles.cartItemsBox}>
      {
        cartItems.map((item,index)=> <CartItem product={item} 
        index={index}/>)
      }
    </div>
  )
}

export default Cartitems