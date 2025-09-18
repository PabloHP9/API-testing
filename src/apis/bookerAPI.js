const axios = require('axios');

class BookerAPI {
    constructor() {
        this.client = axios.create({
            baseURL: 'https://restful-booker.herokuapp.com',
            timeout: 5000
        });
    }

    get authToken() {
        return this.token
    }

    get bookingsIds() {
        return this.object
    }

    get booking() {
        return this.idObject
    }

    get createStatus() {
        return this.createResponse
    } 

    get createData() {
        return this.responseData
    }

    get createdBookingId() {
        return this.responseData.bookingid
    }

    get deletestatus() {
        return this.delete
    }

    async createAuthToken(username = 'admin', password = 'password123') {
        const response = await this.client.post('/auth', {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.token = response.data.token;
    }

    async getBookings() {
        const response = await this.client.get('/booking');

        this.object = response.data;
    }

    async getBookingById() {
        const response = await this.client.get(`/booking/${this.createdBookingId}`,{
            headers: {
                'Accept': 'application/json'
            }
        } );

        this.idObject = response.data;
    }

    async createBooking() {
        const response = await this.client.post('/booking', {
            firstname: 'Kevin',
            lastname: 'Levin',
            totalprice: 112,
            depositpaid: true,
            bookingdates: { checkin: '2018-02-01', checkout: '2019-03-01' },
            additionalneeds: 'Lunch'
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        this.responseData = response.data;
        this.createResponse = response.status;      
    }

    async DeleteBooking() {
        const response = await this.client.delete(`/booking/${this.createdBookingId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${this.authToken}`

            }
        } );

        this.delete = response.headers;
    }

    async checkGetBookingsRequest() {
        expect(typeof (this.bookingsIds)).toBe('object')
        console.log(this.bookingsIds);
    }

    async checkGetBookingByIdRequest() {
        expect(this.booking).toHaveProperty('firstname');
        expect(this.booking).toHaveProperty('lastname');
        expect(this.booking).toHaveProperty('totalprice');
        expect(this.booking).toHaveProperty('depositpaid');
        expect(this.booking).toHaveProperty('bookingdates');
        expect(this.booking).toHaveProperty('additionalneeds');
        console.log(this.booking)
    }

    async checkCreateStatus() {
        expect(this.createStatus).toBe(200);
        console.log('the status is',this.createStatus);
        console.log(this.createData);
    }

    async checkDeleteHeaders() {
        expect(this.deletestatus).toHaveProperty('content-length');
        expect(this.deletestatus).toHaveProperty('content-type');
        expect(this.deletestatus).toHaveProperty('nel')
        console.log(this.deletestatus);
    }

    async checkToken() {
        expect(this.authToken.length).toBeLessThan(16);
        console.log('the token is', this.authToken);
    }

    
}

module.exports = new BookerAPI();