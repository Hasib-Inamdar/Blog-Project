import React from 'react'

const ContactForm = () => {
    return (
        <form className='contact-form' onSubmit={(e) => { e.preventDefault() }}>
            <div className='name-sec'>
                <div className='first-name-inpt'>
                    <p>First Name</p>
                    <input type="text" className='input-field' />
                </div>
                <div className='last-name-inpt'>
                    <p>Last Name</p>
                    <input type="text" className='input-field' />
                </div>
            </div>
            <div className="email-sec">
                <p>Email</p>
                <input type="email" className='input-field' />
            </div>
            <div className="msg-sec">
                <p>Leave Us a Message...</p>
                <input type="text" className='input-field' />
            </div>
            <button>Submit</button>
        </form>
    )
}

export default ContactForm