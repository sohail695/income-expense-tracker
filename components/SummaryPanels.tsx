
import React from 'react';
import Panel from './common/Panel';

interface SummaryPanelsProps {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

const SummaryPanels: React.FC<SummaryPanelsProps> = ({ totalIncome, totalExpense, netBalance }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Panel className="p-4 bg-green-200">
        <h3 className="font-bold text-green-800">Total Income</h3>
        <p className="text-2xl font-mono font-bold text-green-900">${totalIncome.toFixed(2)}</p>
      </Panel>
      <Panel className="p-4 bg-red-200">
        <h3 className="font-bold text-red-800">Total Expense</h3>
        <p className="text-2xl font-mono font-bold text-red-900">${totalExpense.toFixed(2)}</p>
      </Panel>
      <Panel className={`p-4 ${netBalance >= 0 ? 'bg-blue-200' : 'bg-yellow-200'}`}>
        <h3 className={`font-bold ${netBalance >= 0 ? 'text-blue-800' : 'text-yellow-800'}`}>Net Balance</h3>
        <p className={`text-2xl font-mono font-bold ${netBalance >= 0 ? 'text-blue-900' : 'text-yellow-900'}`}>${netBalance.toFixed(2)}</p>
      </Panel>
    </div>
  );
};

export default SummaryPanels;
