const Joi = require('joi');

const errorsCode = {
    'string.min': 422,
    'any.required': 400,
    'number.min': 422,
    'number.base': 422,
     notFound: 404,
     alreadyExists: 409,
  };
  
  const validate = (name, quantity, products) => {
      const { error } = Joi.object({
          name: Joi.string().min(5).not().empty()
          .required(),
          quantity: Joi.number().min(1).not().empty()
          .required()
          .messages({
              'number.min': '"quantity" must be a number larger than or equal to 1',
              'number.base': '"quantity" must be a number larger than or equal to 1',
            }),
      })
      .validate({ name, quantity });
  
      if (error) {
          return { message: error.details[0].message,
              code: errorsCode[error.details[0].type] };
      }

      if (products && products.some((p) => p.name === name)) {
        return { message: 'Product already exists', code: errorsCode.alreadyExists };
    }
  };

  module.exports = {
    validate,
  };