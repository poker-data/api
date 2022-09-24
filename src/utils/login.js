const User = require('../models/User');
const jwt = require('jsonwebtoken');


const loginUser = async ( req ) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return false;

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return false

// create token
const token = jwt.sign({
    name: user.name,
    id: user._id
    }, process.env.TOKEN_SECRET)
 return ({token: token, user: user})
}

module.exports = {
    loginUser
}