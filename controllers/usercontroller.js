const user = require("../models/user");

const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
//const user = require("../models/user");

//user signup
router.post("/create", (req, res) => {
    User.create({
      userName: req.body.user.userName,
      password: bcrypt.hashSync(req.body.user.password, 10)
    })
    .then(
        function createSuccess(user) {
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
        res.json({
            user: user,
            message: 'Account successfully created!',
            sessionToken: token
        });
    }
    )
    .catch(err => res.status(500).json({error: err}))
    // .then(
    //   createSuccess = (user) => {
    //     let token = jwt.sign({ id: user.id }, "i_am_secret", { expiresIn: 60 * 60 * 24 })
    //     res.json({
    //       user: user,
    //       message: 'user created',
    //       sessionToken: token
    //     })
    //   },
    //   createError = err => res.status(500).send({error: 'SignUp has Failed'})
    // )
});
//user login
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            userName: req.body.user.userName
        }

    })
    .then(function loginSuccess(user){
        if (user) {
        bcrypt.compare(req.body.user.password, user.password, function(err, matches){
            if (matches) {
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 *60*24})
        res.status(200).json({
            user:user,
            message: "User successfully logged in!",
            sessionToken: token
        })
    } else {
        res.status(502).send({error: "login failed"});
    }
    });
    } else {
        res.status(500).json({ error: 'Username does not exist.'})
    }
})
    .catch(err => res.status(500).json({ error: err}))
});


module.exports = router;
