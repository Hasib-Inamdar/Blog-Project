import React from 'react'

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
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <div className='name-sec'>
                        <div className='first-name-inpt'>
                            <label>First Name</label>
                            <input type="text" className='input-field' />
                        </div>
                        <div className='last-name-inpt'>
                            <label>Last Name</label>
                            <input type="text" className='input-field' />
                        </div>
                    </div>
                    <div className="email-sec">
                        <label>Email</label>
                        <input type="email" className='input-field' />
                    </div>
                    <div className="msg-sec">
                        <label>Leave Us a Message...</label>
                        <input type="text" className='input-field' />
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </footer>
    )
}

export default Footer