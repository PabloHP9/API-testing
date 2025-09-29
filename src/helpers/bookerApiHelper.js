const axios = require("axios")
const { BASE_URL } = require("../config/jest.config")

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

async function apiRequest(method, endpoint, data = {}, headers = {}) {
    try {
        const response = await axiosClient({
            method,
            url: endpoint,
            data,
            headers,
        });
        return response;
    }   catch (error) {
        return error.response || new Error('API request error');
    }
}

module.exports = {
  apiRequest,
};