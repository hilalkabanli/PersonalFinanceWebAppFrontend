import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Transaction.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Transaction = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [accountId, setAccountId] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAccountId, setExpenseAccountId] = useState('');
  const [errors, setErrors] = useState({});
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    axios.get('http://localhost:5261/api/accounts/GetAllAccounts', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setAccounts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the accounts!', error);
      });

    axios.get('http://localhost:5261/api/transactions/GetAllTransactions', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the transactions!', error);
      });
  }, []);

  const validateForm = (transactionType) => {
    let valid = true;
    const newErrors = {};

    if (transactionType === 0) {
      if (!amount.trim()) {
        newErrors.amount = 'Amount is required';
        valid = false;
      }

      if (!category.trim()) {
        newErrors.category = 'Category is required';
        valid = false;
      }

      if (!accountId) {
        newErrors.accountId = 'Account is required';
        valid = false;
      }
    } else {
      if (!expenseAmount.trim()) {
        newErrors.amount = 'Amount is required';
        valid = false;
      }

      if (!expenseCategory.trim()) {
        newErrors.category = 'Category is required';
        valid = false;
      }

      if (!expenseAccountId) {
        newErrors.accountId = 'Account is required';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleTransaction = (transactionType) => {
    if (!validateForm(transactionType)) {
      return;
    }

    const transactionData = {
      amount: transactionType === 0 ? parseFloat(amount) : parseFloat(expenseAmount),
      category: transactionType === 0 ? category : expenseCategory,
      description: transactionType === 0 ? description : expenseDescription,
      accountId: transactionType === 0 ? accountId : expenseAccountId,
      transactionType,
    };

    axios.post('http://localhost:5261/api/transactions', transactionData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert('Transaction created successfully!');
        setTransactions([...transactions, response.data]);
      })
      .catch(error => {
        console.error('There was an error creating the transaction!', error);
      });
  };

  const transactionDates = transactions.map(t => new Date(t.transactionDate).toLocaleDateString());
  const incomeAmounts = transactions.filter(t => t.transactionType === 0).map(t => t.amount);
  const expenseAmounts = transactions.filter(t => t.transactionType === 1).map(t => t.amount);

  const data = {
    labels: transactionDates,
    datasets: [
      {
        label: 'Income',
        data: incomeAmounts,
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Expense',
        data: expenseAmounts,
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  return (
    <div className="transaction-container">
      <h2>Income and Expense Tracker</h2>
      <div className="chart-container">
        <h3>Transaction Track</h3>
        <Line data={data} />
      </div>
      <div className="cards-container">
        <div className="card">
          <h3>Income</h3>
          <input 
            type="number" 
            placeholder="Amount" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
          {errors.amount && <p className="error-message">{errors.amount}</p>}
          <input 
            type="text" 
            placeholder="Category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
          />
          {errors.category && <p className="error-message">{errors.category}</p>}
          <input 
            type="text" 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          <select value={accountId} onChange={(e) => setAccountId(e.target.value)}>
            <option value="" disabled>Select Account</option>
            {accounts.map(account => (
              <option key={account.accountId} value={account.accountId}>
                {account.name}
              </option>
            ))}
          </select>
          {errors.accountId && <p className="error-message">{errors.accountId}</p>}
          <button onClick={() => handleTransaction(0)}>Add Income</button>
        </div>

        <div className="card">
          <h3>Expense</h3>
          <input 
            type="number" 
            placeholder="Amount" 
            value={expenseAmount} 
            onChange={(e) => setExpenseAmount(e.target.value)} 
          />
          {errors.amount && <p className="error-message">{errors.amount}</p>}
          <input 
            type="text" 
            placeholder="Category" 
            value={expenseCategory} 
            onChange={(e) => setExpenseCategory(e.target.value)} 
          />
          {errors.category && <p className="error-message">{errors.category}</p>}
          <input 
            type="text" 
            placeholder="Description" 
            value={expenseDescription} 
            onChange={(e) => setExpenseDescription(e.target.value)} 
          />
          <select value={expenseAccountId} onChange={(e) => setExpenseAccountId(e.target.value)}>
            <option value="" disabled>Select Account</option>
            {accounts.map(account => (
              <option key={account.accountId} value={account.accountId}>
                {account.name}
              </option>
            ))}
          </select>
          {errors.accountId && <p className="error-message">{errors.accountId}</p>}
          <button onClick={() => handleTransaction(1)}>Add Expense</button>
        </div>
      </div>

      <div className="transaction-lists">
        <div className="transaction-list">
          <h3>Incomes</h3>
          {transactions.filter(t => t.transactionType === 0).map((t, index) => (
            <div key={index} className="transaction-item">
              <span>{t.category}</span>
              <span>{t.amount}</span>
              <span>{new Date(t.transactionDate).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
        <div className="transaction-list">
          <h3>Expenses</h3>
          {transactions.filter(t => t.transactionType === 1).map((t, index) => (
            <div key={index} className="transaction-item">
              <span>{t.category}</span>
              <span>{t.amount}</span>
              <span>{new Date(t.transactionDate).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
