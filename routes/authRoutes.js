const express = require('express')
const User = require('../models/User')
const route = express.Router();
const jwt = require('jsonwebtoken')


route.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password })
        const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY")
        res.send({ token })
        // res.status(200).json({ sucess: true, msg: 'Successfully registered' })
    }
    catch (err) {
        res.status(500).json({ success: false, msg: err })
    }
})
route.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ success: false, msg: 'Please provide email or password' })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(422).json({ success: false, msg: 'Email Does Not Exist' })
        }
        try {
            await user.comparePassword(password)
            const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY")
            res.send({ token })
        }
        catch (err) {
            return res.status(422).json({ success: false, msg: 'Wrong Password' })
        }

    }
    catch (err) {
        res.status(500).json({ success: false, msg: err })
    }
})







module.exports = route;