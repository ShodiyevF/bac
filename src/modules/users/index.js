const { companysGETCTRL, companyPOSTCTRL, companyOwnerGETCtrl, companyWorkersGETCTRL } = require('./ctrl')

const express = require('express').Router()

express.post('/companys', (req, res) => companysGETCTRL(req, res))
express.post('/companys/create', (req, res) => companyPOSTCTRL(req, res))
express.post('/companys/owner', (req, res) => companyOwnerGETCtrl(req, res))
express.post('/companys/workers', (req, res) => companyWorkersGETCTRL(req, res))

module.exports = express