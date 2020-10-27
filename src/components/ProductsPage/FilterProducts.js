import React from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../../context';

export default function FilterProducts() {
  return (
     <ProductConsumer>
     {value => {

    const {search,price,max,min,company,shipping,handleChange,storeProducts} = value;

    let companies = new Set();
    companies.add("all");
    for(let product in storeProducts) {

      companies.add(storeProducts[product]["company"]);

      }

      companies = [...companies];

    return(

        <div className="row my-5">
        <div className="col-10 mx-auto">
        <FilterWrapper>
        {/* search products */}
        <div>
        <label htmlFor="search">search products</label>
        <input 
        type="text"
         name="search"
          id="search" 
          onChange={handleChange} 
          className="filter-item"
          value={search}/>
          </div>
          {/* end of search products */}

          {/* company */}
          <div>
          <label htmlFor="company">company</label>
          <select 
          name="company" 
          id="company" 
          value={company} 
          className="filter-item"
          onChange={handleChange}>
         {companies.map((company,index) => {
           return <option key={index} value={company}>{company}</option>
         })}
          </select>
          </div>
          {/* end of company */}

          {/* price */}
          <div>
          <label htmlFor="price">
          <p className="mb-2">product price : <span>$ {price}</span></p>
          </label>
          <input
          type="range"
          name="price"
          max={max}
          min={min}
          id="price"
          value={price}
          className="filter-price"
          onChange={handleChange}/>
          </div>
          {/* end of price */}

          {/* free shipping */}
          <div>
          <label className="mx-2" htmlFor="shipping">free shipping</label>
          <input
          type="checkbox"
          name="shipping"
          id="shipping"
          checked={shipping && true}
          onChange={handleChange}/>
          </div>
          {/* end of free shipping */}
        </FilterWrapper>
        </div>
        </div>
    )
     }}
     </ProductConsumer>
  )
}

const FilterWrapper = styled.div`

display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
grid-row-gap: 1rem;
grid-column-gap: 2rem;

label {
    font-weight: bold;
    text-transform: capitalize;
}

.filter-item, filter-price {
   display: block;
   width: 100%;
   background: transparent;
   border-radius: 0.5rem;
   border: 2px solid var(--mainBlack);
}

`
