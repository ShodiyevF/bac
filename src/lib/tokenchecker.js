const jwt = require("jsonwebtoken")
const { jwtkey } = require("../config")

const tokenchecker = (token) => {
    try {
        const checktoken = jwt.verify(token, jwtkey)
        return checktoken
    } catch (error) {
        console.log(error.message, 'tokenchecker');
    }
}

module.exports = {
    tokenchecker
}