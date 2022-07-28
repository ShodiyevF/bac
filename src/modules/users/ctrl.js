const { tokenchecker } = require("../../lib/tokenchecker")
const { companysGETModel, companysPOSTModel, companyOwnerGETModel, companysWorkersGETModel, companysWorkersPermissionGETModel, companysWorkersPermissionPOSTModel, superAdminUsersGETModel } = require("./model")

const companysGETCTRL = async (req, res) => {
    try {
        if (req.body.token) {
            const token = tokenchecker(req.body.token)
            if (token.id) {
                const data = await companysGETModel(req.body.company_id, token.id)
                if (data === 400) {
                    res.json({
                        status: 400,
                        message: 'companys not sended'
                    })
                } else {
                    res.json({
                        status: 200,
                        message: 'companys sended',
                        data: data.rows
                    })
                }
            } else {
                res.json({
                    status: 404,
                    message: 'you dont have token'
                })
            }
        }
        
    } catch (error) {
        console.log(error.message, 'companysGETCTRL'); 
    }
}

const companyOwnerGETCtrl = async (req, res) => {
    try {
        const test = await companyOwnerGETModel((tokenchecker(req.body.token)).id)
        if (test == 200) {
            res.json({
                status: 200,
                message: 'company owner hehe'
            })
        } else {
            res.json({
                status: 400,
                message: 'not owner'
            })
        }
    } catch (error) {
        console.log(error.message, 'companysGETCTRL');
    }
}

const companyPOSTCTRL = async (req, res) => {
    try {
        if (req.body.token && req.body.company_name ) {
            const token = await tokenchecker(req.body.token)
            if (token.id) {
                const check = await companysPOSTModel(token.id, req.body.company_name)
                if (check == 200) {
                    return res.json({
                        status: 200,
                        message: 'companys has writed'
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: 'you are not owner'
                    })
                }
            } else {
                return req.json({
                    status: 400,
                    message: `you do'nt have token`
                })
            }
        }
    } catch (error) {
        console.log(error.message, 'companyPOSTCTRL'); 
    }
}

const companyWorkersGETCTRL = async (req, res) => {
    try {
        if (req.body.token) {
            const token = await tokenchecker(req.body.token)
            if (token) {
                if (token.id) {
                    const check = await companysWorkersGETModel(token.id)
                    if (check === 400) {
                        return res.json({
                            status: 400,
                            message: 'you are not owner'
                        })
                    } else {
                        return res.json({
                            status: 200,
                            message: 'workers sended',
                            data: check.rows
                        })
                    }
                } else {
                    return res.json({
                        status: 400,
                        message: `you do'nt have token`
                    })
                }
            } else {
                return res.json({
                    status: 400,
                    message: `you do'nt have token`
                })
            }
        }
    } catch (error) {
        console.log(error.message, 'companyWorkersGETCTRL');
    }
}

const companysWorkersPermissionGETCTRL = async (req, res) => {
    try {
        if (req.body.token) {
            const token = await tokenchecker(req.body.token)
            if (token.id) {
                const check = await companysWorkersPermissionGETModel(token.id, req.body.user_id)
                if (check === 400) {
                    return res.json({
                        status: 400,
                        message: 'you are not owner'
                    })
                } else {
                    return res.json({
                        status: 200,
                        message: 'permissions access sended',
                        data: check.rows
                    })
                }
            } else {
                return req.json({
                    status: 400,
                    message: `you do'nt have token`
                })
            }
        }
    } catch (error) {
        console.log(error.message, 'companyWorkersGETCTRL');
    }
}

const companysWorkersPermissionPOSTCTRL = async (req, res) => {
    try {
        if (req.body.token) {
            const token = await tokenchecker(req.body.token)
            if (token.id) {

                const { action, name } = req.body
                
                if (!action || !name || action > 4 || name > 4) {
                    return res.json({
                        status: 400,
                        message: 'error on keys'
                    })
                } else {
                    const check = await companysWorkersPermissionPOSTModel(token.id, req.body.user_id, req.body)
                    if (check === 201) {
                        return res.json({
                            status: 201,
                            message: 'this access has writed and this access deleted'
                        })
                    } else if (check === 400) {
                        return res.json({
                            status: 400,
                            message: 'you are not owner'
                        })
                    } else {
                        return res.json({
                            status: 200,
                            message: 'permissions access writed'
                        })
                    }
                }
            } else {
                return req.json({
                    status: 400,
                    message: `you do'nt have token`
                })
            }
        }
    } catch (error) {
        console.log(error.message, 'companyWorkersGETCTRL');
    }
}

const superAdminUsersGETCTRL = async (req, res) => {
    try {
        if (req.params.p === '4312') {
            if (req.body.token) {
                const token = await tokenchecker(req.body.token)
                if (token.id) {

                    const { token } = req.body

                    if (!token) {
                        return res.json({
                            status: 400,
                            message: 'error on keys'
                        })
                    } else {
                        const check = await superAdminUsersGETModel(token.id)
                        if (check === 201) {
                            return res.json({
                                status: 201,
                                message: 'this access has writed and this access deleted'
                            })
                        } else if (check === 400) {
                            return res.json({
                                status: 400,
                                message: 'you are not owner'
                            })
                        } else {
                            return res.json({
                                status: 200,
                                message: 'permissions access writed'
                            })
                        }
                    }
                } else {
                    return req.json({
                        status: 400,
                        message: `you do'nt have token`
                    })
                }
            }
        }
    } catch (error) {
        console.log(error.message, 'companyWorkersGETCTRL');
    }
}

module.exports = {
    companysGETCTRL,
    companyPOSTCTRL,
    companyOwnerGETCtrl,
    companyWorkersGETCTRL,
    companysWorkersPermissionGETCTRL,
    companysWorkersPermissionPOSTCTRL,
    superAdminUsersGETCTRL
}