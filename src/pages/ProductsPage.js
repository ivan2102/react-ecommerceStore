import React from 'react';
import { ProductConsumer } from '../context';
import Hero from '../components/Hero';
import productsBcg from '../images/productsBcg.jpeg';
import Title from '../components/Title';
import Products from '../components/Products';
import FilterProducts from '../components/FilterProducts';

export default function ProductsPage() {
  return (
    <>
    
      <Hero img={productsBcg}/>
      <ProductConsumer>
      {value => {

        const {filteredProducts} = value;

        
        return(
      <section className="py-5">
      <Title title="our products" center/>

      <FilterProducts/>
      {/*products */}
      {/*total count*/}
      <div className="row">
      <div className="col-10 mx-auto">
      <h6 className="text-title">total products : { filteredProducts.length }</h6>
      </div>
      </div>
      <div className="container">
      <div className="row mt-5">

      
           
       {filteredProducts.length === 0  ? (

        <div className="col text-title text-center">
        sorry, no items matched your search
        </div>
       ) :

       (
         
        filteredProducts.map(product => {
       
        return <Products key={product.id} product={product}/>

       }))}
      
      

      
      </div>
      </div>
      </section>

      
        )    

        
}}
 
</ProductConsumer>
</> 
)
}