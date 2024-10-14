const bcrypt = require("bcryptjs");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");

const getIndexPage = (req, res, next) => {
    res.render('index', {title: 'Express'});
};

const registerUser = (req, res, next) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then(hash => {
        const user = new Users({
            username,
            password: hash
        });
        const promise = user.save();
        promise.then((result) => {
            if (!result) return res.status(404).send('Not Found');
            res.status(200).json(result);
        }).catch((err) => {
            next(err);
        });
    });
};

const loginUser = (req, res, next) => {
    const {username, password} = req.body;
    Users.findOne({
        username
    }).then((user) => {
        if (!user) return res.status(404).send('Authenticated failed, User Not Found !');
        bcrypt.compare(password, user.password).then((result) => {
            if (!result) return res.status(401).send('Authenticated failed, Username or Password doesnt match!');
            const payload = {
                username
            };
            const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                expiresIn: 720
            });
            res.status(200).json({token});
        });

    }).catch((err) => {
        next(err);
    });
};

module.exports = {
    getIndexPage,
    registerUser,
    loginUser
}