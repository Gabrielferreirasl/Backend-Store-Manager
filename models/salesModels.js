const connection = require('./connection');

const createSale = async (arrSales) => {
    const [{ insertId: idFromSale }] = await connection.execute('INSERT INTO sales VALUES ()');

    let query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ';
    const arrQuery = [];

    arrSales.forEach(({ product_id: productId, quantity }, index) => {
        query += index === arrSales.length - 1 ? '(?, ?, ?);' : '(?, ?, ?), ';
        arrQuery.push(idFromSale, productId, quantity);
    });

    await connection.execute(query, arrQuery);
        
    return idFromSale;
};

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT a.sale_id as saleId, a.product_id, a.quantity, b.date
    FROM sales_products a
    JOIN sales as b
    ON a.sale_id = b.id`,
);
  return sales;
};

const getById = async (id) => {
    const [sales] = await connection.execute(
        `SELECT date, product_id, quantity FROM sales as a
         INNER JOIN sales_products as b WHERE b.sale_id = ?`,
        [id],
    );

    return sales;
};

module.exports = {
    createSale,
    getAll,
    getById,
};