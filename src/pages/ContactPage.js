import React from 'react';
import Hero from '../components/Hero';
import contactBcg from '../images/contactBcg.jpeg';
import Title from '../components/Title';

export default function ContactPage() {
  return (
    <>
     <Hero img={contactBcg}/>
     <section className="py-5">
     <div className="row">
     <div className="col-10 mx-auto col-md-6 my-3">
     <Title title="Contact Us"/>
     <form className="mt-5">
     <div className="form-group">
     <input type="text" name="name" id="name" className="form-control" placeholder="Your Name"/>
     </div>

    <div className="form-group">
     <input type="email" name="email" id="email" className="form-control" placeholder="email@email.com"/>
     </div>

     <div className="form-group">
     <input type="text" name="subject" id="subject" className="form-control" placeholder="important!!!"/>
     </div>

     <div className="form-group">
     <textarea name="message" id="message" className="form-control" placeholder="type your message here" rows="3"></textarea>
     </div>

     <div className="form-group">
     
    <input type="submit" name="submit" className="btn btn-primary form-control" value="Send us"/>
     </div>

     </form>
     </div>
     </div>
     </section>
    </>
  )
}
