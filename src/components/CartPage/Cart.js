import React from 'react';
import CartColumns from './CartColumns';
import CartList from './CartList';
import CartTotals from './CartTotals';
import Title from '../Title';

export default function Cart({history}) {
  return (
    <section className="py-5">
    <div className="container">
    <Title title="your cart" center/>
    
    </div>
      <CartColumns/>
      <CartList/>
      <CartTotals history={history}/>
    </section>
  )
}
