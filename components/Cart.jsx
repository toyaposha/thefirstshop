import React from 'react'
import { AiOutlineMinus,AiOutlinePlus, AiOutlineLeft, AiOutineShopping} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import { useStateContext } from '@/context/StateContext'
import { urlFor } from '@/lib/client'

const Cart = () => {
  const {showCart, setShowCart, cartItems}= useStateContext();
  return (
    <div className='cart-wrapper'>Cart
    <div className='cart-container'>
      <button onClick={()=> setShowCart(false)}>
        <AiOutlineLeft/>
        <span className='heading'> Your cart</span>
        <span className='cart-num-items'> 3</span>
      </button>
      <div className='product-container'> 
      {
        cartItems.length >= 1 && cartItems.map((item) => (
          <div className='product' key={item?._id}>
            <img src={urlFor(item?.image[0])} className='cart-product-image'/>
            <div className='item-desc'>
                <div className='flex top'>
                <h4>{item?.name}</h4>
                <h5>${item?.price}</h5>
                </div>
                <div className='flex bottom'>
                      <p className="quantity-desc">
                                <span className="minus" onClick=''> <AiOutlineMinus/></span>
                                <span className="num" >{item?.quantity}</span>
                                <span className="plus" onClick= ''> <AiOutlinePlus/></span>
                               </p>
                               <button className='remove-item'>
                       <TiDeleteOutline/>
                          </button>
                </div>
                
            </div>
          </div>
        ))
      }
      </div>
    </div>
    </div>
  )
}

export default Cart