const { checkcompany } = require("../../lib/checkcompany");
const { permissionCtrl } = require("../../lib/permissions/ctrl");
const { tokenchecker } = require("../../lib/tokenchecker");
const { ordersGETModel, ordersPOSTModel, orderOneGETModel, orderUPDATEStatusModel } = require("./model")

const orderGETCtrl = async (req, res) => {
    try {
        if (req.body.token) {
            const read = permissionCtrl((+req.body.company_id), 1, 2, tokenchecker(req.body.token).id)
            if (await checkcompany(tokenchecker(req.body.token).id, +(req.body.company_id))) {
                if (await read) {
                    // console.log(await ordersGETModel(+(tokenchecker(req.body.token).id), req.body.company_id ? req.body.company_id - 1 : 0));
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
        console.log(error.message, 'order get');
    }
}

const orderPOSTCtrl = async (req, res) => {
    try { 
        if (req.body.token) {
            const write = permissionCtrl((req.body.company_id) - 1, 2, 2, tokenchecker(req.body.token).id)
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
        console.log(error.message, 'ORDER POST');
    }
}

const orderOneGETCtrl = async (req, res) => {
    try {
        if (req.body.token) {
            const write = permissionCtrl((req.body.company_id) - 1, 1, 2, tokenchecker(req.body.token).id)
            if (await write) {
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
        console.log(error.message, 'order one get')
    }
}

const orderUPDATEStatusCtrl = async (req, res) => {
    try {
        if(req.body.token){
            const update = permissionCtrl((req.body.company_id) - 1, 4, 2, tokenchecker(req.body.token).id)

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
        console.log(error.message, 'ORDER UPDATE STATUS CTRL')
    }
}

module.exports = {
    orderGETCtrl,
    orderPOSTCtrl,
    orderOneGETCtrl,
    orderUPDATEStatusCtrl
}