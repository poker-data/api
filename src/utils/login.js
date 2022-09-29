const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const loginUser = async (req) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return false;

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return false

    // create token
    const token = jwt.sign({
        name: user.name,
        id: user._id,
        mail: user.email
    }, process.env.TOKEN_SECRET)

    const formatUser = { _id: user._id, name: user.name, email: user.email, role: user.role }

    return ({ token: token, user: formatUser })
}

module.exports = {
    loginUser
}