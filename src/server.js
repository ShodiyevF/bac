const jwt = require('jsonwebtoken')
const express = require('express')
const helmet = require('helmet')
const app = express()
app.use(express.json())
app.use(helmet())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const auth = require('./modules/auth/index')
const users = require('./modules/clients/index');
const orders = require('./modules/orders/index');
const checktoken = require('./lib/chechtokenapi');
const companys = require('./modules/users/index');
// const search = require('./modules/search/index');

app.use(auth)
app.use(users)
app.use(orders)
app.use(checktoken)
app.use(companys)
// app.use(search)

app.get('/', (req, res) => {
    res.send('home')
})


app.listen(4100, console.log('server running on 4000 port'))