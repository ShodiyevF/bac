const { companysGETCTRL, companyPOSTCTRL, companyOwnerGETCtrl, companyWorkersGETCTRL, companysWorkersPermissionGETCTRL, companysWorkersPermissionPOSTCTRL } = require('./ctrl')

const express = require('express').Router()

express.post('/companys', (req, res) => companysGETCTRL(req, res))
express.post('/companys/create', (req, res) => companyPOSTCTRL(req, res))
express.post('/companys/owner', (req, res) => companyOwnerGETCtrl(req, res))
express.post('/companys/workers', (req, res) => companyWorkersGETCTRL(req, res))
express.post('/companys/workers/permissions/get', (req, res) => companysWorkersPermissionGETCTRL(req, res))
express.post('/companys/workers/permissions/post', (req, res) => companysWorkersPermissionPOSTCTRL(req, res))

module.exports = express