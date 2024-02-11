import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';


const  Spent= () => {

    const { expenses } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total, item) =>{
        return (total = total + item.amount);
    }, 0);

    return (
        <div className='alert alert-danger'>
            <span>Spent so far: ${totalExpenses}</span>
        </div>
    );
};

export default Spent;
