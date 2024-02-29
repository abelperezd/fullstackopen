const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    console.log("hi0");
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    console.log("hi");
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    console.log("hi2");
    // token expires in 60*60 seconds, that is, in one hour
    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60 * 60 }
    )
    console.log("hi3");

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter