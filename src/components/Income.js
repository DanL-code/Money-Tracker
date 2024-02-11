import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';


const  Spent= () => {

    const { incomes } = useContext(AppContext);

    const totalIncome = incomes.reduce((total, item) =>{
        return (total = total + item.amount);
    }, 0);

    return (
        <div className='alert alert-primary'>
            <span>Total Income: ${totalIncome}</span>
        </div>
    );
};

export default Spent;
