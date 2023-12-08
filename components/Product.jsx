import React, { useState } from 'react';
import { urlFor } from '../lib/client';
import Link from 'next/link';

const Product = ({products}) => {
  
  return (
    <>
    <div>
      <Link href={`product/${products.slug.current}`}>
        <div className='product-card'>
        <img  src={urlFor(products.image && products.image[0])} className='product-image' width={250} height={250}/>  
        <p className='product-name' >{products.name} </p>
        <p className='product-price'> $ {products.price}</p>
        </div>
      </Link>
    </div>
    
    
  
    </>
  )
}

export default Product