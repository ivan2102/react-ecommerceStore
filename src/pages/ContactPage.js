import React from 'react';
import Hero from '../components/Hero';
import Title from '../components/Title';
import contactBcg from '../images/contactBcg.jpeg';

export default function ContactPage() {
  return (
    <>
      <Hero img={contactBcg}/>
      <section className="py-5">
      <div className="row">
      <div className="col-10 mx-auto col-md-6 my-3">

      <Title title="contact us"/>

      <form className="mt-5" action="https://formspree.io/iradisavljevic168@gmail.com" method="post">
      <div className="form-group">
      <input type="text" name="firstName" className="form-control" placeholder="john smith"/>
      </div>

      <div className="form-group">
      <input type="email" name="email" className="form-control" placeholder="email@email.com"/>
      </div>

      <div className="form-group">
      <input type="text" name="subject" className="form-control" placeholder="important!!!"/>
      </div>

      <div className="form-group">
      <textarea name="message" id="message" className="form-control" placeholder="write your message" rows="10"></textarea>
      </div>
      
      <div className="form-group">
      <input type="submit" name="submit" value="Send" className="form-control btn btn-primary"/>
      </div>
      </form>
      </div>
      </div>
      </section>
    </>
  )
}

