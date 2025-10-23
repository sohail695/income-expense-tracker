
import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '../types';
import Button3D from './common/Button3D';
import Panel from './common/Panel';

interface TransactionFormProps {
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  cancelEdit: () => void;
  editingTransaction: Transaction | null;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ addTransaction, editingTransaction, updateTransaction, cancelEdit }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);

  const isEditing = editingTransaction !== null;

  useEffect(() => {
    if (isEditing) {
      setDescription(editingTransaction.description);
      setAmount(editingTransaction.amount.toString());
      setDate(editingTransaction.date);
      setType(editingTransaction.type);
    } else {
      // Reset form to default for adding new transaction
      setDescription('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setType(TransactionType.EXPENSE);
    }
  }, [editingTransaction, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date) {
      alert('Please fill all fields');
      return;
    }
    
    if (isEditing) {
      updateTransaction({
        ...editingTransaction,
        description,
        amount: parseFloat(amount),
        date,
        type,
      });
    } else {
      addTransaction({
        description,
        amount: parseFloat(amount),
        date,
        type,
      });
      // Clear fields after adding
      setDescription('');
      setAmount('');
    }
  };

  return (
    <Panel>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-center">{isEditing ? 'Edit Transaction' : 'Add New Transaction'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 bg-white shadow-retro-in"
                placeholder="e.g., Coffee"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Amount ($)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 bg-white shadow-retro-in"
                placeholder="e.g., 4.50"
                step="0.01"
              />
            </div>
          </div>
          <div>
            <label className="block font-bold mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 bg-white shadow-retro-in"
            />
          </div>
          <fieldset className="flex justify-center gap-6 py-2">
            <legend className="sr-only">Transaction Type</legend>
            <label className="flex items-center gap-2 font-bold cursor-pointer">
              <input
                type="radio"
                name="type"
                value={TransactionType.INCOME}
                checked={type === TransactionType.INCOME}
                onChange={() => setType(TransactionType.INCOME)}
                className="w-5 h-5"
              />
              <span className="text-green-600">Income</span>
            </label>
            <label className="flex items-center gap-2 font-bold cursor-pointer">
              <input
                type="radio"
                name="type"
                value={TransactionType.EXPENSE}
                checked={type === TransactionType.EXPENSE}
                onChange={() => setType(TransactionType.EXPENSE)}
                className="w-5 h-5"
              />
              <span className="text-red-600">Expense</span>
            </label>
          </fieldset>
          <div className="flex gap-4">
            <Button3D type="submit" className="w-full py-3 bg-blue-500 text-white hover:bg-blue-600">
              {isEditing ? 'Update Transaction' : 'Add Transaction'}
            </Button3D>
            {isEditing && (
              <Button3D type="button" onClick={cancelEdit} className="w-full py-3 bg-retro-gray-dark text-white hover:bg-gray-500">
                Cancel
              </Button3D>
            )}
          </div>
        </form>
      </div>
    </Panel>
  );
};

export default TransactionForm;