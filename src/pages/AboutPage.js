import React from 'react';
import Title from '../components/Title';
import Hero from '../components/Hero';
import aboutBcg from '../images/aboutBcg.jpeg';

export default function AboutPage() {
  return (
    <>
    <Hero img={aboutBcg}/>
   
   <section className=" py-5">
   <div className="container">
   <div className="row">
   <div className="col-10 mx-auto col-md-6 my-3">
   <img 
   src={aboutBcg} 
   className="img-fluid img-thumbnail"
    alt="about"
    style={{background: "var(--darkGrey)"}}
    />
   </div>

   <div className="col-10 mx-auto col-md-6 my-3">
   <Title title="about us"/>
   <p className="text-lead text-muted my-3">
   We’re obsessed by the details, so we started making watches that make a lasting impression.  It is something we’ve been doing for a long time.  Born and raised in California, we have lived in the geographical epicenter that has produced innovative designers and engineers from various creative fields.

Their connection and creative contribution inspires us to explore innovative ways to engineer, develop and build better premium watches.  We thrive on spending long days and sleepless nights thinking about every last detail in all aspects of our business.

It’s all about creating products that are committed to the truth; we live what we make and we make what we live…

TSOVET – Independent and superlative watches representing the freedom of travel and exploration.
   
   </p>

   <button className="main-link" type="button" style={{marginTop: "2rem"}}>more info</button>
   </div>
   </div>
   </div>
   
   </section>

    
    </>
  )
}

