import React, { useState } from 'react';


const testimonials = [
  {
    img: "/images/testimonial.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    name: "John Doe"
  },
  {
    img: "/images/testimonial2.jpg",
    text: "Absolutely wonderful experience! Highly recommended for everyone.",
    name: "Jane Smith"
  },
  {
    img: "/images/testimonial3.jpg",
    text: "Professional, friendly, and reliable. Will use again!",
    name: "Alex Lee"
  },
  {
    img: "/images/testimonial4.jpg",
    text: "The best service I have ever experienced. Thank you so much!",
    name: "Maria Garcia"
  },
  {
    img: "/images/testimonial5.jpg",
    text: "Fast, efficient, and very helpful staff.",
    name: "Chris Evans"
  },
  {
    img: "/images/testimonial6.jpg",
    text: "A truly outstanding experience from start to finish.",
    name: "Priya Patel"
  },
  {
    img: "/images/testimonial7.jpg",
    text: "I will definitely recommend them to my friends.",
    name: "Liam Wong"
  }
];


const Home = () => {
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <section className="section-hero">
        <div className='conatiner grid grid-two-cols'>
          <div className="hero-content">
            <p className="hero-top-data">Welcome to our website</p>
            <h1 className="hero-heading">We are the best in the business</h1>
            <p className="hero-para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam ipsa nam rerum delectus, optio quidem mollitia autem quia eveniet quod facere libero vero ducimus neque nulla earum magni placeat fuga?</p>
            <div className='btn btn-group'>
              <a href="/contact"><button className='btn'> connect now</button></a>
              <a href="/about"><button className='btn'> learn more</button></a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/hero.jpg" alt="hero image" className='hero-img' width="400" height="500"/>
          </div>
        </div>  
      </section> 
      <div>
          <h1 className='heading'>Our Services</h1>
          <div className='container grid grid-three-cols'>
            <div className='card'>
              <img src="/images/service1.jpg" alt="service 1" className='card-img' />
              <h2 className='card-title'>Service 1</h2>
              <p className='card-para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
            </div>
            <div className='card'>
              <img src="/images/service2.jpg" alt="service 2" className='card-img' />
              <h2 className='card-title'>Service 2</h2>
              <p className='card-para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
            </div>
            <div className='card'>
              <img src="/images/service3.jpg" alt="service 3" className='card-img' />
              <h2 className='card-title'>Service 3</h2>
              <p className='card-para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
            </div>
          </div>
        </div>
      {/* <div className='container'>
        <h1 className='heading'>Testimonials</h1>
        <div className='testimonials-grid'>
          <div className='testimonial'>
            <img src="/images/testimonial.jpg" alt="testimonial" className='testimonial-img' />
            <p className='testimonial-para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
            <h2 className='testimonial-name'>John Doe</h2>
          </div>
          <div className='testimonial'>
            <img src="/images/testimonial2.jpg" alt="testimonial" className='testimonial-img' />
            <p className='testimonial-para'>Absolutely wonderful experience! Highly recommended for everyone.</p>
            <h2 className='testimonial-name'>Jane Smith</h2>
          </div>
          <div className='testimonial'>
            <img src="/images/testimonial3.jpg" alt="testimonial" className='testimonial-img' />
            <p className='testimonial-para'>Professional, friendly, and reliable. Will use again!</p>
            <h2 className='testimonial-name'>Alex Lee</h2>
          </div>
          <div className='testimonial'>
            <img src="/images/testimonial4.jpg" alt="testimonial" className='testimonial-img' />
            <p className='testimonial-para'>The best service I have ever experienced. Thank you so much!</p>
            <h2 className='testimonial-name'>Maria Garcia</h2>
          </div>
        </div>
      </div> */}
      <div className='container'>
      <h1 className='heading'>Testimonials</h1>
      <div className='testimonials-grid'>
        <div className='testimonial'>
          <img src={testimonials[current].img} alt="testimonial" className='testimonial-img' />
          <p className='testimonial-para'>{testimonials[current].text}</p>
          <h2 className='testimonial-name'>{testimonials[current].name}</h2>
        </div>
      </div>
      <div className="testimonials-pagination">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={current === idx ? "active" : ""}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
          ></button>
        ))}
      </div>
    </div>
    <footer>
      <div className='container grid grid-two-cols'>
        <div className="footer-image">
          <img src="/images/footer.jpg" alt="footer image" className='footer-img' width="400" height="500"/>
        </div>
        <div className="footer-content">
          <h1 className='footer-heading'>Get in Touch</h1>
          <p className='footer-para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
          <a href="/contact"><button className='btn'>Contact Us</button></a>
        </div>
      </div>
      <div>
        {/* social media links */}
        <div className='social-media'>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><img src="/images/facebook.png" alt="Facebook" /></a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><img src="/images/twitter.png" alt="Twitter" /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><img src="/images/instagram.png" alt="Instagram" /></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><img src="/images/linkedin.png" alt="LinkedIn" /></a>
        </div>
        {/* footer text */}
        <p className='footer-text'>© 2023 Your Company. All rights reserved.</p>
        <p className='footer-text'>Privacy Policy | Terms of Service</p>
      </div>
    </footer>
    </div>
  )
}

export default Home
