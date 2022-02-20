require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const salesMiddleware = require('./middlewares/validateSale');
const productsMiddleware = require('./middlewares/validateProduct');

const productsControllers = require('./controllers/productsControllers');
const salesControllers = require('./controllers/salesControllers');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.post('/products', productsMiddleware.validateProduct, productsControllers.createProduct);
app.get('/products', productsControllers.getAll);

app.post('/sales', salesMiddleware.validateSale, salesControllers.createSale);
app.get('/sales', salesControllers.getAll);

app.get('/products/:id', productsControllers.getById);
app.put('/products/:id', productsMiddleware.validateProduct, productsControllers.update);
app.delete('/products/:id', productsControllers.deleteProduct);

app.delete('/sales/:id', salesControllers.deleteSale);
app.get('/sales/:id', salesControllers.getById);
app.put('/sales/:id', salesMiddleware.validateSale, salesControllers.edit);
