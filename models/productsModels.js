const connection = require('./connection');

const createProduct = async ({ name, quantity }) => {
   const [{ insertId }] = await connection.execute(
        'INSERT INTO products (name, quantity) VALUES(?, ?)',
        [name, quantity],
        );
        
        return insertId;
};

const getAllProducts = async () => {
    const [result] = await connection.execute('SELECT * FROM products');
    
    return result;
};

module.exports = {
    createProduct,
    getAllProducts,
};