const {hash, compare} = require("bcrypt");
const Users = require("../model");
const {errorMessage} = require("../../../../utils");

class UserService {
    static async createUser(data) {
        const { firstname, lastname, email, phone, password } = data;

        const hashPassword = await hash(password, 11);

        return await Users.create({
            firstname,
            lastname,
            email,
            phone,
            password: hashPassword
        });
    }

}


module.exports = UserService;