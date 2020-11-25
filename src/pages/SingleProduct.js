import React from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import singleProductBcg from '../images/singleProductBcg.jpeg';

export default function SingleProduct() {
  return (
    <>
      <Hero img={singleProductBcg} title="single product"/>
      <ProductConsumer>
      {value => {

        const {singleProduct,addToCart,loading} = value;

        if(loading) {
          return <h1>product loading...</h1>
        }
          
        const {id,title,price,company,description,image} = singleProduct;
        return(

          <section className="py-5">
          <div className="container">
          <div className="row">
          <div className="col-10 mx-auto col-sm-8 col-md-6 my-3">
          <img 
         // src={`../${image}`} 
          src={image}
          className="img-fluid"
          />
          </div>

          <div className="col-10 mx-auto col-sm-8 col-md-6 my-3">
          <h5 className="text-title mb-4">model : {title}</h5>
          <h5 className="text-capitalize text-muted mb-4">company : {company}</h5>
          <h5 className="text-capitalize text-main mb-4">price : ${price}</h5>
          <p className="text-title">some info about product : </p>
          <p className="text-lead mb-4">{description}</p>
          <button type="button" style={{margin: '0.75rem'}} className="main-link" onClick={() => addToCart(id)}>add to cart</button>
          <Link to="/products" style={{margin: '0.75rem'}} className="main-link">all products</Link>
          </div>
          </div>
          </div>
          </section>
        )
      }}
      </ProductConsumer>
    </>
  )
}
