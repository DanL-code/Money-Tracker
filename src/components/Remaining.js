import React,{useContext} from 'react'
import { AppContext } from '../context/AppContext';

const  Remaining= () => {
    const { expenses, incomes } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total, item) =>{
        return (total = total + item.amount);
    }, 0);

    const totalIncomes = incomes.reduce((total, item) =>{
        return (total = total + item.amount);
    }, 0);

    const alertType = totalExpenses > totalIncomes ? 'alert-danger' : 'alert-success';

    return (
        <div className= {`alert ${alertType}`}>
            <span>Balance: ${totalIncomes - totalExpenses}</span>
        </div>
    );
};

export default Remaining;
