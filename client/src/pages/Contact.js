import React from 'react';
import './Contact.css'; // Optional: Create a CSS file to style your contact page

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form className="contact-form">
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Message:
          <textarea name="message" required></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
