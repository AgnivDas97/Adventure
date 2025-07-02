import React from 'react'
import "../style/contact.css"

const Contact = () => {
  return (
// Place this in your Contact.jsx or similar file

<div className="contact-container">
  <h1>Contact Us</h1>
  <form>
    <div>
      <input
        type="text"
        id="name"
        name="name"
        placeholder=" "
        required
        autoComplete="off"
      />
      <label htmlFor="name">Your Name</label>
    </div>
    <div>
      <input
        type="email"
        id="email"
        name="email"
        placeholder=" "
        required
        autoComplete="off"
      />
      <label htmlFor="email">Your Email</label>
    </div>
    <div>
      <textarea
        id="message"
        name="message"
        placeholder=" "
        required
        rows={4}
      />
      <label htmlFor="message">Your Message</label>
    </div>
    <button type="submit">Send Message</button>
  </form>
</div>
  )
}

export default Contact
