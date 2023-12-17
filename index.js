const express = require('express')
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect')
app.use(express.json())
const uri = process.env.MONGO_URI
const User = require('./models/User')
const authRoutes = require('./routes/authRoutes')
const authRequire = require('./middleware/authRequire')

app.use(authRoutes)
app.use(authRequire)

app.get('/', authRequire, (req, res) => {
    res.send(`Your email is ${req.user.email}`)
})

const PORT = process.env.PORT || 5000
const start = async (uri) => {
    try {
        await connectDB(uri);
        app.listen(PORT, (req, res) => {
            console.log(`Server listening on port ${PORT}`);
        })
    }
    catch (err) {
        console.log(err);
    }
}

start()