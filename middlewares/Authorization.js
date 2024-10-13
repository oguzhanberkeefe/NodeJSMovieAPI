const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token =
        req.headers['x-access-token'] ||
        req.body.token ||
        req.query.token;
    if (!token) return res.status(404).send('Authenticated failed, No Token Provided');
    jwt.verify(token, req.app.get('api_secret_key'),(err,decoded) => {
        if (err) return res.status(401).send('Authenticated failed, Invalid Token or Expired!');
        req.decode = decoded;
        next();
    })
};