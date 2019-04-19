const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port =  8000 || process.env.PORT;

app.get('/', (req, res) => res.send('Node Ecommerce project :)'));

app.listen(port, () => console.log(`App listening on port ${port}`));