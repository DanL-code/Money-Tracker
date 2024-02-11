import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useParams } from "react-router-dom";

const AddIncomeForm = () => {
    const { dispatch } = useContext(AppContext);

    const [detail, setDetail] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [tag, setSelectedTag] = useState('');
    const [isValidInput, setIsValidInput] = useState(true);
    const { username } = useParams();


    const handleChange = (event) => {
        const inputValue = event.target.value;
    
        if (/^\d+(\.\d*)?$/.test(inputValue) || inputValue === '') {
          setAmount(inputValue);
          setIsValidInput(true);
        } else {
          setIsValidInput(false);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        let current_amount = -1;
        try {
            const response = await fetch(`http://localhost:5000/api/transactions/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (result.success) {
                console.log('income added to the database successfully.');
                current_amount = result.current_amount + 1;
                console.log('1111111 income:', result.current_amount);
                console.log('2222222 income:', current_amount);

                const income = {
                    username: username,
                    detail: detail,
                    amount: parseInt(amount),
                    date: date,
                    record_id: current_amount,
                    type: 'income',
                    tag: tag,
                };

                console.log('test added income:', income);
            
                dispatch({
                    type: 'ADD_INCOME',
                    payload: income,
                });
        
                console.log('test added income:', income);
            
                try {
                    const response = await fetch(`http://localhost:5000/api/records/add`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(income),
                    });
            
                    const result = await response.json();
            
                    if (result.success) {
                        console.log('Expense added to the database successfully.');
        
                        try {
                            const response = await fetch(`http://localhost:5000/api/transactions/update_amount`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({username, current_amount}),
                            });
                    
                            const result = await response.json();
                    
                            if (result.success) {
                                console.log('Income updated to the database successfully.');
                                
                            } else {
                                console.error('Failed to update income to the database:', result.message);
                            }
                        } catch (error) {
                            console.error('Error updating the database:', error);
                        }
        
                    } else {
                        console.error('Failed to add income to the database:', result.message);
                    }
                } catch (error) {
                    console.error('Error updating the database:', error);
                }
            } else {
                console.error('Failed to add income to the database:', result.message);
            }
        } catch (error) {
            console.error('Error updating the database:', error);
        }
    
        setDetail('');
        setAmount('');
        setDate('');
        setSelectedTag('');
    };

    const tags = ['Salary', 'Invest', 'Other'];

    return(
        <form onSubmit={onSubmit}>
            <div className='row'>
                <div className='col-sm'>
                    <label htmlFor='name'>Detail</label>
                    <input 
                    required='required' 
                    type='text' 
                    className='form-control' 
                    id='name' 
                    value={detail} 
                    onChange={(event) => setDetail(event.target.value)}
                    ></input>
                </div>
                <div className='col-sm'>
                    <label htmlFor='earning'>Amount</label>
                    <input 
                    required='required' 
                    type='text' 
                    className={`form-control ${isValidInput ? '' : 'is-invalid'}`} 
                    id='earning'
                    value={amount}
                    onChange={handleChange}
                    />
                    {!isValidInput && (
                    <div className='invalid-feedback'>
                        Please enter a valid number.
                    </div>
                 )}
                </div>
                <div className='col-sm'>
                  <label htmlFor='date'>Date</label>
                  <input
                    type='date'
                    required='required'
                    className='form-control'
                    id='date'
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  ></input>
                </div>
                <div className='col-sm'>
                    <label htmlFor='tag'>Tag</label>
                    <select
                        className='form-control'
                        required='required'
                        id='tag'
                        value={tag}
                        onChange={(event) => setSelectedTag(event.target.value)}
                    >
                        <option value='' disabled>---</option>
                           {tags.map((tag) => (
                           <option key={tag} value={tag}>
                           {tag}
                           </option>
                        ))}
                    </select>
                </div>
                <div className='col-sm' style={{ marginTop: '23px' }}>
                    <button type='submit' className='btn btn-primary'>Save</button>
                </div>
                

            </div>
        </form>
    )

}

export default AddIncomeForm;
