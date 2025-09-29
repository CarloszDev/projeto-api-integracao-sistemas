const Joi = require('joi');

const alertSchema = Joi.object({
    sensor_id: Joi.string().required().messages({
        'string.base': `"sensor_id" should be a type of 'text'`,
        'string.empty': `"sensor_id" cannot be an empty field`,
        'any.required': `"sensor_id" is a required field`
    }),
    water_level_cm: Joi.number().positive().required().messages({
        'number.base': `"water_level_cm" should be a number`,
        'number.positive': `"water_level_cm" must be a positive number`,
        'any.required': `"water_level_cm" is a required field`
    }),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required()
});

module.exports = alertSchema;