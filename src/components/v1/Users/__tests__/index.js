const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require("mongoose");

const setup = () => {

    let server;
    let conn;

    beforeAll(async () => {
        server = await MongoMemoryServer.create();
        conn = await mongoose.connect(server.getUri(), { dbName: "users_test"});
    });

    afterAll(async () => {
        if (conn) await mongoose.connections[0].close(true);
        if(server) await server.stop();
    });
}

module.exports = setup



