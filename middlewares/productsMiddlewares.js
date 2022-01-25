const productsModels = require('../models/productsModels');

const getAllProducts = async (req, _res, next) => {
    const products = await productsModels.getAllProducts();

    req.products = products;

    next();
};

module.exports = {
    getAllProducts,
};