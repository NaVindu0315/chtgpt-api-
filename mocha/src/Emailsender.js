import React, { useCallback } from 'react';

const EmailSender = () => {
  const handleSendEmail = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3002/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: 'navindulakshan99@gmail.com',
          subject: 'hutti',
          message: 'paka',
        }),
      });

      if (!response.ok) {
        throw new Error('Error sending email!');
      }

      const { message, info } = await response.json();
      console.log(message, info);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <h2>Send Email</h2>
      <button onClick={handleSendEmail}>Send</button>
    </div>
  );
};

export default EmailSender;