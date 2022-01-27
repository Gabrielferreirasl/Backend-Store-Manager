const { expect } = require('chai');
const sinon = require('sinon');

const productsServices = require('../../services/productsServices');
const productsModels = require('../../models/productsModels');
// const salesServices = require('../../services/salesServices');
// const salesControllers = require('../../controllers/salesControllers');

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
    // });

    // describe('teste de "sales" na camada de "controllers"', () => {
    // describe('createSale', () => {
    //     it('retorna as informações corretas no status e json', async () => {
    //     const reqBodyObj = [{ name: 'teste', quantity: 50 }, { name: 'teste', quantity: 50 }]
    //     const resultObj = { response: { id: 1, itensSold: reqBodyObj}, code: 201 };
    //     req.body = reqBodyObj;

    //     sinon.stub(salesServices, "createSale").resolves(resultObj);
    //     await salesControllers.createSale(req, res);

    //     expect(salesServices.createSale.calledWith(reqBodyObj)).to.be.true;
    //     expect(res.status.calledWith(201)).to.be.true;
    //     expect(res.json.calledWith(resultObj.response)).to.be.true;
    //         });
    //     });
    //     describe('getAll', () => {
    //         it('retorna as informações corretas no status e json', async () => {
    //         const resultObj = { response: ['teste','teste'] , code: 200 };
    
    //         sinon.stub(salesServices, "getAll").resolves(resultObj);
    //         await salesControllers.getAll(req, res);
    
    //         expect(res.status.calledWith(200)).to.be.true;
    //         expect(res.json.calledWith(resultObj.response)).to.be.true;
    //             });
    //         });
    //     describe('getById', () => {
    //         it('retorna as informações corretas no status e json', async () => {
    //         const resultObj = { response: [{ id: 5, name: 'teste', quantity: 50 }], code: 200 };
    //         reqParamsObj = { id: 5 };
    //         req.params = reqParamsObj;
        
    //         sinon.stub(salesServices, "getById").resolves(resultObj);
    //         await salesControllers.getById(req, res);
        
    //         expect(salesServices.getById.calledWith(reqParamsObj.id)).to.be.true;
    //         expect(res.status.calledWith(200)).to.be.true;
    //         expect(res.json.calledWith(resultObj.response)).to.be.true;
    //         });
    //     });
    //     describe('edit', () => {
    //         it('retorna as informações corretas no status e json', async () => {
    //         const resultObj = { response: [{ id: 5, name: 'teste', quantity: 50 }], code: 200 };
    //         reqBodyObj = { name: 'teste', quantity: 50 };
    //         reqParamsObj = { id: 5 };
    //         req.body = reqBodyObj;
    //         req.params = reqParamsObj;
    
    //         sinon.stub(salesServices, "edit").resolves(resultObj);
    //         await salesControllers.edit(req, res);
    
    //         expect(salesServices.edit.calledWith(reqBodyObj)).to.be.true;
    //         expect(res.status.calledWith(200)).to.be.true;
    //         expect(res.json.calledWith(resultObj.response)).to.be.true;
    //         });
    //     });
    //     describe('deleteSale', () => {
    //         it('retorna as informações corretas no status e json', async () => {
    //         const resultObj = { response: { id: 5, name: 'teste', quantity: 50 }, code: 200 };
    //         reqParamsObj = { id: 5 };
    //         req.params = reqParamsObj;
    
    //         sinon.stub(salesServices, "deleteSale").resolves(resultObj);
    //         await salesControllers.deleteSale(req, res);
    
    //         expect(salesServices.deleteSale.calledWith(reqParamsObj.id)).to.be.true;
    //         expect(res.status.calledWith(200)).to.be.true;
    //         expect(res.json.calledWith(resultObj.response)).to.be.true;
    //         });
        // });
    });
});