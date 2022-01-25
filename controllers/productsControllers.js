const productsServices = require('../services/productsServices');

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    // const { products } = req;

    const { response, code } = await productsServices.createProduct({ name, quantity });

    res.status(code).json(response);
};

const getAll = async (_req, res) => {
    const { response, code } = await productsServices.getAll();

    res.status(code).json(response);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { response, code } = await productsServices.getById(+id);

    res.status(code).json(response);
};

module.exports = {
    createProduct,
    getAll,
    getById,
};