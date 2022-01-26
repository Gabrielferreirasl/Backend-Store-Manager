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

const getById = async (id) => {
    const [[result]] = await connection.execute(
        'SELECT * FROM products WHERE id=?',
        [id],
    );

    return result;
};

const update = async ({ name, quantity }, id) => {
    await connection.execute(
        'UPDATE products SET name=?, quantity=? WHERE id=?',
        [name, quantity, id],
    );
};

const deleteProduct = async (id) => {
     await connection.execute(
        'DELETE FROM products WHERE id=?',
        [id],
    );
};

module.exports = {
    createProduct,
    getAllProducts,
    getById,
    update,
    deleteProduct,
};