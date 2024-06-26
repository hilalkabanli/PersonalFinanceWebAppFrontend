import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Accounts.css'; // Import the CSS file

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [editableAccountId, setEditableAccountId] = useState(null);
    const [createAccountData, setCreateAccountData] = useState({ name: '', accountType: 'Checking' });
    const [updateAccountData, setUpdateAccountData] = useState({ name: '', accountType: 'Checking' });

    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userID');

    useEffect(() => {
        fetchAccountsByUserId(userId);
    }, []);

    const fetchAccountsByUserId = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5261/api/accounts/GetAllAccounts`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAccounts(response.data.filter(account => account.userID === id));
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    const createAccount = async () => {
        try {
            const response = await axios.post('http://localhost:5261/api/accounts/CreateAccount', {
                userID: userId,
                name: createAccountData.name,
                accountType: createAccountData.accountType,
                balance: 0
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Account created successfully:', response.data);
            setCreateAccountData({ name: '', accountType: 'Checking' });
            fetchAccountsByUserId(userId);
        } catch (error) {
            console.error('Error creating account:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
            alert('Error creating account');
        }
    };

    const updateAccount = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5261/api/accounts/${id}`, updateAccountData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Account updated successfully:', response.data);
            setEditableAccountId(null);
            fetchAccountsByUserId(userId);
        } catch (error) {
            console.error('Error updating account:', error);
        }
    };

    const deleteAccount = async (id) => {
        try {
            await axios.delete(`http://localhost:5261/api/accounts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Account deleted successfully');
            fetchAccountsByUserId(userId);
            alert('Account deleted successfully');
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    return (
        <div className="accounts-container">
            <h1>My Accounts</h1>
            <div className="account-form account-card">
                <h2>Create New Account</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={createAccountData.name}
                    onChange={(e) => setCreateAccountData({ ...createAccountData, name: e.target.value })}
                />
                <select
                    value={createAccountData.accountType}
                    onChange={(e) => setCreateAccountData({ ...createAccountData, accountType: e.target.value })}
                >
                    <option value="Checking">Checking</option>
                    <option value="Savings">Savings</option>
                    <option value="Investment">Investment</option>
                    <option value="Other">Other</option>
                </select>
                <button onClick={createAccount}>Create</button>
            </div>

            <div className="accounts-grid">
                {accounts.map((account) => (
                    <div key={account.accountId} className="account-card">
                        {editableAccountId === account.accountId ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={updateAccountData.name}
                                    onChange={(e) => setUpdateAccountData({ ...updateAccountData, name: e.target.value })}
                                />
                                <select
                                    value={updateAccountData.accountType}
                                    onChange={(e) => setUpdateAccountData({ ...updateAccountData, accountType: e.target.value })}
                                >
                                    <option value="Checking">Checking</option>
                                    <option value="Savings">Savings</option>
                                    <option value="Investment">Investment</option>
                                    <option value="Other">Other</option>
                                </select>
                                <button className="update-btn" onClick={() => updateAccount(account.accountId)}>Save</button>
                                <button className="cancel-btn" onClick={() => setEditableAccountId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h3>{account.name.toUpperCase()}</h3>
                                <h4>{account.accountType}</h4>
                                <h4>{account.balance} Turkish Lira</h4>
                                <h5>{new Date(account.creationDate).toLocaleDateString()}</h5>
                                <button className="edit-btn" onClick={() => {
                                    setEditableAccountId(account.accountId);
                                    setUpdateAccountData({ name: account.name, accountType: account.accountType });
                                }}>Update</button>
                                <button className="delete-btn" onClick={() => deleteAccount(account.accountId)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Accounts;
