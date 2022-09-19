const Booking = require('../models/booking.model');

const validateBookingBody = (body) => {
    if (!body.city || !body.movie || !body.time || !body.date) {
        return false;
    }
    return true;
}



class BookingController {

    async getBookings(req, res) {
        try {
            const bookings = await Booking.find();
            return res.status(200).send(bookings);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    async createBooking(req, res) {
        if (!validateBookingBody(req.body)) {
            return res.status(400).send({ message: 'Invalid request' });
        }
        try {
            const user = req.user;
            req.body.user = user._id
            const booking = new Booking(req.body);
            await booking.save();
            return res.status(200).send(booking);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    async getBooking(req, res) {
        if (!req.params.id) {
            return res.status(400).send({ message: 'Invalid request' });
        }

        try {
            const booking = await Booking.findById(req.params.id).populate('movie').populate('city');
            return res.status(200).send(booking);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    async getBookingsByDate(req, res) {
        if (!req.params.date) {
            return res.status(400).send({ message: 'Invalid request' });
        }

        try {
            const bookings = await Booking.find({ date: req.params.date }).populate('movie').populate({
                path: 'city', populate: {
                    path: "runningMovies",
                    populate: {
                        path: "movie",
                        select: "-__v"
                    }
                }
            }).populate('user');
            return res.status(200).send(bookings);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

const bookingController = new BookingController();

module.exports = bookingController;