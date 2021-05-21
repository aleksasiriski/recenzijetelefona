const express = require("express")
const router = express()
const check = require("../controller/authentication")

router.get('/login', check.isNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})
router.get('/register', check.isNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

module.exports = router