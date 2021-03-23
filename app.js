const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const page404 = require("./controllers/404");

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use(page404.page404);

app.listen(3000);
