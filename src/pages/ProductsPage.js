import React from 'react';
import Hero from '../components/Hero';
import productsBcg from '../images/productsBcg.jpeg';
import { ProductConsumer } from '../context';
import Title from '../components/Title';
import Product from '../components/Product';
import FilterProducts from '../components/ProductsPage/FilterProducts';

export default function ProductsPage() {
  return (
    <>
    <Hero img={productsBcg}/>
    <ProductConsumer>
    {value => {

      const {filteredProducts} = value;

      return(

        <section className="py-5">
        <div className="container">
      {/*title */}
        <Title center title="our products"/>
        {/* Filter products */}
        <FilterProducts/>
        {/* total products */}
        <div className="row">
        <div className="col-10 mx-auto">
        <h6 className="text-title">total products : {filteredProducts.length}</h6>
        </div>
        </div>
        {/* All Products Displayed */}
        <div className="row py-5">
         
        {filteredProducts.length === 0 ? (

          <div className="col text-title text-center">sorry, no items matched your search</div>

        ) : (

        filteredProducts.map(product => {
          return <Product key={product.id} product={product}/>
        })
        )}
        </div>
        </div>
        </section>
      )
    }}
    
      </ProductConsumer>
    </>
  )
}

