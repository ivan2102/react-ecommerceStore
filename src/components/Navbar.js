import React from 'react';
import { FaBars, FaCartPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { ProductConsumer } from '../context';
import logo from '../images/logo.png';

export default function Navbar() {
  return (
   <ProductConsumer>
   {value => {

      const{handleSidebar,handleCart,cartItems} = value;

      return(

        <NavWrapper>
        <div className="nav-center">
        <FaBars className="nav-icon" onClick={handleSidebar}/>
        <img src={logo} className="logo" alt="logo"/>
        <div className="nav-cart">
        <FaCartPlus className="nav-icon" onClick={handleCart}/>
        <div className="cartItems">{cartItems}</div>
        </div>
        </div>
        </NavWrapper>
      )
   }}
   </ProductConsumer>
  )
}

const NavWrapper = styled.nav`
position: -webkit-sticky;
position: sticky;
top: 0;
z-index: 1;
width: 100%;
padding: 1rem 1.5rem;
background: var(--mainGrey);
border-bottom: 3px solid var(--primaryColor);
.nav-center {
 display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1170px;
  margin: 0 auto;
}

.nav-icon {
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-cart {
position: relative;
}

.cartItems {
  background: var(--primaryColor);
  color: var(--mainWhite);
  font-size: 0.8rem;
  position: absolute;
  top: -8px;
  right: -8px;
  padding: 0 8px;
  border-radius: 50%;

}

.logo {
  width: 5%;
}


`
