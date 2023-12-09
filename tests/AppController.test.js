const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Sprint 1: Project Setup - Basic Server', () => {
  it('Server should return status 200 on root endpoint', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Server should return "Server running" message on root endpoint', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.text).to.equal('Server running on port 3000');
        done();
      });
  });

  it('Server should handle non-existent routes with status 404', (done) => {
    chai.request(app)
      .get('/nonexistent')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
