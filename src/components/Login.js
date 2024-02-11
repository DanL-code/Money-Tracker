import React, { useState } from 'react';


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {

      if (!username.trim()) {
        setErrorMessage('Username cannot be empty');
        return;
      }
      
      if (!password.trim()) {
        setErrorMessage('Password cannot be empty');
        return;
      }

      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const result = await response.json();
      console.log('Login response:', result);
  
      if (result.success) {
        console.log('Login successful. Username:', result.username);
        onLogin(result.username); 
      } else {
        console.error('Login failed:', result.message);
        setErrorMessage('Login failed, please double-check your username and password.');
      }
        console.log('Login successful. Username:', result.username);
    } catch (error) {
      console.error('Login error:', error);
    }
  };


  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-sm-6'>
          <h2 className='mt-3'>Login Page</h2>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <div className='form-group'>
            <label htmlFor='username'>Username: </label>
            <input
              type='text'
              id='username'
              className='form-control'
              value={username}
              required='required'
              onChange={(e) => setUsername(e.target.value.trim())}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password: </label>
            <input
              type='password'
              id='password'
              className='form-control'
              value={password}
              required='required'
              onChange={(e) => setPassword(e.target.value.trim())}
            />
          </div>
          <div className='text-center mt-3'>
            <button type='submit' className='btn btn-primary' onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Login;
