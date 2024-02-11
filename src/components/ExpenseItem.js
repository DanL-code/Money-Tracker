import React, { useContext} from 'react'
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';


const ExpenseItem = (props) => {

    const { dispatch } = useContext(AppContext);

    const handleDeleteExpense = async () => {
        dispatch ({
            type: 'DELETE_ITEM',
            payload: props.id,
        })
        try {
            const response = await fetch(`http://localhost:5000/api/records/delete/${props.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: props.id }),
            });
            console.log('Deleted ID:', props.id);
    
            const result = await response.json();
    
            if (result.success) {
                console.log('Expense deleted to the database successfully.');
            } else {
                console.error('Failed to deleted expense to the database:', result.message);
            }
        } catch (error) {
            console.error('Error updating the database:', error);
        };
    };
    
    const pickedDate = props.date;
    const formattedDate = new Date(pickedDate).toLocaleDateString();
    return (
        <li className='list-group-item d-flex justify-content-between align-items-center'>
            <div>
                <p style={{ fontSize: '12px', margin: '0' }}>{formattedDate}</p>
                <span style={{ backgroundColor: 'rgb(242,235,29)', fontSize: '12px', borderRadius: '5px', padding:'3px 3px',}}>
                    <strong>{props.tag}</strong>
                </span>
            </div>
            <strong>{props.name}</strong>
            <div>
                <span style={{ backgroundColor: 'rgba(248,216,218,255)', color: 'darkred', borderRadius: '5px', padding:'3px 3px', margin: '0 20px' }}>
                    -${props.cost}
                </span>
                <TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete>
            </div>
        </li>
    );
};

export default ExpenseItem;
