const { apiRequest } = require("../helpers/bookerApiHelper");


class AuthService {
  constructor() {
    this.token = null;
  }

  async createAuthToken(username = "admin", password = "password123") {
    const response = await apiRequest("POST", "/auth", { username, password });

    this.token = response.data.token;
    return this.token;
  }

  getToken() {
    if (!this.token) throw new Error("Token not found. Please authenticate first.");
    return this.token;
  }
}

module.exports = new AuthService();

