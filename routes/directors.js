const express = require('express');
const router = express.Router();

// Models
const Directors = require('../models/Director');

router.get('/', (req, res,next) => {
    const promise = Directors.find({});
    promise.then(result => {
        if(!result) return res.status(404).send('No directors found');
        res.status(200).json(result);
    }).catch((err) => {
        next(err);
    });
});

router.post('/', (req,res,next) => {
   const director = new Directors(req.body);
   const promise = director.save();
    promise.then(result => {
        if(!result) return res.status(404).send('No directors found');
        res.status(200).json(result);
    }).catch((err) => {
        next(err);
    });
});


module.exports = router;