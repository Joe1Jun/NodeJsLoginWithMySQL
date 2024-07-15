
const express = require("express");
const authController = require("../controllers/auth.js");
const router = express.Router();




router.get("/", authController.isLoggedIn, (req, res) => {

    
    res.render("index", {
        user: req.user
    });
})

router.get("/register", (req, res) => {

    res.render("register");
})



router.get("/login", (req, res) => {

    res.render("login");
})

//middleware importing file from auth.js and using the function
// next function makes sure page is rendered
router.get("/profile", authController.isLoggedIn, (req, res) => {
    if (req.user) {
        
        res.render("profile", {
            user: req.user
        });
       
    }
    else {
        
        res.redirect("/login")
    }
})

module.exports = router;