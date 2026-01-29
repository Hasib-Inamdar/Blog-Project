import React from 'react'

const ContactForm = () => {
    return (
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
    )
}

export default ContactForm