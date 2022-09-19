const { authController } = require("./controllers/auth.controller")
const bookingController = require("./controllers/booking.controller")
const cityController = require("./controllers/city.controller")
const movieController = require("./controllers/movie.controller")
const { AuthMiddleware, IsAdmin } = require("./middleware")

const Router = require("express").Router


const router = Router()


// public routes

router.post("/login", authController.login)
router.post("/register", authController.register)


// auth routes
router.use(AuthMiddleware)
router.get('/cities', cityController.getCities)
router.get("/movies", movieController.getMovies)

router.get("/booking/:id", bookingController.getBooking)
router.post('/booking/create', bookingController.createBooking)

// admin routes
router.use(IsAdmin)
router.post('/add-movie', cityController.addMovie)
router.get("/movie/:id", movieController.getMovie)
router.post("/filter-movies", movieController.filterMovies)
router.get("/movies-by-city/:id", movieController.getMoviesByCity)
router.get("/city-by-movie/:id", movieController.getCityByMovie)
router.get("/bookings-by-date/:date", bookingController.getBookingsByDate)



module.exports = router


