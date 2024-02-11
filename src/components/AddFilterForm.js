import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AddFilterForm = () => {
  const { dispatch } = useContext(AppContext);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: 'SET_DATE_FILTER',
      payload: { startDate, endDate },
    });
  };
  const onReset = () => {
    setStartDate('');
    setEndDate('');
    dispatch({
      type: 'RESET_DATE_FILTER',
    });
  };

  return (
    
    <form onSubmit={onSubmit}>
        <div className='row mt-3'>
            <div className='col-sm'>
                <label htmlFor="startDate">Start Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                />
            </div>
            <div className='col-sm'>
                <label htmlFor="endDate">End Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                />
             </div>
            <div className='col-sm' style={{ marginTop: '15px' }}>
                <button type="submit" className="btn btn-primary mt-2" style={{ marginRight: '20px' }} >Apply Filter</button>
                <button type='button' className='btn btn-primary mt-2' onClick={onReset}>Reset</button>
            </div>
            
        </div>
    </form>
  );
};

export default AddFilterForm;
