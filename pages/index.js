import React from 'react'
import '../app/globals.css'
import {Product,HeroBanner,FooterBanner} from '../components'
import { client } from '@/lib/client'

const page = ({products, bannerData}) => {
  
  return (

    <>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
    <div className='products-heading'>
      <h2> Best selling products</h2>
      <p>Speakers of many vatiation</p>
      <a href='#'>Link to change</a>
    </div>
    <div className='product-container'>
      {
        products.map((prod,i)=>{
          return <Product products={prod} key={i}/>
        }
        )
      } 
    </div>
    <FooterBanner footerBanner={bannerData.length && bannerData[0]}/>

    </>
  )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);

    const bannerQuery= '*[_type =="banner"]'
    const bannerData = await client.fetch(bannerQuery)
    return{
        props: {products, bannerData}
    }
}

export default page;