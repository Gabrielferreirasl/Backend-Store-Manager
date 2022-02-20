const productsModels = require('../models/productsModels');

const createProduct = async ({ name, quantity }) => {
    const products = await productsModels.getAllProducts();

    if (products.some((p) => p.name === name)) {
        return { response: { message: 'Product already exists' }, code: 409 };
    }

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

const update = async ({ name, quantity }, id) => {
    const product = await productsModels.getById(id);

    if (!product) return { response: { message: 'Product not found' }, code: 404 };

     await productsModels.update({ name, quantity }, id);

     return { response: { name, quantity, id }, code: 200 };
};

const deleteProduct = async (id) => {
    const product = await productsModels.getById(id);
    
    if (!product) return { response: { message: 'Product not found' }, code: 404 };

    await productsModels.deleteProduct(id);

    return { response: product, code: 200 };
};

module.exports = {
    createProduct,
    getAll,
    getById,
    update,
    deleteProduct,
};