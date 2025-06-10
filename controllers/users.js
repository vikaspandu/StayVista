const User = require("../models/user.js");


module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async(req, res) => {
    try{
        let { username, email, password } = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => { // login method ko hum isliye use kar rahe hai taki, user sign up karne ke bad automatic login ho jaye.
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to WelcomeHome");
            return res.redirect("/listings")
        });
        // console.log(registeredUser)
        // req.flash("success", "Welcome to WelcomeHome");
        // res.redirect("/listings")
    }
    catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) => {
    req.flash("success", "welcomeback to WelcomeHome");
    let redirectUrl = res.locals.redirectUrl || "/listings"; // ye agar samajh nahi aa raha hai to module: 57 --> video no. 5 dekho
    res.redirect(redirectUrl);
}
// Note: user ko jo authenticate karne ka kam hai, authenticate yani --> login ke liye ye identify karna ki user pahle se hamare database ke ander tha ya nahi tha --> ye sara kam hamare liye passport karke dega aur authenticate() passport ka hi method hai.



module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "you are logged out now")
        res.redirect("/listings")
    })
};
