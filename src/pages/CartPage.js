import React from 'react';
import Cart from '../components/CartPage/Cart';
import Hero from '../components/Hero';
import cartBcg from '../images/cartBcg.jpeg';


export default function CartPage(props) {
  return (
    <>
     <Hero img={cartBcg}/>

    <Cart history={props.history}/>
      
    </>
  )
}
