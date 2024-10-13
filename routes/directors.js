const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Models
const Directors = require('../models/Director');

router.get('/', (req, res, next) => {
    const promise = Directors.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                },

                movies: {
                    $push: '$movies',
                }
            },
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies',
            }
        }
    ]);
    promise.then(result => {
        if (!result) return res.status(404).send('No directors found');
        res.status(200).json(result);
    }).catch((err) => {
        next(err);
    })
});

router.post('/', (req, res, next) => {
    const director = new Directors(req.body);
    const promise = director.save();
    promise.then(result => {
        if (!result) return res.status(404).send('No directors found');
        res.status(200).json(result);
    }).catch((err) => {
        next(err);
    });
});

router.get('/:director_id', (req, res, next) => {
    const promise = Directors.aggregate([
        {
          $match: {
              '_id': new mongoose.Types.ObjectId(req.params.director_id)
          }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                },

                movies: {
                    $push: '$movies',
                }
            },
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies',
            }
        }
    ]);
    promise.then(result => {
        if (!result) return res.status(404).send('No directors found');
        res.status(200).json(result);
    }).catch((err) => {
        next(err);
    })
});

module.exports = router;