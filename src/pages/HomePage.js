import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeaturedProducts from '../components/FeaturedProducts';

export default function HomePage() {
  return (
    <>
      <Hero title="awesome watches" max="true">
      <Link to="/products" className="main-link" style={{margin: '2rem'}}>our products</Link>
      </Hero>
      <Services/>
      <FeaturedProducts/>
    </>
  )
}
