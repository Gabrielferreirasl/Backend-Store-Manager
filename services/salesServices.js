const salesModels = require('../models/salesModels');
const productsModels = require('../models/productsModels');
const schema = require('../schemas/salesSchemas');

const createSale = async (arrSales) => {
    const error = schema.validateSale(arrSales);

    if (error) return { response: { message: error.message }, code: error.code };
    
   const arrAllProducts = await Promise.all(
        arrSales.map(({ product_id: productId }) => productsModels.getById(productId)),
    );

    if (arrAllProducts.length !== arrSales.length) {
        return { response: { message: '"product_id" is required' }, code: 400 };
    }

    const id = await salesModels.createSale(arrSales, arrAllProducts);

    return { response: { id, itemsSold: arrSales }, code: 201 };
};

const getAll = async () => {
    const allSales = await salesModels.getAll();

    return { response: allSales, code: 200 };
};

const getById = async (id) => {
    const sale = await salesModels.getById(id);

    if (sale.length === 0) {
        return { response: { message: 'Sale not found' }, code: 404 };
    }

    return { response: sale, code: 200 };
};

const edit = async (arrProducts, id) => {
    const error = schema.validateSale(arrProducts);

    if (error) return { response: { message: error.message }, code: error.code };

    const idValidation = await Promise.all(
        arrProducts.map(({ product_id: productId }) => productsModels.getById(productId)),
    );

    if (idValidation.length !== arrProducts.length) {
        return { response: { message: '"product_id" is required' },
         code: 400 };
    }

     await salesModels.edit(arrProducts, id);

    return { response: { saleId: id, itemUpdated: arrProducts }, code: 200 };
};

const deleteSale = async (id) => {
    const sales = await salesModels.getById(id);

    if (sales.length === 0) {
        return { response: { message: 'Sale not found' }, code: 404 };
    }

    await salesModels.deleteSale(id, sales);

    return { response: sales, code: 200 };
};

module.exports = {
    createSale,
    getAll,
    getById,
    edit,
    deleteSale,
};