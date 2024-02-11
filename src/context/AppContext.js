import { createContext, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";

const AppReducer = (state, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
            };
        case 'ADD_INCOME':
            return {
                ...state,
                incomes: [...state.incomes, action.payload],
            };
        
        case 'DELETE_ITEM':
            return {
                ...state,
                expenses: state.expenses.filter(expenses=> expenses.record_id !== action.payload)
            };
        case 'DELETE_INCOME':
            return {
                ...state,
                incomes: state.incomes.filter((incomes)=> incomes.record_id !== action.payload)
            };
        case 'SET_DATE_FILTER':
            return {
                ...state,
                dateFilter: action.payload,
            };
        case 'RESET_DATE_FILTER':
            return {
                ...state,
                dateFilter: null,
            };
        case 'FETCH_DATA':
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    expenses: action.payload.filter((record) => record.type === 'expense'),
                    incomes: action.payload.filter((record) => record.type === 'income'),
                };
            } else {
                console.error('Invalid payload for FETCH_DATA:', action.payload);
                return state;
            };

        default:
            return state;
    }
};

const initialState = {
    expenses: [],
    incomes: [],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const { username } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/records/${username}`);
                console.log('Fetching URL:', `http://localhost:5000/api/records/${username}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                console.log('Fetched Data:', data);
    
                if (Array.isArray(data)) {
                    dispatch({ type: 'FETCH_DATA', payload: data });
                } else {
                    console.error('Invalid payload for FETCH_DATA:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [username, dispatch]);
    

    return(
        <AppContext.Provider 
            value={{
                expenses: state.expenses,
                incomes: state.incomes,
                dateFilter: state.dateFilter,
                dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};