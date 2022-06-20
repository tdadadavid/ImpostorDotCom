const setup = require("../index");
const Users = require("../../model");
const request = require("supertest");
const app = require("../../../../app");
const mongoose = require("mongoose");


describe('/api/auth/users/login',  () => {

    setup();

    let response;
    let payload;
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
        payload = { email: "dummy@gmail.com", password: "AWbcn09890@#$" };
        await makeUser();
    });

    afterEach(async () => {
        const collections = await mongoose.connection.db.collections();

        for (const collection of collections) {
            await collection.deleteMany({});
        }
    });

    /**
     * Expectation:
     * return 400 if email is not given
     * return 400 if password is not given
     * return 400 if email is not valid
     * return 400 if passwords don't match
     *
     * return 200 if req is valid
     * return user data
     * return token
     */

    it('should return 400 if email is not given', async () => {
        delete payload.email;

        response = await makePostRequest();
        expect(response.status).toBe(400);
    });

    it('should return 400 if password is not given', async () => {
        delete payload.password;

        response = await makePostRequest();
        expect(response.status).toBe(400);
    });

    it('should return 400 if email is not valid', async () => {
        payload.email = "notAllowed@usa.gov";

        response = await makePostRequest();
        expect(response.status).toBe(400);
    });

    it('should return 400 if the passwords don"t match', async () => {
        payload.password = "wrongPassword";

        response = await makePostRequest();
        expect(response.status).toBe(400);
    });


    it('should return 200 if the request is valid', async () => {
        response = await makePostRequest();
        expect(response.status).toBe(200);
    });


});
