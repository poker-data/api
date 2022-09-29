const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    try {
        const token = req.header('auth-token')
        if (!token) return res.status(401).json({ ok: false, info: 'Access denied' })
        next() 
    } catch (error) {
        res.status(498).json({ ok: false, info: 'Invalid token' })
    }
}

module.exports = { verifyToken };