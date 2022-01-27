const { expect } = require('chai');
const sinon = require('sinon');

const productsServices = require('../../services/productsServices');
const productsModels = require('../../models/productsModels');
const salesServices = require('../../services/salesServices');
const salesModels = require('../../models/salesModels');

describe('testes unitarios da camada de services', () => {
    afterEach(() => {
      sinon.restore();
    });

describe('teste de "products" na camada de "services"', () => {
    describe('createProduct', () => {
        it('quando as informações passadas estão corretas', async () => {
        const resultExpected = { response: { id: 1, name: 'teste', quantity: 50 }, code: 201 };
        reqInfo = { name: 'teste', quantity: 50 };

        sinon.stub(productsModels, "createProduct").resolves(1);
        sinon.stub(productsModels, "getAllProducts").resolves([{ name: 'xablau', quantity: 50 }]);
        const result = await productsServices.createProduct(reqInfo);
        expect(productsModels.createProduct.calledWith(reqInfo)).to.be.true;
        expect(result).to.deep.equal(resultExpected);
            });
        it('quando as informações passadas estão corretas, mas o produto já existe', async () => {
        const resultExpected = { response: { message: 'Product already exists' }, code: 409 };
        reqInfo = { name: 'teste', quantity: 50 };

        sinon.stub(productsModels, "createProduct").resolves(1);
        sinon.stub(productsModels, "getAllProducts").resolves([{ name: 'teste', quantity: 50 }]);
        const result = await productsServices.createProduct(reqInfo);
        expect(productsModels.createProduct.calledWith(reqInfo)).to.be.false;
        expect(result).to.deep.equal(resultExpected);
            });
        it('quando o numero é uma string ou é menor que 1', async () => {
            const resultExpected = { response: { message: '"quantity" must be a number larger than or equal to 1' }, code: 422 };
            reqInfo = { name: 'teste', quantity: -5 };
    
            sinon.stub(productsModels, "createProduct").resolves(1);
            sinon.stub(productsModels, "getAllProducts").resolves([{ name: 'xablau', quantity: 50 }]);
            const result = await productsServices.createProduct(reqInfo);
            expect(productsModels.createProduct.calledWith(reqInfo)).to.be.false;
            expect(result).to.deep.equal(resultExpected);
            });
        it('quando o "name" não é passado ou é menor que 3', async () => {
            const resultExpected = { response: { message: '"name" length must be at least 5 characters long' }, code: 422 };
            reqInfo = { name: 'te', quantity: 1 };
    
            sinon.stub(productsModels, "createProduct").resolves(1);
            sinon.stub(productsModels, "getAllProducts").resolves([{ name: 'xablau', quantity: 50 }]);
            const result = await productsServices.createProduct(reqInfo);
            expect(productsModels.createProduct.calledWith(reqInfo)).to.be.false;
            expect(result).to.deep.equal(resultExpected);
            });
        });
        describe('getAll', () => {
            it('retorna todos os produtos', async () => {
            const resultObj = { response: ['teste','teste'] , code: 200 };

            sinon.stub(productsModels, "getAllProducts").resolves(resultObj.response);
            const result = await productsServices.getAll();
    
            expect(result).to.deep.equal(resultObj);
                });
            });
        describe('getById', () => {
            it('quando o id existe', async () => {
            const resultObj = { response: { id: 1, name: 'teste', quantity: 50 }, code: 200 };
            const id = 1;
        
            sinon.stub(productsModels, "getById").resolves(resultObj.response);
            const result = await productsServices.getById(id);
        
            expect(result).to.deep.equal(resultObj);
            });
            it('quando o id existe não existe', async () => {
                const resultObj = { response: { message: 'Product not found' }, code: 404 };
                const id = 1;
            
                sinon.stub(productsModels, "getById").resolves(null);
                const result = await productsServices.getById(id);
            
                expect(result).to.deep.equal(resultObj);
            });
        });
        describe('update', () => {
            it('quando a as informações estão corretas', async () => {
            const product = { name: 'teste', quantity: 50 }
            const id = 1;
            const resultObj = { response: {id, ...product}, code: 200 };
    
            sinon.stub(productsModels, "update").resolves(null);
            sinon.stub(productsModels, "getById").resolves(true);
            const result = await productsServices.update(product, id);
    
            expect(productsModels.update.calledWith(product, id)).to.be.true;
            expect(productsModels.getById.calledWith(id)).to.be.true;
            expect(result).to.deep.equal(resultObj);
            });
            it('quando a as informações estão corretas', async () => {
                const product = { name: 'teste', quantity: 50 }
                const id = 1;
                const resultObj = { response: { message: 'Product not found' }, code: 404 };
        
                sinon.stub(productsModels, "update").resolves(null);
                sinon.stub(productsModels, "getById").resolves(null);
                const result = await productsServices.update(product, id);
        
                expect(productsModels.update.calledWith(product, id)).to.be.false;
                expect(productsModels.getById.calledWith(id)).to.be.true;
                expect(result).to.deep.equal(resultObj);
            });
        });
        describe('deleteProduct', () => {
            it('deleta quando o produto existe', async () => {
            const product = { name: 'teste', quantity: 50 }
            const id = 1;
            const resultObj = { response: product, code: 200 };
    
            sinon.stub(productsModels, "deleteProduct").resolves(null);
            sinon.stub(productsModels, "getById").resolves(product);
            const result = await productsServices.deleteProduct(id);
    
            expect(productsModels.getById.calledWith(id)).to.be.true;
            expect(result).to.deep.equal(resultObj);
            });
            it('não deleta se o produto não existe', async () => {
                const id = 1;
                const resultObj = { response: { message: 'Product not found' }, code: 404 };
        
                sinon.stub(productsModels, "deleteProduct").resolves(null);
                sinon.stub(productsModels, "getById").resolves(null);
                const result = await productsServices.deleteProduct(id);
        
                expect(productsModels.deleteProduct.calledWith()).to.be.false;
                expect(productsModels.getById.calledWith(id)).to.be.true;
                expect(result).to.deep.equal(resultObj);
            });
        });

    // describe('teste de "products" na camada de "services"', () => {
    //     describe('createProduct', () => {
    //         it('quando as informações passadas estão corretas', async () => {
    //         const resultExpected = { response: { id: 1, name: 'teste', quantity: 50 }, code: 201 };
    //         reqInfo = { name: 'teste', quantity: 50 };
    
    //         sinon.stub(salesModels, "createProduct").resolves(1);
    //         sinon.stub(salesModels, "getAllProducts").resolves([{ name: 'xablau', quantity: 50 }]);
    //         const result = await salesServices.createProduct(reqInfo);
    //         expect(salesModels.createProduct.calledWith(reqInfo)).to.be.true;
    //         expect(result).to.deep.equal(resultExpected);
    //             });
    //         it('quando as informações passadas estão corretas, mas o produto já existe', async () => {
    //         const resultExpected = { response: { message: 'Product already exists' }, code: 409 };
    //         reqInfo = { name: 'teste', quantity: 50 };
    
    //         sinon.stub(salesModels, "createProduct").resolves(1);
    //         sinon.stub(salesModels, "getAllProducts").resolves([{ name: 'teste', quantity: 50 }]);
    //         const result = await salesServices.createProduct(reqInfo);
    //         expect(salesModels.createProduct.calledWith(reqInfo)).to.be.false;
    //         expect(result).to.deep.equal(resultExpected);
    //             });
    //         it('quando o numero é uma string ou é menor que 1', async () => {
    //             const resultExpected = { response: { message: '"quantity" must be a number larger than or equal to 1' }, code: 422 };
    //             reqInfo = { name: 'teste', quantity: -5 };
        
    //             sinon.stub(salesModels, "createProduct").resolves(1);
    //             sinon.stub(salesModels, "getAllProducts").resolves([{ name: 'xablau', quantity: 50 }]);
    //             const result = await salesServices.createProduct(reqInfo);
    //             expect(salesModels.createProduct.calledWith(reqInfo)).to.be.false;
    //             expect(result).to.deep.equal(resultExpected);
    //             });
    //         it('quando o "name" não é passado ou é menor que 3', async () => {
    //             const resultExpected = { response: { message: '"name" length must be at least 5 characters long' }, code: 422 };
    //             reqInfo = { name: 'te', quantity: 1 };
        
    //             sinon.stub(salesModels, "createProduct").resolves(1);
    //             sinon.stub(salesModels, "getAllProducts").resolves([{ name: 'xablau', quantity: 50 }]);
    //             const result = await salesServices.createProduct(reqInfo);
    //             expect(salesModels.createProduct.calledWith(reqInfo)).to.be.false;
    //             expect(result).to.deep.equal(resultExpected);
    //             });
    //         });
    //         describe('getAll', () => {
    //             it('retorna todos os produtos', async () => {
    //             const resultObj = { response: ['teste','teste'] , code: 200 };
    
    //             sinon.stub(salesModels, "getAllProducts").resolves(resultObj.response);
    //             const result = await salesServices.getAll();
        
    //             expect(result).to.deep.equal(resultObj);
    //                 });
    //             });
    //         describe('getById', () => {
    //             it('quando o id existe', async () => {
    //             const resultObj = { response: { id: 1, name: 'teste', quantity: 50 }, code: 200 };
    //             const id = 1;
            
    //             sinon.stub(salesModels, "getById").resolves(resultObj.response);
    //             const result = await salesServices.getById(id);
            
    //             expect(result).to.deep.equal(resultObj);
    //             });
    //             it('quando o id existe não existe', async () => {
    //                 const resultObj = { response: { message: 'Product not found' }, code: 404 };
    //                 const id = 1;
                
    //                 sinon.stub(salesModels, "getById").resolves(null);
    //                 const result = await salesServices.getById(id);
                
    //                 expect(result).to.deep.equal(resultObj);
    //             });
    //         });
    //         describe('update', () => {
    //             it('quando a as informações estão corretas', async () => {
    //             const product = { name: 'teste', quantity: 50 }
    //             const id = 1;
    //             const resultObj = { response: {id, ...product}, code: 200 };
        
    //             sinon.stub(salesModels, "update").resolves(null);
    //             sinon.stub(salesModels, "getById").resolves(true);
    //             const result = await salesServices.update(product, id);
        
    //             expect(salesModels.update.calledWith(product, id)).to.be.true;
    //             expect(salesModels.getById.calledWith(id)).to.be.true;
    //             expect(result).to.deep.equal(resultObj);
    //             });
    //             it('quando a as informações estão corretas', async () => {
    //                 const product = { name: 'teste', quantity: 50 }
    //                 const id = 1;
    //                 const resultObj = { response: { message: 'Product not found' }, code: 404 };
            
    //                 sinon.stub(salesModels, "update").resolves(null);
    //                 sinon.stub(salesModels, "getById").resolves(null);
    //                 const result = await salesServices.update(product, id);
            
    //                 expect(salesModels.update.calledWith(product, id)).to.be.false;
    //                 expect(salesModels.getById.calledWith(id)).to.be.true;
    //                 expect(result).to.deep.equal(resultObj);
    //             });
    //         });
    //         describe('deleteProduct', () => {
    //             it('deleta quando o produto existe', async () => {
    //             const product = { name: 'teste', quantity: 50 }
    //             const id = 1;
    //             const resultObj = { response: product, code: 200 };
        
    //             sinon.stub(salesModels, "deleteProduct").resolves(null);
    //             sinon.stub(salesModels, "getById").resolves(product);
    //             const result = await salesServices.deleteProduct(id);
        
    //             expect(salesModels.getById.calledWith(id)).to.be.true;
    //             expect(result).to.deep.equal(resultObj);
    //             });
    //             it('não deleta se o produto não existe', async () => {
    //                 const id = 1;
    //                 const resultObj = { response: { message: 'Product not found' }, code: 404 };
            
    //                 sinon.stub(salesModels, "deleteProduct").resolves(null);
    //                 sinon.stub(salesModels, "getById").resolves(null);
    //                 const result = await salesServices.deleteProduct(id);
            
    //                 expect(salesModels.deleteProduct.calledWith()).to.be.false;
    //                 expect(salesModels.getById.calledWith(id)).to.be.true;
    //                 expect(result).to.deep.equal(resultObj);
    //             });
    //         });
    //     });
    });
});