'use strict';

const axios = require('axios').default;

const login = (req) => {
    return axios.post(`/login`, req, { headers: { 'Content-type': 'application/json' } });
}

const listItems = () => {
    const token = localStorage.getItem('token');
    return axios.get('/tasks/list', { headers: { 'Authorization': `Bearer ${token}` } });
}

const addNewTask = (req) => {
    const token = localStorage.getItem('token');
    return axios.post('/tasks/create', req, { headers: { 'Authorization': `Bearer ${token}` } });
}

const deleteTask = (req) => {
    const token = localStorage.getItem('token');
    return axios.delete('/tasks/remove', { data: req, headers: { 'Authorization': `Bearer ${token}` } });
}

const updateTaskStatus = (req) => {
    const token = localStorage.getItem('token');
    return axios.put('/tasks/update-status', req, { headers: { 'Authorization': `Bearer ${token}` } });
}

const editTaskTitle = (req) => {
    const token = localStorage.getItem('token');
    return axios.put('/tasks/update-title', req, { headers: { 'Authorization': `Bearer ${token}` } });
}

const updateUserPassword = (req) => {
    const token = localStorage.getItem('token');
    return axios.put('/update-password', req, { headers: { 'Authorization': `Bearer ${token}` } });
}

const createAccount = (req) => {
    const token = localStorage.getItem('token');
    return axios.post('/create-user', req, { headers: { 'Authorization': `Bearer ${token}` } });
}

module.exports = { login, listItems, addNewTask, deleteTask, updateTaskStatus, editTaskTitle, updateUserPassword, createAccount };
