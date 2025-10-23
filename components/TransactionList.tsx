
import React from 'react';
import { Transaction, TransactionType } from '../types';
import Panel from './common/Panel';
import Button3D from './common/Button3D';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit }) => {
  return (
    <Panel>
      <div className="p-4 h-80 flex flex-col">
        <h3 className="text-lg font-bold mb-2 text-center">Transactions</h3>
        <Panel variant="inset" className="flex-grow overflow-y-auto bg-white">
          {transactions.length === 0 ? (
            <p className="text-center text-gray-500 p-4">No transactions for this period.</p>
          ) : (
            <ul>
              {transactions.map(t => (
                <li key={t.id} className="flex justify-between items-center p-2 border-b border-retro-gray">
                  <div className="flex-grow pr-4">
                    <p className="font-bold">{t.description}</p>
                    <p className="text-sm text-gray-600">{t.date}</p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <p className={`font-mono font-bold ${t.type === TransactionType.INCOME ? 'text-green-600' : 'text-red-600'}`}>
                      {t.type === TransactionType.INCOME ? '+' : '-'}${t.amount.toFixed(2)}
                    </p>
                    <Button3D 
                      onClick={() => onEdit(t)} 
                      className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500"
                      aria-label={`Edit transaction for ${t.description}`}
                    >
                      Edit
                    </Button3D>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </Panel>
  );
};

export default TransactionList;