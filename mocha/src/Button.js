/*import React, { useState } from 'react';
import axios from 'axios'; // Use axios for making HTTP requests

const Button = () => {
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/send-email', {
       
      });

      console.log('Email response:', response.data);
      // Handle successful email sending (e.g., display success message)
    } catch (error) {
      console.error(error.response.data || error.message);
      // Handle email sending errors (e.g., display error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h1>Send Email</h1>
      <button type="submit">Send Email</button>
    </form>
  );
};

export default Button;
*/
/*
import React from 'react';

const Button = () => {
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3002/send-email', { // Replace with your server URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: 'navindulakshan99@gmail.com', // Hardcoded recipient (replace if needed)
          message: 'paka', // Hardcoded message (replace if needed)
          title: 'hutti', // Hardcoded title (replace if needed)
        }),
      });

      const data = await response.json();

      if (data.message === 'Email sent successfully!') {
        console.log('Email sent successfully!');
        // Handle successful email sending (e.g., display success message)
      } else {
        console.error('Error:', data.message);
        // Handle email sending errors (e.g., display error message)
      }
    } catch (error) {
      console.error(error);
      // Handle network or other errors
    }
  };

  return (
    <button type="button" onClick={handleSubmit}>
      Send Email
    </button>
  );
};

export default Button;
*/
/*
import React, { useState } from 'react';

const SendEmailButton = ({ port }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      const response = await fetch(`http://localhost:3002/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setEmailSent(true);
      } else {
        setError('Error sending email!');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <button onClick={handleClick}>
      {emailSent ? 'Email sent successfully!' : 'Send Email'}
    </button>
  );
};

export default SendEmailButton;
*/



import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/send-email', { email, subject, message });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Recipient's email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;