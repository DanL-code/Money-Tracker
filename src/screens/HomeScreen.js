import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from '../context/AppContext';
import Remaining from '../components/Remaining';
import Spent from '../components/Spent';
import ExpenseList from '../components/ExpenseList';
import { Link, useParams } from 'react-router-dom';
import IncomeList from '../components/IncomeList';
import Tabs from '../components/Tabs';
import Income from '../components/Income';
import AddFilterForm from '../components/AddFilterForm';

const HomeScreen = (props) => {
  const { username } = useParams();
  console.log('Username in HomeScreen:', username);
  return (
    <AppProvider>
      <div className='container'>
      <div className='row'>
      <div className='col'>
        <h1 className='mt-3'>
          <strong>Hello <span style={{ color: 'Green' }}>{username}</span>,</strong> Welcome to Money Tracker!
        </h1>
      </div>
      <div className='col-auto text-end mt-3' >
        <Link to="/">
          <button type='submit' className='btn btn-primary'  style={{ marginTop: '10px' }}>
            Logout
          </button>
        </Link>
      </div>
    </div>
        <div className="row mt-3">
          <div className="col-sm">
            <Remaining />
          </div>
          <div className="col-sm">
            <Income />
          </div>
          <div className="col-sm">
            <Spent />
          </div>
        
          <div className='row mt-3'>
            <div className='col-sm'>
              <Tabs />
            </div>
        </div>
          <div className='row mt-3'>
            <AddFilterForm />
            <div className='col-sm'>
              <h3 className='mt-3'>Incomes</h3>
              <IncomeList />
            </div>

            <div className='col-sm'>
              <h3 className='mt-3'>Expenses</h3>
              <ExpenseList />
            </div>
        
          </div>
        </div>
      </div>

    </AppProvider>
    
  )
}

export default HomeScreen;

