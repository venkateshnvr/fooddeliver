const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

function verifyToken(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
      }
    const token = req.headers['x-access-token'];
    if(!token) return res.status(403).send({message: "no token"})
    jwt.verify(token, process.env.SECREAT_KEY, function(err, decoded){
        if(err) return res.status(500).json({message: "failed token"})
        req.userId = decoded.id;
        next()
    })
    // next()
}

module.exports = {
    verifyToken
}