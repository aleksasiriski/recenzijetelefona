if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express")
const router = express()
const passport = require('passport')
const methodOverride = require('method-override')
const user = require("../model/user")
const check = require("./authentication")

passport.use(user.createStrategy())
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())
router.use(methodOverride('_method'))

router.get('/user', check.isAuthenticated, (req, res) => {
    res.status(200).json({
        success: true,
        username: req.session.passport.user
    })
})
router.post('/login', check.isNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))
router.post('/register', check.isNotAuthenticated, async (req, res) => {
    try {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        const User = new user({
            username: username,
            email: email
        })
        await User.setPassword(password)
        await User.save()

        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

router.delete('/logout', check.isAuthenticated, (req, res) => {
    req.logOut()
    res.redirect('/login')
})

module.exports = router