const { jwtkey } = require('../config');

const express = require('express').Router()
const jwt = require('jsonwebtoken')

express.post('/checktoken', async (req, res) => {
    try {
        if (req.body.token) {
            const checktoken = jwt.verify(req.body.token, jwtkey, (err) => {
                if (err) {
                    return res.json({
                        status: 404
                    })
                }
            })
            if(checktoken || req.body.token != null){
                return res.json({
                    status: 200,
                    message: 'user have in base',
                    user_id: checktoken
                })
            }
        } else {
            return res.json({
                status: 400,
                message: 'user has not in base'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = express