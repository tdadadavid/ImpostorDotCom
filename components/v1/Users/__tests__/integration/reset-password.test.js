const request = require('supertest');
const app = require('../../../../../app');
const setup = require('../index');
const Users = require('../../model');

describe('Request for password reset', () => {
    /***
     * Expectations:
     *
     * return 400 if email is not given
     * return 404 if the email doesn't exist
     * return 200 if request is valid
     *
     */
    setup();
    let response;
    let payload = { email: "dummy@gmail.com" };
    const makePostRequest = () => {
        return request(app)
            .post('/api/auth/users/forgot-password')
            .send(payload)
    }
    let user = {
        firstname: "King",
        lastname: "Mick",
        username: "mickJod",
        email: "dummy@gmail.com",
        phone: "+23481823939393",
        password: "AWbn09890@#"
    };

    beforeEach(async () => {
       payload = { email: "dummy@gmail.com" };
       await Users.create(user);
    });

    afterEach(async () => {
        await Users.deleteOne({ email: "dummy@gmail.com" });
    })

    it('should return 400 if email is not given', async () => {
        delete payload.email;

        response = await makePostRequest();

        expect(response.status).toEqual(400);
        expect(response.body.message).toContain('email');
    });

    it('should return 404 if the user is not authenticated', async () => {
        payload.email = "unauthenticated@gmail.com";

        response = await makePostRequest();

        expect(response.status).toBe(404);
        expect(response.body.message).toContain('not authenticated');
    });

    it('should return 200 if the request is valid', async () => {
        response = await makePostRequest();

        expect(response.status).toBe(200);
        expect(response.body.message).toContain('email');
    });
});

// describe('Reset user password', () => {
    /**
     * Expectations:
     *
     * return 422 if token is not provided
     * return 422 if the token in the link is invalid/ expired
     * return 400 if the password is not given
     * return 400 if the confirm_password field is not given
     * return 200 if the password is reset
     * return 500 if there is an error in the database process
     */
// });