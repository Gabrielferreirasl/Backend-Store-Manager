const salesModels = require('../models/salesModels');
const productsModels = require('../models/productsModels');
const salesSchemas = require('../schemas/salesSchemas');

const createSale = async (arrSales) => {
   const arrAllProducts = await Promise.all(
        arrSales.map(({ product_id: productId }) => productsModels.getById(productId)),
    );

    if (arrAllProducts.length !== arrSales.length) {
        return { response: { message: '"product_id" is required' }, code: 400 };
    }
   
    if (arrAllProducts.some((p, indx) => (p.quantity - arrSales[indx].quantity) < 1)) {
        return { response: { message: 'Such amount is not available' }, code: 422 };
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

const edit = async (productsToEdit, id) => {
    const { response: sales } = await getById(id);

    const oldProducts = await Promise.all(
        productsToEdit.map(({ product_id: productId }) => productsModels.getById(productId)),
    );

    const newProducts = salesSchemas.validateEdit(sales, productsToEdit, oldProducts);

    if (newProducts.message) return { response: { message: newProducts.message }, code: 400 };

    await Promise.all(
        newProducts.map(({ id: idProduct, name, quantity }) => productsModels
        .update({ name, quantity }, idProduct)),
        );

     await salesModels.edit(productsToEdit, id);

    return { response: { saleId: id, itemUpdated: productsToEdit }, code: 200 };
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