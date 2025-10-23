
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import Panel from './common/Panel';

interface TransactionChartProps {
    totalIncome: number;
    totalExpense: number;
}

const TransactionChart: React.FC<TransactionChartProps> = ({ totalIncome, totalExpense }) => {
    const data = [
        { name: 'Summary', Income: totalIncome, Expense: totalExpense },
    ];

    return (
      <Panel>
        <div className="p-4 h-80">
          <h3 className="text-lg font-bold mb-4 text-center">Income vs Expense</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#a0a0a0"/>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#dfdfdf', 
                            border: '2px solid #808080'
                        }}
                    />
                    <Legend />
                    <Bar dataKey="Income" fill="#22c55e" />
                    <Bar dataKey="Expense" fill="#ef4444" />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </Panel>
    );
};

export default TransactionChart;
