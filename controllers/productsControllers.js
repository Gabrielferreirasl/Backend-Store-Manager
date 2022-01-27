const productsServices = require('../services/productsServices');

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;

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

const update = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const { response, code } = await productsServices.update({ name, quantity }, id);
    
    res.status(code).json(response);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { response, code } = await productsServices.deleteProduct(+id);

    res.status(code).json(response);
};
 
module.exports = {
    createProduct,
    getAll,
    getById,
    update,
    deleteProduct,
};