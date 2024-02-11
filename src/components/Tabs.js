import React, { useState } from 'react';
import AddIncomeForm from './AddIcomeForm';
import AddExpenseForm from './AddExpenseForm';


const Tab = ({ label, onClick, active }) => {
    return (
      <div
        style={{
          cursor: 'pointer',
          padding: '10px',
          marginRight: '10px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          color: active ? 'white' : 'black',
          backgroundColor: active ? 'green' : 'lightgrey',
        }}
        onClick={onClick}
      >
        {label}
      </div>
    );
  };
  
  const TabContent = ({ children, active }) => {
    return active ? <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '10px' }}>{children}</div> : null;
  };
  
  const Tabs = () => {
    const [activeTab, setActiveTab] = useState('income');
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    return (
      <div style={{ display: 'flex'}} >
        <Tab label="Add Income" onClick={() => handleTabClick('income')} active={activeTab === 'income'} />
        <Tab label="Add Expense" onClick={() => handleTabClick('expense')} active={activeTab === 'expense'} />
        <TabContent active={activeTab === 'income'}>
          <AddIncomeForm />
        </TabContent>
        <TabContent active={activeTab === 'expense'}>
          <AddExpenseForm />
        </TabContent>
      </div>
    );
  };
  

export default Tabs;
