const setup = require("../index");
const Users = require("../../model");
const request = require("supertest");
const app = require("../../../../app");
const mongoose = require("mongoose");


describe('/api/auth/users/login',  () => {

    setup();

    let response;
    let payload = { email: "dummy@gmail.com", password: "AWbcn09890@#$" };
    const makeUser = () => new Users({
        firstname: "King",
        lastname: "Mick",
        username: "mickJod",
        email: "dummy@gmail.com",
        phone: "+23481823939393",
        password: "AWbcn09890@#$"
    }).save()
    const makePostRequest = () => {
        return request(app)
            .post('/api/auth/users/login')
            .send(payload);
    }

    beforeEach(async () => {
        await makeUser();
    });

    afterEach(async () => {
        const collections = await mongoose.connection.db.collections();

        for (const collection of collections) {
            await collection.deleteMany({});
        }
    });


    it('should return 400 if email is not given', async () => {
        delete payload.email;

        response = await makePostRequest();
        expect(response.status).toBe(400);
    });



});
