const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');


const index = () => {

    let connection;
    let server;

    beforeAll(async () => {
        server = await MongoMemoryServer.create();
        connection = await mongoose.connect(server.getUri(), { dbName: "users_test"});
    });

    afterAll(async () => {
        if (connection) await mongoose.connection.stop();
        if(server) await server.stop();
    });

}

module.exports = index



