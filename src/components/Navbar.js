import React from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context';
import { FaBars,FaCartPlus } from 'react-icons/fa';
import logo from '../images/logo.png';

export default function Navbar() {
  return (
    <ProductConsumer>
    {value => {

      const {cartItems,handleSidebar,handleCart} = value;

      return(

        <NavbarWrapper>
        <div className="nav-center">
        <FaBars className="nav-icon" onClick={handleSidebar}/>
        <img src={logo} className="logo" alt="logo"/>
        <div className="nav-cart">
        <FaCartPlus className="nav-icon" onClick={handleCart}/>

        <div className="cart-items">{cartItems}</div>
        </div>
        
        </div>
        </NavbarWrapper>
      )
    }}
    </ProductConsumer>
  )
}

const NavbarWrapper = styled.nav`
position: -webkit-sticky;
position: sticky;
top: 0;
z-index: 1000;
width: 100%;
padding: 1rem 1.5rem;
background: var(--mainGrey);
border-bottom: 3px solid var(--primaryColor);

.nav-center {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1170px;

}

.nav-icon {
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-cart {
  position: relative;
}

.cart-items {
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 0.85rem;
  background: var(--primaryColor);
  color: var(--mainWhite);
  padding: 0 5px;
  border-radius: 50%;
}



`
