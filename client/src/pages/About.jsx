import React from 'react'
import '../style/aboutPage.css'

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <section>
        <h2>Who We Are</h2>
        <p>
          Welcome to Adventure! We are a passionate team dedicated to creating memorable experiences and helping you explore the world in new ways.
        </p>
      </section>
      <section>
        <h2>Our Story</h2>
        <p>
          Founded in 2024, Adventure began as a small project among friends who loved to travel and share their journeys. Today, we connect explorers from all walks of life and inspire new adventures every day.
        </p>
      </section>
      <section>
        <h2>What We Offer</h2>
        <ul>
          <li>Curated travel guides and tips</li>
          <li>Community-driven adventure stories</li>
          <li>Personalized recommendations</li>
          <li>Exclusive member events and meetups</li>
          <li>Support for solo and group travelers</li>
        </ul>
      </section>
      <section>
        <h2>Meet the Team</h2>
        <p>
          Our team is made up of explorers, writers, and tech enthusiasts who believe in the power of discovery. We’re here to help you make the most of every journey.
        </p>
      </section>
      <section>
        <h2>Join Us</h2>
        <p>
          Whether you’re a seasoned traveler or just starting out, Adventure is here to support your journey. Connect with us and start your next adventure today!
        </p>
      </section>
    </div>
  )
}

export default About
