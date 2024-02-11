import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../components/Login';

const LoginScreen = () => {
  const navigate = useNavigate();

  const handleLogin = (username) => {
    console.log('Logged in as:', username);
    navigate(`/home/${username}`);
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-sm'>
           <Login onLogin={handleLogin} />
              <div className='row mt-3'>
                <div className='col-sm text-center'>
                  <Link to="/create-account">
                    <button type='submit' className='btn btn-primary'>
                      Create Account
                    </button>
                  </Link>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
