const connection = require('./connection');

const handleNewSale = async () => {
    const [{ insertId }] = await connection.execute('INSERT INTO sales VALUES ()');
    return insertId;
};

const createSale = async (arrSales) => {
    const arrIdSales = await Promise.all(arrSales.map(() => handleNewSale()));

    let query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ';
    const arrQuery = [];

    arrSales.forEach(({ product_id: productId, quantity }, index) => {
        query += index === arrIdSales.length - 1 ? '(?, ?, ?);' : '(?, ?, ?), ';
        arrQuery.push(arrIdSales[index], productId, quantity);
    });

    const [{ insertId }] = await connection.execute(query, arrQuery);
        
    return insertId;
};

module.exports = {
    createSale,
};