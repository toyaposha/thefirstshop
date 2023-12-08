import React, { Children } from "react";
import { useState, useContext, createContext } from "react";

const Context= createContext();

export const StateContext = ({children}) =>{

     const [qty, setQty] = useState(1)
     const [cartItems,setCartItems]= useState([])
     const [totalPrice, setTotalPrice]=useState(0)
     const [totalQuantities, setTotalQuantities]=useState(0)
     const [showCart,setShowCart]= useState(false)
     const array= []

    const incQty = () => {
        setQty((prevQty) => prevQty +1
        )
    }
     const decQty = () => {
        setQty((prevQty) => {
            if(prevQty -1 < 1) return 1
             return  prevQty -1
        })
     }

     const onAdd = (product, quantity) =>{
        const checkProductInCart=cartItems.find((item) => item._id ===product._id)

        setTotalPrice((prevTotalPrice)=> prevTotalPrice+product.price * quantity )
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)
        if(checkProductInCart) {
            const updateCartItems= cartItems.map((cartProduct)=>{
                if( cartProduct._id ===product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity  
                } 
            });
            setCartItems(updateCartItems)
       
     }else {
       
         product.quantity=quantity
         setCartItems([...cartItems, product])
     }
    }
    const toggleCartItemQuantity= (id, value) =>{
         
    }

     return (
        <Context.Provider
        value={
            {
                qty,
                incQty,
                decQty,
                setShowCart,
                showCart,
                onAdd, 
                cartItems,
                totalQuantities,
                setCartItems,
                setTotalQuantities
            }
        }
        
                  >
            {children}
            </Context.Provider>
    )
}




export const useStateContext = () => useContext(Context)