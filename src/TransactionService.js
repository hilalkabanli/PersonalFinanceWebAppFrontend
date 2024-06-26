// src/TransactionService.js
import axios from 'axios';

const API_URL = 'http://localhost:5261/api/Transactions'; // Update with your actual API URL

export const getAllTransactions = () => {
    return axios.get(`${API_URL}/GetAllTransactions`);
};

export const getTransactionById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createTransaction = (transaction) => {
    return axios.post(API_URL, transaction);
};

export const updateTransaction = (id, transaction) => {
    return axios.put(`${API_URL}/${id}`, transaction);
};

export const deleteTransaction = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
