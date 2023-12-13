import React, { useRef } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { useStateContext } from '@/context/StateContext';
import { urlFor } from '@/lib/client';
import getStripe from '@/lib/getStripe';

const Cart = () => {
  const { showCart, setShowCart, cartItems, toggleCartItemQuantity, onRemove, totalPrice, totalQuantities } = useStateContext();
  const cartRef = useRef();


  const handleCheckout = async () => {
    try {
      const stripe = await getStripe();

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({cartItems}),
      });

      if(!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        
        return;
      }
      
      const data = await response.json();
      console.log(data)

      toast.loading('Redirecting...');

      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error('Error during checkout: ', error)
    }
  }
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button onClick={() => setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>Your cart</span>
          <span className='cart-num-items'>({totalQuantities})</span>
        </button>

        {
          cartItems.length < 1 && (
            <div className='empty-cart'>
              <AiOutlineShopping size={100} />
              <h3>The cart is empty</h3>
              <Link href='/'>
                <button className='btn'
                  onClick={() => setShowCart(false)}
                >
                  Continue shopping
                </button>
              </Link>
            </div>
          )
        }

        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className='product' key={item?._id}>
              <img src={urlFor(item?.image[0])} className='cart-product-image'/>
              <div className='item-desc'>
                <div className='flex top'>
                  <h4>{item?.name}</h4>
                  <h5>${item?.price}</h5>
                </div>
                <div className='flex bottom'>
                  <div>
                      <p className='quantity-desc'>
                          <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus/></span>
                          <span className='num'>{item?.quantity}</span>
                          <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus/></span>
                      </p>
                    </div>
                    <button className='remove-item' onClick={() => onRemove(item)}>
                      <TiDeleteOutline/>
                    </button>
                </div>
 
              </div>
            </div>
          ))}
        </div>
        { cartItems.length >= 1 && (
            <div className='cart-bottom'>
              <div className='total'>
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className='btn-container'>
                <button type="button" className='btn' onClick={handleCheckout}>Pay with Stripe</button>
              </div>
            </div>
          )
      }
      </div>
    </div>
  )
}

export default Cart