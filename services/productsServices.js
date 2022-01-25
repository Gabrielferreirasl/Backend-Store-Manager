const productsModels = require('../models/productsModels');
const schema = require('../schemas/products');

const createProduct = async ({ name, quantity }, products) => {
    const error = schema.validate(name, quantity, products);

    if (error) return { response: { message: error.message }, code: error.code };

    const insertId = await productsModels.createProduct({ name, quantity });

    return { response: { id: insertId, name, quantity }, code: 201 };
};

module.exports = {
    createProduct,
};