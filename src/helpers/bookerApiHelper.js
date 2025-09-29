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
        const startTime = Date.now();
        const response = await axiosClient({
            method,
            url: endpoint,
            data,
            headers,
        });

        const endTime = Date.now();
        const responseTime = endTime - startTime; 
        console.log(`[API Request] ${endpoint} took ${responseTime} ms`);
        response.responseTime = responseTime;

        return response;
    }   catch (error) {
        return error.response || new Error('API request error');
    }
}

module.exports = {
  apiRequest,
};