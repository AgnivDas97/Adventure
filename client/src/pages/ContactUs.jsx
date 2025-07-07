import React from "react";
import "../style/ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-page">
      <div className="contact-left">
        <h2>Contact Us</h2>
        <div className="contact-item">
          <i className="fas fa-map-marker-alt"></i>
          <div>
            <div className="contact-title">Address</div>
            <div className="contact-text">
              Building-2, Tower 2, golf view homes, 2nd floor,
              Wind Tunnel Rd, Murugeshpalya,
              Bengaluru, Karnataka 560017
            </div>
          </div>
        </div>
        <div className="contact-item">
          <i className="fas fa-phone"></i>
          <div>
            <div className="contact-title">Let's talk</div>
            <div className="contact-text">+91 987654321</div>
          </div>
        </div>
        <div className="contact-item">
          <i className="fas fa-envelope"></i>
          <div>
            <div className="contact-title">Mail</div>
            <div className="contact-text">saiubw762@gmail.com</div>
          </div>
        </div>
      </div>

      <div className="contact-right">
        <form className="contact-form">
          <label>User Name</label>
          <input type="text" placeholder="Enter your name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Phone Number</label>
          <input type="text" placeholder="Enter your phone number" />

          <label>Message</label>
          <textarea placeholder="Type your message"></textarea>

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
