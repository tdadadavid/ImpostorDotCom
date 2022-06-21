const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Users = require("../model");

const setup = () => {

    let server;
    let conn;

    beforeAll(async () => {
        server = await MongoMemoryServer.create();
        conn = await mongoose.connect(server.getUri(), { dbName: "users_test"});
    });

    afterAll(async () => {
        if (conn) await mongoose.connection.stop();
        if(server) await server.stop();
    });
}

module.exports = setup



