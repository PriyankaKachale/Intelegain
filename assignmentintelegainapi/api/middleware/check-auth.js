const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
         const token = req.headers['access-token'];
         const decoded = jwt.verify(token, 'secret');
         req.userData = decoded;
         next(); // if we successfullt authenticate
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: 'Auth failed----'
        })
    }
}