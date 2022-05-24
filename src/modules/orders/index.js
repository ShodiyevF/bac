const { orderGETCtrl, orderPOSTCtrl, orderOneGETCtrl, orderUPDATEStatusCtrl } = require('./ctrl')

const express = require('express').Router()

express.post('/orders', (req, res) => orderGETCtrl(req, res))
express.post('/postorders', (req, res) => orderPOSTCtrl(req, res))
express.post('/order', (req, res) => orderOneGETCtrl(req, res))
express.put('/order', (req, res) => orderUPDATEStatusCtrl(req, res))

module.exports = express