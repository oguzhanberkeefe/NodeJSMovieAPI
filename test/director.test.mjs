import { use, expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../app.js';
const chai = use(chaiHttp)
const should = chai.should();

let token, directorID;

describe('/api/directors Methods', () => {
    before((done) => {
        chai.request(server)
            .post('/login')
            .send({
                username: 'yerlikacovv',
                password: '12345678'
            })
            .end((err, res) => {
                if (err) return done(err); // Hata durumunda done() ile hata ilet
                token = res.body.token;
                console.log(token);
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
    describe('Get Method /api/directors', () => {
        it('it should get all directors', (done) => {
            chai.request.execute(server)
                .get('/api/directors')
                .set('x-access-token', token)
                .end((err, res) => {
                    if (err) return done(err); // Hata durumunda done() ile hata ilet
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('Post Method /api/directors', () => {
        it('it should post a new director', (done) => {
            const director = {
              name: "John",
              surname: "Doe",
                bio: "Test Director Bio"
            };
            chai.request.execute(server)
                .post('/api/directors')
                .send(director)
                .set('x-access-token', token)
                .end((err, res) => {
                    if (err) return done(err); // Hata durumunda done() ile hata ilet
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('bio');
                    directorID = res.body._id;
                    done();
                });
        });
    });
    describe('Get Method /api/directors/:director_id', () => {
        it('it should get a director details', (done) => {
            chai.request.execute(server)
                .get('/api/directors/' + directorID)
                .set('x-access-token', token)
                .end((err, res) => {
                    if (err) return done(err); // Hata durumunda done() ile hata ilet
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('bio');
                    res.body.should.have.property('movies').be.a('array');

                    // Burada movies dizisinin her bir elemanını kontrol edelim
                    res.body.movies.forEach(movie => {
                        movie.should.have.property('_id');
                        movie.should.have.property('director_id').eql(directorID);
                        movie.should.have.property('title');
                        movie.should.have.property('category');
                        movie.should.have.property('country');
                        movie.should.have.property('year');
                        movie.should.have.property('imdb_score');
                    });
                    res.body.should.have.property('_id').eql(directorID);
                    done();
                });
        });
    });
    describe('Put Method /api/directors/:director_id', () => {
        const director = {
            name: "Jane",
            surname: "Doe",
            bio: "Test Updated Director Bio"
        };
        it('it should Update a director details', (done) => {
            chai.request.execute(server)
                .put('/api/directors/'+directorID)
                .set('x-access-token', token)
                .send(director)
                .end((err, res) => {
                    if (err) return done(err); // Hata durumunda done() ile hata ilet
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(director.name);
                    res.body.should.have.property('surname').eql(director.surname);
                    res.body.should.have.property('bio').eql(director.bio);
                    done();
                });
        });
    });
    describe('Delete Method /api/directors/:director_id', () => {
        it('it should DELETE a director', (done) => {
            chai.request.execute(server)
                .delete('/api/directors/'+directorID)
                .set('x-access-token', token)
                .end((err, res) => {
                    if (err) return done(err); // Hata durumunda done() ile hata ilet
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });
});