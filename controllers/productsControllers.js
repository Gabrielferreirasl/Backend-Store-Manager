const productsServices = require('../services/productsServices');

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const { products } = req;

    const { response, code } = await productsServices.createProduct({ name, quantity }, products);

    res.status(code).json(response);
};

module.exports = {
    createProduct,
};