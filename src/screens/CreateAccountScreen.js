
import React from 'react';
import { Link } from 'react-router-dom';
import CreateAccount from '../components/CreateAccount';


const CreateAccountScreen = () => {
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-sm'>
          <CreateAccount />
          <div className='row mt-3'>
            <div className='col-sm text-center'>
              <Link to="/">
                <button type='submit' className='btn btn-primary'>
                  Back to Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountScreen;
