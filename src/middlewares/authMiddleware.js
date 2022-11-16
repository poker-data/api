const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    let verified
    try {
        const token = req.header('token')
        verified = jwt.verify(token, process.env.TOKEN_SECRET)
        next() 
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {

            res.status(498).json({ ok: false, info: 'Invalid token' })
		}
		// otherwise, return a bad request error
		return res.status(400)
    }
}

module.exports = { verifyToken };