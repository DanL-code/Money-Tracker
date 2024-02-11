import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CreateAccount = ({ onCreateAccount }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  

  const handleCreateAccount = async () => {
    try {

      if (!username.trim()) {
        setErrorMessage('Username cannot be empty');
        return;
      }

      if (!password.trim()) {
        setErrorMessage('Password cannot be empty');
        return;
      }

      const response = await fetch('http://localhost:5000/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password}),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Account create success');
        setSuccessMessage('Account created successfully, directing to login...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
        
      } else {
        console.error('Account creation failed:', result.message);
        setErrorMessage('Username already exists, please try entering a new username.');
      }
    } catch (error) {
      console.error('Account creation error:', error);
      setErrorMessage('Username already exists, please try entering a new username.');
    }
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-sm-6'>
          <h2 className='mt-3'>Create Account</h2>
          {successMessage && (
            <div className='alert alert-success' role='alert'>
              {successMessage}
            </div>
          )}
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
            <button type='submit' className='btn btn-primary' onClick={handleCreateAccount}>
            Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;