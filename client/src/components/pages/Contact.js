import React, { useState } from 'react';
import axios from 'axios';
import './pages.css';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/contact', { name, email, message });
            setResponseMessage('Message sent successfully!');
        } catch (error) {
            setResponseMessage('Failed to send message. Please try again.');
        }
    };

    return (
    <div className='profile'>
    <div className="form1-main">
        <div className='heading'>CONTACT OUR TEAM</div>
        <div className="contact-form-container">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button className='button3' type="submit">Send</button>
                {responseMessage && <p className="response-message">{responseMessage}</p>}
            </form>
        </div>
    </div>
    </div>
    );
};

export default ContactForm;
