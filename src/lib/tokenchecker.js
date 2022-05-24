const jwt = require("jsonwebtoken")
const { jwtkey } = require("../config")

const tokenchecker = (token) => {
    const checktoken = jwt.verify(token, jwtkey)
    return checktoken
}

module.exports = {
    tokenchecker
}