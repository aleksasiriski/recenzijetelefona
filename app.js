if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')

const connectDB = require('./back/database')
connectDB()

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('./front'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// users
const userViewRoute = require("./back/views/user")
app.use("/", userViewRoute)
const userRoute = require("./back/controller/user")
app.use("/api", userRoute)

// phones
const phoneViewRoute = require("./back/views/phone")
app.use("/", phoneViewRoute)
const phoneRoute = require("./back/controller/phone")
app.use("/api", phoneRoute)

// start server
const port = 3000
app.listen(port, () => {
    console.log("Listening on port: " + port)
})