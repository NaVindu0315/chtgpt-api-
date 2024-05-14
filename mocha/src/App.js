/*import logo from './logo.svg';
import './App.css';

import EmailForm from './Button'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <EmailForm />
      </header>
    </div>
  );
}

export default App;
*/

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    if(e.target.id === 'name'){
      setName(e.target.value);
    } else if(e.target.id === 'email'){
      setEmail(e.target.value);
    } else {
      setMsg(e.target.value);
    }
  }
  
  const handleClick = (e) => {
    e.preventDefault();

    const dataToSubmit = { name, email, msg };
    //console.log(dataToSubmit);
    axios.post("/api/sendMail", dataToSubmit );
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleClick}>
          <div>
          <input style={{width: "40%"}}
                 type="text" 
                 name="name"
                 id="name"
                 value={name} 
                 placeholder="Name" 
                 onChange={handleChange} />
          <input style={{width: "40%"}}
                 type="email" 
                 name="email"
                 id="email"
                 value={email} 
                 placeholder="Email" 
                 onChange={handleChange} />
          <br />
          </div>
          <textarea style={{width: "100%", height: "100%", overflow: "hidden"}}
                    name="msg"
                    id="msg"
                    value={msg} 
                    placeholder="Message"
                    maxLength="3000"
                    onChange={handleChange} >
          </textarea>
          <div>
          <button onClick={handleClick}>SEND</button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;


/*

  "axios": "^0.19.1",
    "http-proxy-middleware": "^0.20.0",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-scripts": "3.3.0"

*/