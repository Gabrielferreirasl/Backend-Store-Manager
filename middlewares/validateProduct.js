const Joi = require('joi');

const errorsCode = {
    'string.min': 422,
    'any.required': 400,
    'number.min': 422,
    'number.base': 422,
     notFound: 404,
  };
  
  const QUANTITY_MESSAGES = {
    'number.min': '"quantity" must be a number larger than or equal to 1',
    'number.base': '"quantity" must be a number larger than or equal to 1',
  };
  
  const validateProduct = (req, res, next) => {
    const { name, quantity } = req.body;

      const { error } = Joi.object({
          name: Joi.string().min(5).not().empty()
          .required(),
          quantity: Joi.number().min(1).not().empty()
          .required()
          .messages(QUANTITY_MESSAGES),
      })
      .validate({ name, quantity });
  
      if (error) {
          const code = errorsCode[error.details[0].type];
          const { message } = error.details[0];
      
          return res.status(code).json({ message });
      }

      next();
  };

  module.exports = {
    validateProduct,
  };