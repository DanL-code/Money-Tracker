import React, { useContext, useState, useEffect, useRef } from 'react';
import IncomeItem from './IncomeItem';
import { AppContext } from '../context/AppContext';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const IncomeList = () => {
    const { incomes, dateFilter } = useContext(AppContext);
    const [filteredIncomes, setFilteredIncomes] = useState(incomes);
    const [chartData, setChartData] = useState({});
    const chartRef = useRef(null);

    useEffect(() => {
        if (!incomes) {
            setChartData({});
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            return null;
        }

        let updatedIncomes = incomes;

        if (dateFilter && dateFilter.startDate && dateFilter.endDate) {
            updatedIncomes = incomes.filter(
                (income) =>
                    income.date >= dateFilter.startDate && income.date <= dateFilter.endDate
            );
        }

        setFilteredIncomes(updatedIncomes);

        const tagAmounts = updatedIncomes.reduce((accumulator, income) => {
            const tag = income.tag;
            accumulator[tag] = (accumulator[tag] || 0) + income.amount;
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

    }, [incomes, dateFilter]);

    return (
        <div>
            {filteredIncomes.length > 0 ? (
                <ul className='list-group'>
                    {filteredIncomes.map((income) => (
                        <IncomeItem
                            key={income.record_id}
                            id={income.record_id}
                            name={income.detail}
                            earning={income.amount}
                            date={income.date}
                            tag={income.tag}
                        />
                    ))}
                </ul>
            ) : (
                <p>No incomes</p>
            )}
            {Object.keys(chartData).length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <Doughnut data={chartData} />
                </div>
            )}
        </div>
    );
};

export default IncomeList;
