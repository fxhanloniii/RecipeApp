const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

//authentication
router.post('/login', async(req, res, next) => {
    try {
        let user;
        const userExists = await User.exists({email: req.body.email});
        if(userExists) {
            user = await User.findOne({email: req.body.email})
        } else {
            return res.redirect('/login')
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if(match) {
            req.session.currentUser = {
                id: user._id,
                username: user.username
            }
            res.redirect('/')
        } else {
            res.redirect('/login')
        }
    } catch(err) {
        next();
    };
})

// Add Sign Up Link/Button
router.post('/signup', async(req,res,next) => {
    try {
        const newUser = req.body;
        const rounds = process.env.SALT_ROUNDS;
        const salt = await bcrypt.genSalt(parseInt(rounds));
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        await User.create(newUser);
        res.redirect('/login');
    } catch(err) {
        next();
    };
});

// Add Logout Link 
router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
