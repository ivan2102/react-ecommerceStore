import React from 'react';
import Hero from '../components/Hero';
import Title from '../components/Title';
import styled from 'styled-components';
import aboutBcg from '../images/aboutBcg.jpeg';

export default function AboutPage() {
  return (
    <>
      <Hero img={aboutBcg}/>
      
      <section className="py-5">
      <div className="container">
      <div className="row">
      <div className="col-10 mx-auto col-md-6 my-3">
      <img 
      src={aboutBcg} 
      className="img-fluid img-thumbnail"
      style={{background: 'var(--darkGrey)'}}
      alt="about"
      />
      </div>

      <div className="col-10 mx-auto col-md-6 my-3">
      <Title title="about us"/>
     <p className="text-lead text-muted my-3">There are three chronographs that really matter: the Rolex Daytona, the Omega Speedmaster, and the Heuer Carrera. That's not to say others aren't great, but these three represent entire categories of collecting and scholarship unto themselves, and over the past seven decades they have rightly reached a level of appreciation that in some cases surpasses even the brands that produce them.</p>
     <p className="text-lead text-muted my-3">And so among serious watch collectors, that class of aficionado born with an innate, King Midas-like desire for next-level grails, the only versions of the Daytona, the Speedmaster, and the Carrera worth having are the versions that are rarely seen—those crafted not in steel but in solid yellow gold.</p>
     <button type="button" className="main-link text-center" style={{marginTop: '1.3rem'}}>more info</button>
      </div>
      </div>
      </div>
      </section>
    </>
  )
}

