import React from 'react';
import Title from './Title';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import Products from '../components/Products';

export default function FeaturedProducts() {
  return (
   
    <section className="py-5">
    <div className="container">
    <Title title="featured products" center/>
    <div className="row mt-5">
    <ProductConsumer>
    {value => {

        const {featuredProducts} = value;

        return featuredProducts.map(product => (

                <Products key={product.id} product={product}/>
                
                ))

         
 
    }}

    </ProductConsumer>
    </div>

    <div className="row mt-5">
    <div className="col text-center">
    <Link to="/products" className="main-link">our products</Link>
    </div>
    </div>
    </div>
    </section>
  )
}
