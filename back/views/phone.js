const express = require("express")
const router = express()
const check = require("../controller/authentication")

router.get('/', (req, res) => {
    res.render('index.ejs')
})
router.get('/phone', check.isAuthenticated, (req, res) => {
    res.render('phone.ejs')
})
router.get('/createPhone', check.isAuthenticated, (req, res) => {
    res.render('createPhone.ejs')
})

module.exports = router