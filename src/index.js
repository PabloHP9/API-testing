const authService = require("./services/authService");
const bookingService = require("./services/bookingService");
const bookingData = require("./data/bookingData.json");

class BookerAPI {
  async createAuthToken(username = "admin", password = "password123") {
    this.authToken = await authService.createAuthToken(username, password);
    return this.authToken
  }

  async getBookings() {
    this.bookingsIds = await bookingService.getBookings();
    return this.bookingsIds
  }

  async getBookingById() {
    this.booking = await bookingService.getBookingById(bookingService.createdBookingId);
    return this.booking;
  }

  async createBooking() {
    const response = await bookingService.createBooking(bookingData);
    return { status: response.status, data: response.data, responseTime: response.responseTime };
}

  async DeleteBooking() {
    const response = await bookingService.deleteBooking(bookingService.createdBookingId);
    return { status: response.status, headers: response.headers };
  }
}

module.exports = new BookerAPI();