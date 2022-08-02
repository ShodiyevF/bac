const { clientGETCtrl, clientPOSTCtrl, clientStatusPUTCtrl, clientCTRL, clientDELETECtrl, clientPUTCtrl } = require('./ctrl')

const express = require('express').Router()

express.post('/users', (req, res) => clientGETCtrl(req, res))
express.post('/userspost', (req, res) => clientPOSTCtrl(req, res))
express.put('/userstatus', (req, res) => clientStatusPUTCtrl(req, res))
express.delete('/userdelete', (req, res) => clientDELETECtrl(req, res))
express.put('/user/put', (req, res) => clientPUTCtrl(req, res))
express.get('/e', (req, res) => clientCTRL(req, res))

module.exports = express