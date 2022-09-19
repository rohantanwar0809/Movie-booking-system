const jwt = require('jsonwebtoken');

const AuthMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Unauthorized request' });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send({ message: 'Unauthorized request' });
    }
    const payload = jwt.verify(token, 'secret');
    if (!payload) {
        return res.status(401).send({ message: 'Unauthorized request' });
    }
    req.user = payload;

    next();
};

const IsAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        return res.status(401).send({ message: 'Unauthorized request' });
    }
}


module.exports = { AuthMiddleware, IsAdmin }