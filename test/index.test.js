const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app.js');

chai.use(chaiHttp);

describe('Test Index Page', () => {
    it('(GET /) Returned Index Page', (done) => {
        chai.request(server).get('/').end((err, res) => {
            res.should.have.status(200);
            if (err) return done(err); // Hata durumunda done() ile hata ilet
            done();
        });
    });
});
