import React, { useState, useMemo } from 'react';
import { Transaction, TransactionType, ViewMode } from './types';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SummaryPanels from './components/SummaryPanels';
import TransactionChart from './components/TransactionChart';
import Button3D from './components/common/Button3D';
import Panel from './components/common/Panel';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', date: '2024-07-15', description: 'Salary', amount: 3000, type: TransactionType.INCOME },
    { id: '2', date: '2024-07-15', description: 'Groceries', amount: 150, type: TransactionType.EXPENSE },
    { id: '3', date: '2024-07-16', description: 'Freelance Work', amount: 500, type: TransactionType.INCOME },
    { id: '4', date: '2024-07-20', description: 'Rent', amount: 1200, type: TransactionType.EXPENSE },
    { id: '5', date: '2024-06-10', description: 'Internet Bill', amount: 60, type: TransactionType.EXPENSE },
    { id: '6', date: '2023-12-25', description: 'Christmas Bonus', amount: 1000, type: TransactionType.INCOME },
  ]);

  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.MONTHLY);
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [...prev, { ...transaction, id: new Date().toISOString() }]);
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(transactions.map(t => (t.id === updatedTransaction.id ? updatedTransaction : t)));
    setEditingTransaction(null);
  };

  const handleEditClick = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingTransaction(null);
  };

  const viewModeColors = {
    [ViewMode.DAILY]: 'border-t-green-300 border-l-green-300 border-b-green-600 border-r-green-600 active:border-b-green-300 active:border-r-green-300 active:border-t-green-600 active:border-l-green-600',
    [ViewMode.MONTHLY]: 'border-t-sky-300 border-l-sky-300 border-b-sky-600 border-r-sky-600 active:border-b-sky-300 active:border-r-sky-300 active:border-t-sky-600 active:border-l-sky-600',
    [ViewMode.ANNUAL]: 'border-t-purple-300 border-l-purple-300 border-b-purple-600 border-r-purple-600 active:border-b-purple-300 active:border-r-purple-300 active:border-t-purple-600 active:border-l-purple-600',
  };

  const mainPanelBorders = 'border-t-teal-300 border-l-teal-300 border-b-cyan-600 border-r-cyan-600';

  const filteredTransactions = useMemo(() => {
    const dateFiltered = transactions.filter(t => {
      if (viewMode === ViewMode.DAILY) {
        return t.date === currentDate;
      }
      if (viewMode === ViewMode.MONTHLY) {
        return t.date.substring(0, 7) === currentDate.substring(0, 7);
      }
      if (viewMode === ViewMode.ANNUAL) {
        return t.date.substring(0, 4) === currentDate.substring(0, 4);
      }
      return false;
    });

    const searchFiltered = searchQuery
      ? dateFiltered.filter(t =>
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : dateFiltered;

    return searchFiltered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, viewMode, currentDate, searchQuery]);

  const { totalIncome, totalExpense, netBalance } = useMemo(() => {
    const totals = filteredTransactions.reduce((acc, t) => {
      if (t.type === TransactionType.INCOME) {
        acc.income += t.amount;
      } else {
        acc.expense += t.amount;
      }
      return acc;
    }, { income: 0, expense: 0 });

    return {
      totalIncome: totals.income,
      totalExpense: totals.expense,
      netBalance: totals.income - totals.expense,
    };
  }, [filteredTransactions]);

  const getTitle = () => {
    const date = new Date(currentDate + 'T00:00:00'); // Ensure date is parsed in local timezone
    switch (viewMode) {
      case ViewMode.DAILY:
        return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      case ViewMode.MONTHLY:
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
      case ViewMode.ANNUAL:
        return date.getFullYear().toString();
      default:
        return "Finance Tracker";
    }
  };


  return (
    <div className="bg-retro-gray min-h-screen font-sans p-4 sm:p-8 text-black">
      <Panel className="max-w-7xl mx-auto" borderClassName={mainPanelBorders}>
        <div className="bg-retro-gray-dark text-white p-2 flex justify-between items-center">
          <h1 className="text-lg font-bold">Sohail’s Income and Expenses</h1>
        </div>
        <div className="p-4 sm:p-6 space-y-6">
          <TransactionForm
            addTransaction={addTransaction}
            editingTransaction={editingTransaction}
            updateTransaction={updateTransaction}
            cancelEdit={cancelEdit}
          />
          
          <Panel variant="inset" className="p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
                {Object.values(ViewMode).map(mode => (
                  <Button3D 
                    key={mode} 
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 ${viewMode === mode ? 'bg-blue-200' : 'bg-retro-gray'}`}
                    borderClassName={viewModeColors[mode]}
                  >
                    {mode}
                  </Button3D>
                ))}
                <input 
                  type="date"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="bg-white border-2 border-retro-gray-dark shadow-retro-in p-1.5"
                />
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search by description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 bg-white shadow-retro-in"
                aria-label="Search transactions by description"
              />
            </div>
             <h2 className="text-xl font-bold text-center mt-2">{getTitle()}</h2>
          </Panel>

          <SummaryPanels totalIncome={totalIncome} totalExpense={totalExpense} netBalance={netBalance} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TransactionChart totalIncome={totalIncome} totalExpense={totalExpense} />
            <TransactionList transactions={filteredTransactions} onEdit={handleEditClick} />
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default App;