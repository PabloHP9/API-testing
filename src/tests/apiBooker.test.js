const bookerAPI = require('../apis/bookerAPI');

describe('Booker API test', () => {

    test('Generates a token successfully', async () => {
      await bookerAPI.createAuthToken();
      await bookerAPI.checkToken();
    });

    test('Gets the booking ids', async () => {
        await bookerAPI.getBookings();
        await bookerAPI.checkGetBookingsRequest();
    })

    test('Create a booking', async () => {
        await bookerAPI.createBooking();
        await bookerAPI.checkCreateStatus();
    })

    test('Gets booking by id parameter', async () => {
        await bookerAPI.getBookingById();
        await bookerAPI.checkGetBookingByIdRequest();
    })

    test('delete a booking', async () => {
        await bookerAPI.DeleteBooking();
        await bookerAPI.checkDeleteHeaders();
    })
});