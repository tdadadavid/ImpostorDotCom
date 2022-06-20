const Joi = require('joi');


const registrationSchema = Joi.object({
    firstname: Joi.string().min(1).max(255).required(),
    lastname: Joi.string().min(1).max(255).required(),
    username: Joi.string().min(1).max(255),
    email: Joi.string().email({
        tlds: { allow: ["com", "net", "org"] },
        minDomainSegments: 2
    }).required(),
    phone: Joi
        .string()
        .min(7)
        .max(15)
        .regex(new RegExp('.*\\d{1,3}[ -]?\\d{3}[ -]?\\d{3,9}'))
        .required(),
    password: Joi.string()
        .min(8)
        .max(12)
        .regex(new RegExp('[a-zA-Z\d]{2,3}[a-zA-Z\d]{3,4}\\d{2,3}(#|$|@|!){2,3}'))
        .required()
});

module.exports = {
    registrationSchema
}