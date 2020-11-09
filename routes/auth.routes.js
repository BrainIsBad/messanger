const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')

const User = require('../models/User')

const router = Router()

router.post('/register', [
    check('email', 'Incorrect email').isEmail(),
    check('username', 'Enter username').trim().isLength({min: 2}),
    check('password', 'Min length of password is 6 chars').trim().isLength({min: 6})
], async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(401).json({
                errors: errors.array(),
                message: 'Validation failed'
            })
        }

        const {email, username, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate) {
            res.status(400).json({
                message: 'Email already used'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({email, username, hashedPassword})


        user.save()

        res.status(201).json({
            message: 'User created', success: true
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong, try later'})
    }
})

router.post('/login', [
    check('email', 'Enter correct email').isEmail(),
    check('password', 'Enter password').trim().isLength({min: 6})
], async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(401).json({
                errors: errors.array(),
                message: 'Validation failed'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message: 'Incorrect email or password'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'Incorrect email or password'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '4h'}
        )

        res.json({token, userId: user.id})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong, try later'})
    }
})

module.exports = router

