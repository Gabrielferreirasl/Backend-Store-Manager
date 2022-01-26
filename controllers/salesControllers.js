const salesServices = require('../services/salesServices');

const createSale = async (req, res) => {
    const arrSales = req.body;
    const { response, code } = await salesServices.createSale(arrSales);

    res.status(code).json(response);
};

module.exports = {
    createSale,
};