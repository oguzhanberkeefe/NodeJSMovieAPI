[![Build Status](https://api.travis-ci.com/oguzhanberkeefe/NodeJSMovieAPI.svg?token=qsnFCQJTYdQwJGVZmMFW&branch=main&status=passed)](https://app.travis-ci.com/github/oguzhanberkeefe/NodeJSMovieAPI/builds/272735509?serverType=git)

# NodeJSMovieAPI

Bu Repoda NodeJS, Express ve MongoDB ile RestAPI Geliştirdim

# Movies

| Route                                     | HTTP Verb  | POST body  | Description  |
|-------------------------------------------| --- | --- | --- |
| /api/movies                               | `GET` | Empty | List all movies. |
| /api/movies                               | `POST` | {'title':'foo', 'category':'bar', 'country':'Turkey', year:1990, director:"id", imdb_score: 9.7 } | Create a new movie. |
| /api/movies/:movie_id                     | `GET` | Empty | Get a movie. |
| /api/movies/:movie_id                     | `PUT` | {'name':'foo', 'surname':'bar'} | Update a movie with new info. |
| /api/movies/:movie_id                     | `DELETE` | Empty | Delete a movie. |
| /api/movies/top3                          | `GET` | Empty | Get the top 10 movies. |
| /api/movies/between/:start_year/:end_year | `GET` | Empty | Movies between two dates. |

# Directors

| Route | HTTP Verb  | POST body  | Description  |
| --- | --- | --- | --- |
| /api/directors | `GET` | Empty | List all directors. |
| /api/directors | `POST` | { name: 'foo', surname:'bar', bio:'lorem ipsum' } | Create a new director. |
| /api/directors/:director_id | `GET` | Empty | Get a director. |
| /api/directors/:director_id | `PUT` | {'name':'foo', 'surname':'bar', 'bio': 'lorem'} | Update a director with new info. |
| /api/directors/:director_id | `DELETE` | Empty | Delete a director. |
# Index

| Route     | HTTP Verb  | POST body  | Description  |
|-----------| --- | --- | --- |
| /register | `POST` | { username: 'foo', password:'1234' } | Create a new user. |
| /login    | `POST` | { username: 'foo', password:'1234' } | Generate a token. |

