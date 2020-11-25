import React from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context';


export default function Footer() {
  return (

    <ProductConsumer>
    {value => {

   return(
    
        <FooterWrapper>
        <div className="container py-3">
        <div className="row">
        <div className="col-lg-3">
        <h6 className="text-uppercase">pages</h6>
        <ul className="text-capitalize">
        <li>History</li>
        <li>Brand values</li>
        <li>Movements</li>
        </ul>
        </div>

        <div className="col-lg-3">
        <h6 className="text-uppercase">collections</h6>
        <ul className="text-capitalize">
        <li>quartz</li>
        <li>tissot</li>
        <li>tudor</li>
        <li>omega</li>
        <li>tsovet</li>
        <li>rolex</li>
        <li>oris</li>
        <li>citizen</li>
        <li>casio</li>
        </ul>
        </div>

        <div className="col-lg-3  text-uppercase">
        <ul>
        <li>news</li>
        <li>stores</li>
        <li>customer service</li>
        <li>medias</li>
        <li>extranet</li>
        </ul>
        </div>

        <div className="col-lg-3  text-uppercase">
        <ul>
        <li>cookie policy</li>
        <li>privacy policy</li>
        <li>terms and conditions</li>
        <li>24 hour shipping</li>
        <li>contact</li>
        </ul>
        </div>

        </div>
        </div>
        <div className="copyright">
        <div className="container py-4">
        <div className="row">
        <div className="col-md-6">
        <p className="text-capitalize">copyright &copy; watches store {new Date().getFullYear()}. all rights reserved{" "}</p>
        </div>

        <div className="col-md-6 d-flex  justify-content-around">
        {value.icons.map(item => (<a href={item.url} key={item.id}>{item.icon}</a>))}
        </div>
        </div>
        </div>
        </div>
        </FooterWrapper>
      )

    }}
    </ProductConsumer>

  )

    
}

const FooterWrapper = styled.footer`
background: var(--lightGrey);
color: var(--mainWhite);
padding: 20px 0;


ul {
  padding-left: 0;
  list-style: none;
}

.copyright {
  background: #333333;
 margin-bottom: -80px;
 height: 80px;
 clear: both;
 position: relative;
  
  
  
}


.icon {
  font-size: 1.5rem;
  color: var(--primaryColor);
  
}

.icon:hover {
  color: var(--lightGrey);
  cursor: pointer;
}

`
