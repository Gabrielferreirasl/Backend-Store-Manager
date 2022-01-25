const productsModels = require('../models/productsModels');
const schema = require('../schemas/products');

const createProduct = async ({ name, quantity }) => {
    const products = await productsModels.getAllProducts();
    const error = schema.validate(name, quantity, products);

    if (error) return { response: { message: error.message }, code: error.code };

    const insertId = await productsModels.createProduct({ name, quantity });

    return { response: { id: insertId, name, quantity }, code: 201 };
};

const getAll = async () => {
    const result = await productsModels.getAllProducts();
    return { response: result, code: 200 };
};

const getById = async (id) => {
    const product = await productsModels.getById(id);
    
    if (!product) return { response: { message: 'Product not found' }, code: 404 };

    return { response: product, code: 200 };
};

module.exports = {
    createProduct,
    getAll,
    getById,
};