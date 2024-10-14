import { use, expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../../app.js';
const chai = use(chaiHttp)
const should = chai.should();

let token, movieID;

describe('/api/movies test',  () => {
    before((done) => {
     chai.request.execute(server)
            .post('/login')
            .send({
                username: 'yerlikacovv',
                password: '12345678'
            })
            .end((err, res) => {
                token = res.body.token;
                console.log(token);
                done();
            });

    });
    describe('/GET Movies', () => {
        it('it should GET all the movies', (done) => {
            chai.request.execute(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('/POST Movies', () => {
        it('it should POST a movie', (done) => {
            const movie = {
                title: 'unit test movie',
                director_id: '670bf65936430c835ea37a82',
                category: 'Horror',
                country: 'Turkey',
                year: 1950,
                imdb_score: 8
            };
            chai.request.execute(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    movieID = res.body._id;
                    done();
                });
        });
    });
    describe('/GET/:movie_id movie', () => {
        it('it should GET a movie by the given id', (done) => {
            chai.request.execute(server)
                .get('/api/movies/'+movieID)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movieID);
                    done();
                });
        });
    });
    describe('/PUT/:movie_id movie', () => {
        it('it should UPDATE a movie given by id', (done) => {
            const movie = {
                title: 'unit test updated movie',
                director_id: '670bf65936430c835ea37a12',
                category: 'Crime',
                country: 'France',
                year: 1970,
                imdb_score: 4
            };
            chai.request.execute(server)
                .put('/api/movies/' + movieID)
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    if (err) {
                        console.log('Hata:', err);
                    }
                    console.log('Yanıt:', res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                    done();
                });
        });
    });
});

describe('/DELETE/movie_id movie', () => {
    it('it should DELETE a movie given by id', (done) => {
        chai.request.execute(server)
            .delete('/api/movies/'+movieID)
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(1);
                done();
            });
    });
});



