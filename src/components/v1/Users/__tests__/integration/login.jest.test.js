const setup = require("../index");
const Users = require("../../model");
const request = require("supertest");
const app = require("../../../../../app");
const mongoose = require("mongoose");
const {hash} = require("bcrypt");


describe('/api/auth/Users/login',  () => {

    setup();

    let response;
    let payload;

    let user = {
        firstname: "King",
        lastname: "Mick",
        username: "mickJod",
        email: "dummy@gmail.com",
        phone: "+23481823939393",
        password: "AWbn09890@#"
    };

    const makeUser = async  () =>{
        await Users.create(user);
    }
    const makePostRequest = () => {
        return request(app)
            .post('/api/auth/users/login')
            .send(payload);
    }

    beforeEach(async () => {
        payload = { email: "dummy@gmail.com", password: "AWbn09890@#" };
        await makeUser();
    });

    afterEach(async () => {
        user.password = "AWbn09890@#";
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
     *
     * return 404 if the user is not found
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

    it('should return 404 if user with given email does not exists', async () => {
        payload.email = "userdoesnotexist@gmail.com";

        response = await makePostRequest();
        expect(response.status).toBe(404);
    });

    it('should return 400 if the passwords don"t match', async () => {
        payload.password = "wrongPass";

        response = await makePostRequest();
        expect(response.status).toBe(400);
    });


    it('should return 200 if the request is valid', async () => {
        response = await makePostRequest();
        expect(response.body.message).toContain("Welcome")
        expect(response.status).toBe(200);
    });

    // this test is too general, verify token function in units test //TODO
    it('should return user details with access tokens', async () => {
        response = await makePostRequest();
        expect(response.body.data[0].token).toBeDefined();
    });

});
