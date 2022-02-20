const validateEdit = (sales, productsToEdit, oldProducts) => {
    const newProducts = oldProducts;
    
    if (newProducts.length !== productsToEdit.length) {
        return { message: '"product_id" is required' };
    } 
    
    sales.map((s, index) => {
        if (s.quantity < productsToEdit[index].quantity) {
            newProducts[index].quantity -= productsToEdit[index].quantity;
           return s;
        }
        newProducts[index].quantity += productsToEdit[index].quantity;
        return s;
    });

    const isProductAvailable = newProducts.find((product) => product.quantity < 0);

    if (isProductAvailable) {
        return { message: `Such amount of: ${isProductAvailable.name}, is not available` };
    }

    return newProducts;
};

module.exports = {
    validateEdit,
};