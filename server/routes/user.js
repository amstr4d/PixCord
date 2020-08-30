const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require('../middleware/auth');

const User = require("../models/user.model");

router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        console.log(user)
        res.send(user);
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
});

router.post('/register', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already registered.");

        user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();

        const token = user.generateAuthToken();
        res.status(200).send({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error on user register')
    }

});

router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).send("User doesn't exist");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
        return res.status(400).send("Incorrect Password !");

    const token = user.generateAuthToken();
    res.status(200).send({
        _id: user._id,
        username: user.username,
        email: user.email,
        token
    });
});

router.get('/all', async (req, res) => {
    let users = await User.find({}).select("-password");
    res.status(200).send(users);
})

module.exports = router;
