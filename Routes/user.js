const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/userModel');

const { validateName, validateEmail, validatePassword } = require('../utils/validators');

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, isSeller } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(403).json({ err: "user already exists" });
        }

        if (!validateName(name)) {
            return res.status(400).json({ err: "Name Validate fails" });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ err: "Email Validate fails" });
        }
        if (!validatePassword(password)) {
            return res.status(400).json({ err: "Password Validate Fails" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, (saltOrRounds=10));
        const user = {
            email,
            name,
            isSeller,
            password: hashedPassword
        };
        const createUser = await User.create(user);
        return res.status(201).json({
            message: `Welcome ${createUser.name}`
        })
    } catch (err) {
        return res.status(500).send(err);
     }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email.length === 0) {
            return res.status(400).json({
                err: "Please provide email"
            });
        }
        if (password.length === 0) {
            return res.status(400).json({
                err: "Please provide password"
            });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(404).json({
                err: "User not found"
            });
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(400).json({
                err: "email or password mismatch"
            });
        }
        const payload = { user: { id: existingUser.id } };
        const bearerToken = await jwt.sign(payload, "SECRET MESSAGE", {
            expiresIn: 35000,
        });
        res.cookie('t', bearerToken, { expire: new Date() });
        return res.status(200).json({ bearerToken });
    } catch (err) {
        console.log("Error while signin", err);
        res.status(500).send(err);
    }
});

router.get('/signout', async (req, res) => {
    try {
        res.clearCookie('t'); // t is taken as key if cookie
        return res.status(200).json({message:"Cookie deleted"})
    } catch (err) {
        console.log("Error in signout", err);
        res.status(500).send(err);
    }
})

module.exports = router;