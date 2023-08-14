import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <div className="contact-details">
        <img src="img.jpg" alt="Profile" />
        <div className="contact-info">
          <h3>Contact Details</h3>
          <p>Name: Prangya parimita patra</p>
          <p>Email: prangyaparimitapatra53@gmail.com</p>
          <p>Phone:=91 6370170489</p>
          <div className="social-links">
            <a href="mailto:prangyaparimitapatra53@gmail.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-email">Email</i>
            </a>
            <a href="https://github.com/prangya-parimita-patra" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github">Github</i>
            </a>
            <a href="https://www.linkedin.com/in/prangya-parimita-patra" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin">LinkedIn</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
