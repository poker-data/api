const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const loginUser = async (req) => {
    const user = await User.findOne({ email: req.body.email });
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
            email: user.email, admin: user.admin, 
            level: user.playerLevel, token: token }

    return ({ token: token , user: formatedUser })
}

module.exports = {
    loginUser
}