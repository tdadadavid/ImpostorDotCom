"use strict";

const { v4: uuidv4 } = require('uuid');
const { Schema, model } = require('mongoose');
const { sign } = require('jsonwebtoken');
const { JWT } = require('../../../config');


const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 255

    },

    lastname: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 255
    },

    username: {
        type: String,
        unique: true
    },

    email: {
        type: String,
        required:true,
        unique: true,
    },

    phone: {
        type: String,
        required: true,
        unique: true,
        minLength: 7, // following international standards
        maxLength: 15
    },

    password: {
        type: String,
        required: true
    }

});

userSchema.methods.generateAuthToken =  () => {
    return sign({ _id: this._id, email: this.email }, JWT.ACCESS_TOKENS_SECRET, {
        expiresIn: JWT.expirationDate
    });
}

userSchema.methods.transform = function (){
    const id = uuidv4().toString();

    return {
        id: this._id,
        username: this.username || `@${this.firstname}-${id}`,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        phone: this.phone,
    }
}


const Users = model('Users', userSchema);


module.exports = Users;


