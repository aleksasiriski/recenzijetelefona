const express = require("express")
const router = express()
const phone = require("../model/phone")
const check = require("./authentication")

router.get("/phones", async (req, res) => {
    try {
        const allPhones = await phone.find()
        res.status(200).json({
            success: true,
            phones: allPhones
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
})
router.get("/phones/:id", async (req, res) => {
    try {
        const id = req.params.id
        const specificPhone = await phone.findById(id)
        res.status(200).json({
            success: true,
            phone: specificPhone
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
})
router.post("/phones", check.isAuthenticated, async (req, res) => {
    try {
        const newPhone = new phone(req.body)
        const savedPhone = await newPhone.save()
        res.status(200).json({
            success: true,
            phone: savedPhone
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
})
router.put("/phones", check.isAuthenticated, async (req, res) => {
    try {
        phone.findByIdAndUpdate(req.body._id, req.body, (err, doc) => {
            if (err) {
                console.log('Error during record updates: ' + err)
            }
        })
        res.status(200).json({
            success: true
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
})
router.delete("/phones/:id", check.isAuthenticated, async (req, res) => {
    try {
        const id = req.params.id
        const specificPhone = await phone.findById(id)
        const deletedPhone = await specificPhone.delete()
        res.status(200).json({
            success: true,
            phone: deletedPhone
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router