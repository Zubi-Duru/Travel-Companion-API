const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML!'
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) return helpers.error('string.escapeHTML', { value });
        return clean;
      }
    }
  }
});

const Joi = BaseJoi.extend(extension);

const emailValidation = Joi.string().email().messages({
  'string.email': 'Invalid email format',
  'any.required': 'Email is required',
});

const passwordValidation = Joi.string().messages({
  'any.required': 'Password is required',
});

const locationValidation = Joi.object({
  type: Joi.string().valid('Point').default('Point'),
  coordinates: Joi.array().items(Joi.number()).required(),
  address: Joi.string().required(),
});

const travelDateValidation = Joi.date().iso().required().messages({
  'date.iso': 'Invalid date format',
  'any.required': 'Travel date is required',
});

const ageValidation = Joi.number().integer().positive().required().messages({
  'number.integer': 'Age must be an integer',
  'number.positive': 'Age must be a positive number',
  'any.required': 'Age is required',
});

const sexValidation = Joi.string().valid('Male', 'Female', 'Non-Binary').required().messages({
  'string.valid': 'Invalid value for sex',
  'any.required': 'Sex is required',
});

const interestsValidation = Joi.array().items(Joi.string().valid(
  'Hiking', 'Education', 'Sport', 'Travelling', 'Art', 'Beach',
  'Music', 'Party', 'Technology', 'History & Culture', 'Adventure Seeker', 'Photography', "Nature","Science"
)).min(3).max(5).default([]);

const relationshipValidation=Joi.string().valid("Single", "Married").required().messages({
  'string.valid': 'Invalid value for relationship Status',
  'any.required': 'relationship status is required',
})

const aboutValidation = Joi.string().allow('').optional();

const friendsValidation = Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).default([]);

const pendingFriendsValidation = Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).default([]);

const userValidationSchema = Joi.object({
  username: Joi.string().messages({
    'any.required': 'Username is required',
  }),
  email: emailValidation,
  password: passwordValidation,
  homeLocation: locationValidation,
  destinationLocation: locationValidation,
  travelDate: travelDateValidation,
  age: ageValidation,
  sex: sexValidation,
  interests: interestsValidation,
  relationship:relationshipValidation,
  about: aboutValidation,
  friends: friendsValidation,
  pendingFriends: pendingFriendsValidation,
});

module.exports = userValidationSchema;
