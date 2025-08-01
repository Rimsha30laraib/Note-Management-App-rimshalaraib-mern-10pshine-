//  run using this command : npm run test:users
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const userModel = require('../models/User');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);
const { expect } = chai;

describe("User API Tests", function () {
  this.timeout(10000);

  const testUser = {
    username: "TestUser", 
    email: "test12.user@gmail.com",
    password: "test123"
  };

  let token = '';

  before(async () => {
    await userModel.deleteMany({ email: testUser.email }); 
  });

  it("should create a new user", done => {
    chai.request(app)
      .post('/api/auth/signup')
      .send({
        username: testUser.username,
        email: testUser.email,
        password: testUser.password
      })
      .end((err, res) => {

        expect(res).to.have.status(201);
       
        expect(res.body).to.have.property('username');
expect(res.body).to.have.property('token');

        done();
      });
  });

  it("should login the user and return a token", done => {
    chai.request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        token = res.body.token;
        done();
      });
  });

  it("should return the user info", done => {
    chai.request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('email', testUser.email);
        done();
      });
  });

  it("should reset the password", async () => {
    // manually set reset token
    await userModel.updateOne({ email: testUser.email }, {
      resetToken: '654321',
      resetTokenExpiry: Date.now() + 10 * 60 * 1000
    });

    const res = await chai.request(app)
      .post('/api/auth/reset-password')
      .send({
        email: testUser.email,
        otp: '654321',
        newPassword: 'newpassword123'
      });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'Password reset successful');
  });
});
