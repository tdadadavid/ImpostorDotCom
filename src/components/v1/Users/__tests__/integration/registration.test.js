const request = require('supertest');
const app = require('../../../../../../app');
const Users = require('../../model');
const mongoose = require('mongoose');
const setup = require('../index')


describe('/api/auth/Users', () => {

    setup();

    let response;
    let user;

    const createUser = () => new Users(user).save();
    const makePostRequest = () => {
        return request(app)
            .post('/api/auth/users')
            .send(user);
    }

    beforeEach(async () => {
        const collections = await mongoose.connection.db.collections();

        for (const collection of collections) {
            await collection.deleteMany({});
        }

        await Users.deleteMany({});

        user = {
            firstname: "King",
            lastname: "Mick",
            username: "mickJod",
            email: "mickJordan@gmail.com",
            phone: "+23481823939393",
            password: "09zmqAX10#@"
        };

    });

    afterEach(async () => {
        await Users.deleteMany({});
    });


    it('should return 400 error code if the firstname is not given', async () => {
        delete user.firstname;

        response = await makePostRequest();
        expect(response.status).toEqual(400);
        expect(response.body.message).toContain('firstname');
    });

    it('should return 400 error code if the lastname is not given', async () => {
        delete user.lastname;

        response = await makePostRequest();
        expect(response.status).toEqual(400);
        expect(response.body.message).toContain('lastname');
    });

    it('should return 400 error code if the email is not given', async () => {
        delete user.email;

        response = await makePostRequest();
        expect(response.status).toEqual(400);
        expect(response.body.message).toContain('email');
    });

    it('should return 400 error code if the number is not a valid number ', async () => {
        user.phone = "90192"

        response = await makePostRequest();
        expect(response.status).toEqual(400);
        expect(response.body.message).toContain('phone');
    });

    it('should return 400 error code if the email is taken', async () => {
        await createUser();

        response = await makePostRequest();
        expect(response.status).toEqual(400);
    });

    it('should return 400 error code if the username is taken', async () => {
        user.username = "dummy";
        await createUser();

        response = await makePostRequest();
        expect(response.status).toEqual(400);
        expect(response.body.message).toContain('in use');
    });

    it('should return 201 when user is successfully registered', async () => {
        user.email = "dummy@gmail.com";

        response = await makePostRequest();

        expect(response.body.message).toContain("successful");
        expect(response.status).toEqual(201);
    });
});