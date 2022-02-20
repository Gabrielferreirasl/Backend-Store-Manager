const Joi = require('joi');

const errorsCode = {
    'any.required': 400,
    'number.min': 422,
    'number.base': 422,
     notFound: 404,
  };

  const PRODUCT_ID_MESSAGES = {
    'any.required': '"product_id" is required',
    'number.min': '"product_id" is required',
    'number.base': '"product_id" is required',
  };

  const QUANTITY_MESSAGES = {
    'any.required': '"quantity" is required',
    'number.min': '"quantity" must be a number larger than or equal to 1',
    'number.base': '"quantity" must be a number larger than or equal to 1',
    };

  const formatKey = (array) => array
   .reduce((arr, { product_id: productId, quantity }) => arr.concat({ productId, quantity }), []);
  
  const validateSale = (req, res, next) => {
    const arrSales = req.body;

    const { error } = Joi.array().items(
        Joi.object({
        productId: Joi.number().min(1).not().empty()
        .required()
        .messages(PRODUCT_ID_MESSAGES),
        quantity: Joi.number().min(1).not().empty()
        .required()
        .messages(QUANTITY_MESSAGES),
      }),
      ).validate(formatKey(arrSales));

    if (error) {
        const code = errorsCode[error.details[0].type];
        const { message } = error.details[0];

        return res.status(code).json({ message });
    }

    next();
  };

  module.exports = {
    validateSale,
  };