//  run using this command : npm run test:notes
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); 
const userModel = require('../models/User');
const noteModel = require('../models/Notes');

chai.use(chaiHttp);
const { expect } = chai;

describe("Notes API", function () {
  this.timeout(10000); 

  const testUser = {
    username: "NoteTester",
    email: "notetester@example.com",
    password: "test123"
  };

  let token = '';
  let noteId = '';

  before(async () => {
    await userModel.deleteMany({ email: testUser.email });
    await noteModel.deleteMany({});


    await chai.request(app)
      .post('/api/auth/signup')
      .send(testUser);

   
    const res = await chai.request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    token = res.body.token;
  });

  it("should create a new note", async () => {
    const res = await chai.request(app)
      .post('/api/notes/createNote')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Note',
        content: 'This is a test note.'
      });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('title', 'Test Note');
    noteId = res.body._id;
  });

  it("should fetch all notes for the user", async () => {
    const res = await chai.request(app)
      .get('/api/notes/getAllNotes') 
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
  });

  it("should update a note", async () => {
    const res = await chai.request(app)
      .put(`/api/notes/${noteId}`) 
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Note', content: 'Updated content.' });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('title', 'Updated Note');
  });

  it("should delete a note", async () => {
    const res = await chai.request(app)
      .delete(`/api/notes/${noteId}`) 
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
  });
});
