const { checkcompany } = require("../../lib/checkcompany");
const { permissionCtrl } = require("../../lib/permissions/ctrl");
const { tokenchecker } = require("../../lib/tokenchecker");
const { ordersGETModel, ordersPOSTModel, orderOneGETModel, orderUPDATEStatusModel } = require("./model")

const orderGETCtrl = async (req, res) => {
    try {
        if (req.body.token) {
            const read = permissionCtrl(tokenchecker(req.body.token).id, 1, 2)
            if (await checkcompany(+(req.body.company_id))) {
                if (await read) {
                    return res.json({
                        status: 200,
                        message: 'data has sended',
                        data: (await ordersGETModel(+(tokenchecker(req.body.token).id), +(req.body.company_id) ? +(req.body.company_id) : 0)).rows
                    })
                } else { 
                    return res.json({
                        status: 400,
                        message: 'you dont have any permissions'
                    })
                }
            } else {
                return res.json({
                    status: 404,
                    message: 'this company not found !!'
                })
            }
        } else {
            return res.json({
                status: 404,
                message: 'you need token'
            })
        }
    } catch (error) {
        console.log(error.message, 'orderGETCtrl');
    }
}

const orderPOSTCtrl = async (req, res) => {
    try { 
        if (req.body.token) {            
            const write = permissionCtrl(tokenchecker(req.body.token).id, 2, 2)
            if (await write) {
                const writeData = await ordersPOSTModel(req.body, req.body.client_id, req.body.company_id)
                if (writeData) {
                    return res.json({
                        status: 200,
                        message: 'data has write',
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: 'data has not writed, client not found in this company',
                    })
                }
            } else {
                return res.json({
                    status: 400,
                    message: 'you dont have any permissions'
                })
            }
        } else {
            return res.json({
                status: 404,
                message: 'you need token'
            })
        }
    } catch (error) {
        console.log(error.message, 'orderPOSTCtrl');
    }
}

const orderOneGETCtrl = async (req, res) => {
    try {
        if (req.body.token) {
            const read = permissionCtrl(tokenchecker(req.body.token).id, 1, 2)
            if (await read  ) {
                return res.json({
                    status: 200,
                    message: 'data has sended',
                    data: await (await orderOneGETModel(req.body.client_id, req.body.company_id)).rows
                })
            } else {
                return res.json({
                    status: 404,
                    message: 'you dont have any permissions'
                })
            }
        } else {
            return res.json({
                status: 404,
                message: 'you need token'
            })
        }
    } catch (error) {
        console.log(error.message, 'orderOneGETCtrl')
    }
}

const orderUPDATEStatusCtrl = async (req, res) => {
    try {
        if(req.body.token){
            const update = permissionCtrl((tokenchecker(req.body.token)).id, 4, 2)            
            if (await update) { 
                if (req.body.status && typeof req.body.status === 'number' && req.body.status <= 8 && req.body.company_id && typeof req.body.company_id === 'number' && req.body.order_id && typeof req.body.order_id === 'number') {
                    const updateSTATUS = await orderUPDATEStatusModel(req.body)
                    return res.json({
                        status: 200,
                        message: 'data has updated'
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: 'data has not updated, keys not have or keys wrong'
                    })
                }
            } else {
                return res.json({
                    status: 404,
                    message: 'you dont have any permissions'
                })
            }
            
        } else {
            return res.json({
                status: 404,
                message: 'you need token'
            })
        }
    } catch (error) {
        console.log(error.message, 'orderUPDATEStatusCtrl')
    }
}



module.exports = {
    orderGETCtrl,
    orderPOSTCtrl,
    orderOneGETCtrl,
    orderUPDATEStatusCtrl
}