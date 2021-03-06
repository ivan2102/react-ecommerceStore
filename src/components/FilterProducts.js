import React from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context';

export default function FilterProducts() {
  return (
    <ProductConsumer>
    {value => {

      const {search,price,min,max,company,shipping,handleChange,storeProducts} = value;

      let companies = new Set();
      companies.add('all');
       for(let product in storeProducts) {
         companies.add(storeProducts[product]["company"]);
       }

       companies = [...companies];

      return(
       <div className="row my-5">
       <div className="col-10 mx-auto">
        <FilterWrapper>
        {/*search */}
        <div className="form-group">
        <label htmlFor="search">search products</label>
        <input 
        type="text" 
        name="search" 
        id="search"
        value={search}
        className="filter-item"
        onChange={handleChange}
        />
        </div>
        {/*end of search */}

        {/*company */}
        <div className="form-group">
        <label htmlFor="company">company</label>
        <select 
        name="company" 
        id="company"
        value={company}
        className="filter-item"
        onChange={handleChange}
        >
          {companies.map((company,index) => {

            return <option key={index} value={company}>{company}</option>
          })} 
        </select>
        </div>
        {/*end of company */}

        {/*price */}
        <div className="form-group">
        <label htmlFor="price">
        <p className="mb-2">product price : <span>$ {price}</span></p>
        </label>
        <input
         type="range" 
         name="price" 
         id="price"
         min={min}
         max={max}
         value={price}
         className="filter-price"
         onChange={handleChange}
         />
        </div>
        {/*end of price */}

        {/*shipping */}
        <div className="form-group">
        <label htmlFor="shipping" className="mx-2">free shipping</label>
        <input 
        type="checkbox"
         name="shipping"
          id="shipping"
          checked={shipping && true}
          onChange={handleChange}/>
        </div>
        {/*end of shipping */}
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
grid-column-gap: 2rem;
grid-row-gap: 1rem;

label {
  font-weight: bold;
  text-transform: capitalize;
}

.filter-item, .filter-price {
  display: block;
  width: 100%;
  background: transparent;
  border-radius: 0.5rem;
  border: 2px solid var(--darkGrey);
}



`
