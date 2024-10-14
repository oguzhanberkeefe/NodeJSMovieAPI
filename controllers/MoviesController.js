const Movie = require("../models/Movie");
const getAllMovies = (req, res, next) => {
    const promise = Movie.aggregate([
        {
            $lookup: {
                from: 'directors',
                localField: 'director_id',
                foreignField: '_id',
                as: 'Director'
            }
        },
        {
            $unwind: '$Director'
        },
    ]);
    promise.then((movies) => {
        if (!movies) return res.status(404).send('No movies found');
        res.status(200).json(movies);
    }).catch((err) => {
        next(err);
    });
};

const getTop3Movies = (req, res, next) => {
    const promise = Movie.find({}).limit(3).sort({imdb_score: -1});
    promise.then((movies) => {
        if (!movies) return res.status(404).send('No movies found');
        res.status(200).json(movies);
    }).catch((err) => {
        next(err);
    });
};

const getMoviesBetweenStartYearEndYear = (req, res, next) => {
    const {start_year, end_year} = req.params;
    const promise = Movie.find({year: {"$gte": parseInt(start_year), "$lte": parseInt(end_year)}}); // eğer lt ve gt yaparsan o tarihi dahil etmez. örneğin 1980 2000 yazıyorsak 1980 olanları vermez. 1981 den başlar gibi.
    promise.then((movies) => {
        if (!movies) return res.status(404).send('No movies found');
        res.status(200).json(movies);
    }).catch((err) => {
        next(err);
    })
};

const getMoviesById = (req, res, next) => {
    const promise = Movie.findById(req.params.movie_id);
    promise.then((movies) => {
        if (!movies) return res.status(404).send('No movies found');
        res.status(200).json(movies);
    }).catch((err) => {
        next(err);
    });
};

const updateMoviesByID = (req, res, next) => {
    const promise = Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body,
        {
            new: true
        }
    );
    promise.then((result) => {
        if (!result) return res.status(404).send('No movies found');
        res.status(200).json(result);
    }).catch((err) => {
        next(err);
    });
};

const deleteMoviesById = (req, res, next) => {
    const promise = Movie.findByIdAndDelete(req.params.movie_id);
    promise.then((result) => {
        if (!result) return res.status(404).send('No movies found');
        res.status(200).json({status: 1});
    }).catch((err) => {
        next(err);
    });
};

const createMovies = async (req, res, next) => {
    const movie = new Movie(req.body);
    const promise = movie.save();
    promise.then((result) => {
        if (!result) return res.status(404).send('Not Found');
        res.status(200).json(result);
    }).catch((err) => {
        next(err); // Hata oluşursa middleware'e yönlendir
    });
    /*
   const { title, imdb_score, category, country, year } = req.body;
   const movie = new Movie({
     title: title,
     imdb_score: imdb_score,
     category: category,
     country: country,
     year: year,
   });
      try {
      const result = await movie.save();
      if (!result) return res.status(404).send('404 Hata');
      res.json(result);
    } catch (err) {
      console.log('Hata',err);
      res.status(400).send('Bad Request');
      res.json(err);
    }
    */
};

module.exports = {
    getAllMovies,
    getTop3Movies,
    getMoviesBetweenStartYearEndYear,
    getMoviesById,
    updateMoviesByID,
    deleteMoviesById,
    createMovies
}