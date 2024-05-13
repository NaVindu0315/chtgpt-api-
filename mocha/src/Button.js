import React, { useState } from 'react';
import axios from 'axios'; // Use axios for making HTTP requests

const Button = () => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/send-email', {
        recipient,
        message,
        title,
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
      <label>
        Recipient:
        <input type="email" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      </label>
      <label>
        Message:
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <button type="submit">Send Email</button>
    </form>
  );
};

export default Button;
