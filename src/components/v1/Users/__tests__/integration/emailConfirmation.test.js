const request = require('supertest');
const setup = require("../index");
const app = require('../../../../../../app');
const Users = require("../../model");

setup();

describe('Confirmation mail', function () {
    /**
     * Expectations
     *
     * return 200 if the email is confirmed
     */

    const makeUser = async () => {
        const newUser =  Users({
            firstname: "King",
            lastname: "Mick",
            username: "mickJod",
            email: "dummy@gmail.com",
            phone: "+23481823939393",
            password: "AWbn09890@#"
        });
        return await newUser.save();
    }

    it('should return 200 when email is confirmed', async () => {
        const user = await makeUser();
        const data = user.generateAuthToken();

        const response = await request(app)
            .post(`/api/auth/users/mail-confirmations/${data}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toContain("confirmed");
    });
});