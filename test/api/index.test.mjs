import { use, expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../../app.js';
const chai = use(chaiHttp)
const should = chai.should();

describe('Test Index Page', () => {
    it('(GET /) Returned Index Page', (done) => {
        chai.request.execute(server).get('/').end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
