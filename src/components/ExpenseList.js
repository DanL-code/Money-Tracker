import React, { useContext, useState, useEffect, useRef } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const ExpenseList = () => {
    const { expenses, dateFilter } = useContext(AppContext);
    const [filteredExpenses, setFilteredExpenses] = useState(expenses);
    const [chartData, setChartData] = useState({});
    const chartRef = useRef(null);

    useEffect(() => {
        if (!expenses) {
            setChartData({});
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            return null;
        }

        let updatedExpenses = expenses;

        if (dateFilter && dateFilter.startDate && dateFilter.endDate) {
            updatedExpenses = expenses.filter(
                (expense) =>
                    expense.date >= dateFilter.startDate && expense.date <= dateFilter.endDate
            );
        }

        setFilteredExpenses(updatedExpenses);

        const tagAmounts = updatedExpenses.reduce((accumulator, expense) => {
            const tag = expense.tag;
            accumulator[tag] = (accumulator[tag] || 0) + expense.amount;
            return accumulator;
        }, {});

        const newChartData = {
            labels: Object.keys(tagAmounts),
            datasets: [
                {
                    data: Object.values(tagAmounts),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
                },
            ],
        };

        setChartData(newChartData);

    }, [expenses, dateFilter]);

    return (
        <div>
            {filteredExpenses.length > 0 ? (
                <ul className='list-group'>
                    {filteredExpenses.map((expense) => (
                        <ExpenseItem
                            key={expense.record_id}
                            id={expense.record_id}
                            name={expense.detail}
                            cost={expense.amount}
                            date={expense.date}
                            tag={expense.tag}
                        />
                    ))}
                </ul>
            ) : (
                <p>No expenses</p>
            )}
            {Object.keys(chartData).length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <Doughnut data={chartData} />
                </div>
            )}
        </div>
    );
};

export default ExpenseList;
