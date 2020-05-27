'use strict';

const axios = require('axios').default;

const login = (req) => {
    return axios.post(`/login`, req, { headers: { 'Content-type': 'application/json' } });
}

module.exports = { login };
