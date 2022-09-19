// express app
const express = require('express');
const cors = require('cors');
const morgan = require("morgan")
const { connectDB } = require('./config');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


// routes
app.use('/api', require('./routes'));



app.listen(port, () => {
    connectDB()
    console.log(`Example app listening at http://localhost:${port}`)
});



