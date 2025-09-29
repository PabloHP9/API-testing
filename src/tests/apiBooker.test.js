const bookerAPI = require('../index');
const { bookingSchema } = require("../schemas/bookingSchema");


describe('Booker API test', () => {

    test('Generates a token successfully', async () => {
        const token = await bookerAPI.createAuthToken();
        expect(typeof token).toBe("string");
        expect(token.length).toBeLessThan(16);
        console.log("The token is", token);
    });

    test('Gets the booking ids', async () => {
        const bookings = await bookerAPI.getBookings();
        expect(typeof bookings).toBe("object");
        console.log(bookings);
    })

    test('Create a booking', async () => {
        const { status, data, responseTime }  = await bookerAPI.createBooking();
        expect(status).toBe(200);
        console.log("The status is", status);
        expect(responseTime).toBeLessThanOrEqual(300)
        console.log(data);
    });

    test('Gets booking by id parameter', async () => {
        const booking = await bookerAPI.getBookingById();
        const { error } = bookingSchema.validate(booking);
        if (error) {
            throw new Error(`Response schema validation failed: ${error.message}`);
        }
        console.log(booking);
    })

    test('delete a booking', async () => {
        const { status, headers } = await bookerAPI.DeleteBooking();
        expect(status).toBe(201);
        expect(headers).toHaveProperty("content-type");
        expect(headers).toHaveProperty("content-length");
        expect(headers).toHaveProperty("nel");
        console.log(headers);
        
    })
});