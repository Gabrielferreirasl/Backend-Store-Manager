const { expect } = require('chai');
const sinon = require('sinon');

const productsServices = require('../../services/productsServices');
const productsControllers = require('../../controllers/productsControllers');
const salesServices = require('../../services/salesServices');
const salesControllers = require('../../controllers/salesControllers');

describe('testes unitarios da camada de controllers', () => {
    const res = {};
    const req = {};
  
    beforeEach(() => {
      req.body = {};
  
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();
    });
  
    afterEach(() => {
      sinon.restore();
      req.body = {};
      req.params = {};
    });

describe('teste de "products" na camada de "controllers"', () => {
    describe('createProduct', () => {
        it('retorna as informações corretas no status e json', async () => {
        const resultObj = { response: { id: 1, name: 'teste', quantity: 50 }, code: 201 };
        reqBodyObj = { name: 'teste', quantity: 50 };
        req.body = reqBodyObj;

        sinon.stub(productsServices, "createProduct").resolves(resultObj);
        await productsControllers.createProduct(req, res);

        expect(productsServices.createProduct.calledWith(reqBodyObj)).to.be.true;
        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith(resultObj.response)).to.be.true;
            });
        });
        describe('getAll', () => {
            it('retorna as informações corretas no status e json', async () => {
            const resultObj = { response: ['teste','teste'] , code: 200 };
    
            sinon.stub(productsServices, "getAll").resolves(resultObj);
            await productsControllers.getAll(req, res);
    
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(resultObj.response)).to.be.true;
                });
            });
        describe('getById', () => {
            it('retorna as informações corretas no status e json', async () => {
            const resultObj = { response: { id: 1, name: 'teste', quantity: 50 }, code: 200 };
            reqParamsObj = { id: 5 };
            req.params = reqParamsObj;
        
            sinon.stub(productsServices, "getById").resolves(resultObj);
            await productsControllers.getById(req, res);
        
            expect(productsServices.getById.calledWith(reqParamsObj.id)).to.be.true;
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(resultObj.response)).to.be.true;
            });
        });
        describe('update', () => {
            it('retorna as informações corretas no status e json', async () => {
            const resultObj = { response: { id: 5, name: 'teste', quantity: 50 }, code: 200 };
            reqBodyObj = { name: 'teste', quantity: 50 };
            reqParamsObj = { id: 5 };
            req.body = reqBodyObj;
            req.params = reqParamsObj;
    
            sinon.stub(productsServices, "update").resolves(resultObj);
            await productsControllers.update(req, res);
    
            expect(productsServices.update.calledWith(reqBodyObj)).to.be.true;
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(resultObj.response)).to.be.true;
            });
        });
        describe('deleteProduct', () => {
            it('retorna as informações corretas no status e json', async () => {
            const resultObj = { response: { id: 5, name: 'teste', quantity: 50 }, code: 200 };
            reqParamsObj = { id: 5 };
            req.params = reqParamsObj;
    
            sinon.stub(productsServices, "deleteProduct").resolves(resultObj);
            await productsControllers.deleteProduct(req, res);
    
            expect(productsServices.deleteProduct.calledWith(reqParamsObj.id)).to.be.true;
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(resultObj.response)).to.be.true;
            });
        });
    });

    describe('teste de "sales" na camada de "controllers"', () => {
    describe('createSale', () => {
        it('retorna as informações corretas no status e json', async () => {
        const reqBodyObj = [{ name: 'teste', quantity: 50 }, { name: 'teste', quantity: 50 }]
        const resultObj = { response: { id: 1, itensSold: reqBodyObj}, code: 201 };
        req.body = reqBodyObj;

        sinon.stub(salesServices, "createSale").resolves(resultObj);
        await salesControllers.createSale(req, res);

        expect(salesServices.createSale.calledWith(reqBodyObj)).to.be.true;
        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith(resultObj.response)).to.be.true;
            });
        });
        describe('getAll', () => {
            it('retorna as informações corretas no status e json', async () => {
            const resultObj = { response: ['teste','teste'] , code: 200 };
    
            sinon.stub(salesServices, "getAll").resolves(resultObj);
            await salesControllers.getAll(req, res);
    
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(resultObj.response)).to.be.true;
                });
            });
        describe('getById', () => {
            it('retorna as informações corretas no status e json', async () => {
            const resultObj = { response: [{ id: 5, name: 'teste', quantity: 50 }], code: 200 };
            reqParamsObj = { id: 5 };
            req.params = reqParamsObj;
        
            sinon.stub(salesServices, "getById").resolves(resultObj);
            await salesControllers.getById(req, res);
        
            expect(salesServices.getById.calledWith(reqParamsObj.id)).to.be.true;
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(resultObj.response)).to.be.true;
            });
        });
        describe('edit', () => {
            it('retorna as informações corretas no status e json', async () => {
            const resultObj = { response: [{ id: 5, name: 'teste', quantity: 50 }], code: 200 };
            reqBodyObj = { name: 'teste', quantity: 50 };
            reqParamsObj = { id: 5 };
            req.body = reqBodyObj;
            req.params = reqParamsObj;
    
            sinon.stub(salesServices, "edit").resolves(resultObj);
            await salesControllers.edit(req, res);
    
            expect(salesServices.edit.calledWith(reqBodyObj)).to.be.true;
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(resultObj.response)).to.be.true;
            });
        });
        describe('deleteSale', () => {
            it('retorna as informações corretas no status e json', async () => {
            const resultObj = { response: { id: 5, name: 'teste', quantity: 50 }, code: 200 };
            reqParamsObj = { id: 5 };
            req.params = reqParamsObj;
    
            sinon.stub(salesServices, "deleteSale").resolves(resultObj);
            await salesControllers.deleteSale(req, res);
    
            expect(salesServices.deleteSale.calledWith(reqParamsObj.id)).to.be.true;
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(resultObj.response)).to.be.true;
            });
        });
    });
});