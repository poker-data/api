const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const loginUser = async (req) => {
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({ email: email });
    if (!user) return false;

    const originalPassword = req.body.password;
    const hashedPassword = user.password;
    
    const validPassword = await bcrypt.compare(originalPassword, hashedPassword);

    if (!validPassword) return false

    // create token
    const userToToken = {
        name: user.name,
        id: user._id,
        mail: user.email
    }
    const secret = process.env.TOKEN_SECRET
    
    const token = jwt.sign(userToToken, secret)

    const formatedUser = { 
            _id: user._id, name: user.name, 
            email: user.email,
            shkUsername: user.shkUsername, admin: user.admin, 
            level: user.playerLevel, country: user.country, token: token }

    return ({ token: token , user: formatedUser })
}

module.exports = {
    loginUser
}