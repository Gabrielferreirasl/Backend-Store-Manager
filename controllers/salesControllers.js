const salesServices = require('../services/salesServices');

const createSale = async (req, res) => {
    const arrSales = req.body;
    
    const { response, code } = await salesServices.createSale(arrSales);

    res.status(code).json(response);
};

const getAll = async (_req, res) => {
    const { response, code } = await salesServices.getAll();

    res.status(code).json(response);
};

const getById = async (req, res) => {
    const { id } = req.params;

    const { response, code } = await salesServices.getById(+id);

    res.status(code).json(response);
};

const edit = async (req, res) => {
    const { id } = req.params;
    const arr = req.body;

    const { response, code } = await salesServices.edit(arr, +id);

    res.status(code).json(response);
};

const deleteSale = async (req, res) => {
    const { id } = req.params;

    const { response, code } = await salesServices.deleteSale(+id);

    res.status(code).json(response);
};

module.exports = {
    createSale,
    getAll,
    getById,
    edit,
    deleteSale,
};