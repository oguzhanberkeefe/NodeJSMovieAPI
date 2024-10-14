const Directors = require("../models/Director");
const mongoose = require("mongoose");

const getAllDirectors = (req, res, next) => {
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
    });
};

const getDirectorDetails = (req, res, next) => {
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
                bio: '$_id.bio',
                movies: '$movies',
            }
        }
    ]);
    promise.then(result => {
        if (!result) return res.status(404).send('No directors found');
        res.status(200).json(result[0]);
    }).catch((err) => {
        next(err);
    })
};

const createNewDirector = (req, res, next) => {
    const director = new Directors(req.body);
    const promise = director.save();
    promise.then(result => {
        if (!result) return res.status(404).send('No directors found');
        res.status(200).json(result);
    }).catch((err) => {
        next(err);
    });
};

const updateDirectorById = (req, res, next) => {
    const promise = Directors.findByIdAndUpdate(req.params.director_id, req.body, {
        new: true
    });
    promise.then((result) => {
        if (!result) return res.status(404).send('No directors found');
        res.status(200).json(result);
    }).catch((err) => {
        next(err);
    });
};

const deleteDirectorById = (req, res, next) => {
    const promise = Directors.findByIdAndDelete(req.params.director_id);
    promise.then((result) => {
        if (!result) return res.status(404).send('No directors found');
        res.status(200).json({status: 1});
    }).catch((err) => {
        next(err);
    });
};

module.exports = {
    getAllDirectors,
    getDirectorDetails,
    createNewDirector,
    updateDirectorById,
    deleteDirectorById
}