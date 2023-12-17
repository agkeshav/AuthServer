const mongoose = require('mongoose')

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected To Database'))
        .catch((err) => console.log(err));
}

module.exports = connectDB;