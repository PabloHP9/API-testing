const { apiRequest } = require("../helpers/bookerApiHelper");
const { bookingSchema } = require("../schemas/bookingSchema");

class BookingService {
  constructor(authService) {
    this.authService = authService;
    this.createdBookingId = null;
  }

  async getBookings() {
    const response = await apiRequest("GET", "/booking");
    return response.data;
  }

  async getBookingById(id) {
    const response = await apiRequest("GET", `/booking/${id}`, {}, {
      Accept: "application/json",
    });

    return response.data; 
  }

  async createBooking(bookingData) {
    const response = await apiRequest(
      "POST",
      "/booking",
      bookingData,
      { "Content-Type": "application/json" }
    );

    this.createdBookingId = response.data.bookingid;
    return response; 
  }

  async deleteBooking(id) {
    const token = this.authService.getToken(); 
    const response = await apiRequest(
      "DELETE",
      `/booking/${id}`,
      {},
      {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      }
    );
    return response; 
  }
}

module.exports = new BookingService(require("./authService"));