import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import './Transfer.css'; // Import your custom CSS for styling

const Transfer = () => {
    const [accounts, setAccounts] = useState([]);
    const [senderAccountID, setSenderAccountID] = useState('');
    const [receiverAccountID, setReceiverAccountID] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        // Fetch all accounts
        axios.get('/api/accounts/GetAllAccounts',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(response => {
                setAccounts(response.data);
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });
    }, []);

    const handleTransfer = () => {
        const transferData = {
            SenderAccountID: senderAccountID,
            ReceiverAccountID: receiverAccountID,
            Amount: parseFloat(amount),
            Description: description,
        };

        axios.post('/api/transfers', transferData, 
            { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                setMessage(`Transfer successful! New balance: ${response.data}`);
            })
            .catch(error => {
                if (error.response) {
                    setMessage(`Error: ${error.response.data}`);
                } else {
                    setMessage('An error occurred during the transfer.');
                }
                console.error('Error making transfer:', error);
            });
    };

    return (
        <div className="container">
            <div className="transfer-container">
                <h2>Make a Transfer</h2>
                <div className="form-group">
                    <label htmlFor="senderAccount">Sender Account:</label>
                    <select
                        id="senderAccount"
                        className="form-control"
                        value={senderAccountID}
                        onChange={(e) => setSenderAccountID(e.target.value)}
                    >
                        <option value="">Select Sender Account</option>
                        {accounts.map(account => (
                            <option key={account.accountId} value={account.accountId}>
                                {account.name} - ${account.balance.toFixed(2)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="receiverAccount">Receiver Account:</label>
                    <select
                        id="receiverAccount"
                        className="form-control"
                        value={receiverAccountID}
                        onChange={(e) => setReceiverAccountID(e.target.value)}
                    >
                        <option value="">Select Receiver Account</option>
                        {accounts.map(account => (
                            <option key={account.accountId} value={account.accountId}>
                                {account.name} - ${account.balance.toFixed(2)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        id="amount"
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        id="description"
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleTransfer}>Transfer</button>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Transfer;
