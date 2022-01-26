require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// const productsMiddlewares = require('./middlewares/productsMiddlewares');
const productsControllers = require('./controllers/productsControllers');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

// app.use(productsMiddlewares.getAllProducts);

app.post('/products', productsControllers.createProduct);
app.get('/products', productsControllers.getAll);
app.get('/products/:id', productsControllers.getById);
app.put('/products/:id', productsControllers.update);
app.delete('/products/:id', productsControllers.deleteProduct);
