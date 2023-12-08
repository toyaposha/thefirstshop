import React from "react";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineStar, AiFillStar } from "react-icons/ai";
import {client, urlFor} from '@/lib/client'
import { useStateContext } from "@/context/StateContext";
import Link from 'next/link';
import { Product } from "@/components";



const ProductDetails = ({product, products}) => {
const {image, name, price, details} = product;
  const {decQty, incQty, qty, onAdd} = useStateContext();
    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[0])} className="product-detail-image"/>
                    </div>
                    <div className="small-image-container">
                        {
                            image?.map((item,i) => (
                                 <img 
                                    src={urlFor(item)} 
                                    key={i}
                                    className="small-image"
                                      
                                 />
                            ))
                        }

                    </div>
                </div>
                 <div className="product-detail-desc">
                     <h1>{name}</h1>
                      <div className="reviews"> 
                          <div>
                          <AiFillStar/>
                           <AiFillStar/>
                           <AiFillStar/>
                           <AiFillStar/>
                           <AiOutlineStar/>
                          </div>
                          
                           <p>(20)</p>
                      </div>
                       <h4>details:</h4>
                        <p>{details}</p>
                        <p className="price">${price}</p>
                        <div className="quantity">
                               <h3>Quantity</h3>
                               <p className="quantity-desc">
                                <span className="minus" onClick={decQty}> <AiOutlineMinus/></span>
                                <span className="num" > {qty}</span>
                                <span className="plus" onClick={incQty}> <AiOutlinePlus/></span>
                               </p>
                        </div>
                         <div className="buttons"> 
                               <button type="button" className="add-to-cart"  onClick={() => onAdd(product,qty)}> Add to cart </button>
                               <button type="button" className="buy-now"> Buy Now</button>

                         </div>
                 </div>
            </div>
               <div className="maylike-products-wrapper">
                <h2>Recommendation</h2>
                  <div className="marquee">
                       <div className="maylike-products-container track">
                        {
                            products?.map((item) => (
                                <Product key={item._id} products={item}/>
                            ))
                        }
                       </div>
                  </div>
               </div>


        </div>
    )
}
 

export const getStaticPaths = async() => {
    const query =`*[_type == 'product'] {
        slug{
            current
        }
    }`;

    const products = await client.fetch(query);
    const paths= products.map((product)=>({
        params: {
            slug: product.slug.current
        }
    }));
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps= async ({params: {slug}}) =>{
    const query = `*[_type == 'product' && slug.current == '${slug}'][0]`;
    const productQuery = '*[_type == "product"]';

    const products = await client.fetch(productQuery);
    const product = await client.fetch(query);
    
    return{
        props: {product, products}
    }
}



export default ProductDetails