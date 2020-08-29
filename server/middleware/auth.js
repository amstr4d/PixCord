const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send("Invalid token.");
    }
};
