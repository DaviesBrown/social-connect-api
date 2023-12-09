const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('AppController', () => {
  it('GET /status: should return status of server', (done) => {
    chai.request(app)
      .get('/status')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.eql({"status": "Server is running"});
        done();
      });
    });

    it('GET /stats: should return db stats', (done) => {
    chai.request(app)
      .get('/stats')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.eql({"db": true});
        done();
      });
  });

  it('should handle non-existent routes with status 404', (done) => {
    chai.request(app)
      .get('/nonexistent')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
