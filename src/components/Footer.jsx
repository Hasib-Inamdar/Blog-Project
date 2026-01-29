import React from 'react'
import ContactForm from './ContactForm'

const Footer = () => {
    return (
        <footer>
            <div className="web-info">
                <div className="social-icon">
                    <img src="./images/fb.svg" alt="FB" />
                    <img src="./images/insta.svg" alt="Insta" />
                    <img src="./images/twitter.svg" alt="Twitter" />
                </div>
                <div className="foot-dtls">
                    <h4>Inner Pieces</h4>
                    <p>123-456-7890</p>
                    <p>info@mysite.com</p>
                    <p>&copy; 2026 by Hasib Inamdar</p>
                </div>
            </div>
            <div className="contact-section">
                <div className='contact-heading'>
                    <h4>Contact</h4>
                    <p>Ask me anything</p>
                </div>
                <ContactForm></ContactForm>
            </div>
        </footer>
    )
}

export default Footer