const { tokenchecker } = require("../../lib/tokenchecker")
const { companysGETModel, companysPOSTModel, companyOwnerGETModel, companysWorkersGETModel, companysWorkersPermissionGETModel, companysWorkersPermissionPOSTModel, superAdminUsersGETModel, masterPostModel } = require("./model")

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
                const checked_id = await tokenchecker(req.body.token)
                if (checked_id.id) {
                    
                    if (!checked_id) {
                        return res.json({
                            status: 400,
                            message: 'error on keys'
                        })
                    } else {
                        const check = await superAdminUsersGETModel(checked_id.id)
                        if (check === 401) {
                            return res.json({
                                status: 201,
                                message: 'users not found'
                            })
                        } else if (check === 400) {
                            return res.json({
                                status: 400,
                                message: 'you are not owner'
                            })
                        } else {
                            return res.json({
                                status: 200,
                                message: 'permissions access writed',
                                data: check
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
        console.log(error.message, 'superAdminUsersGETCTRL');
    }
}

const masterPostCTRL = async (req, res) => {
    try {
        const { fullname, login, password, company_id } = req.body
        if (!fullname || fullname.length > 56 || !login || login.length > 54 || !password || password.toString().length > 7 || typeof password != 'number' || !company_id || company_id > 99 ) {
            const checked_id = await tokenchecker(req.body.token)
            if (checked_id.id) {
                
                if (!checked_id) {
                    return res.json({
                        status: 400,
                        message: 'token has not provided'
                    })
                } else {
                    const check = await masterPostModel(checked_id.id, req.body)
                    if (check === 400) {
                        return res.json({
                            status: 400,
                            message: 'you are not owner'
                        })
                    } else {
                        return res.json({
                            status: 200,
                            message: 'user has writed'
                        })
                    }
                }
            } else {
                return req.json({
                    status: 400,
                    message: `you do'nt have token`
                })
            }
        } else {
            return req.json({
                status: 400,
                message: `error on keys`
            })
        }
    } catch (error) {
        console.log(error.message, 'superAdminUsersGETCTRL');
    }
}

module.exports = {
    companysGETCTRL,
    companyPOSTCTRL,
    companyOwnerGETCtrl,
    companyWorkersGETCTRL,
    companysWorkersPermissionGETCTRL,
    companysWorkersPermissionPOSTCTRL,
    superAdminUsersGETCTRL,
    masterPostCTRL
}