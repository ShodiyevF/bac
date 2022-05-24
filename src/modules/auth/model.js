const { uniqRow } = require('./../../lib/pg')

const login = async ({ login, password }) => {
    try {
        const users = await uniqRow('select * from users where user_login = $1 and user_password = $2', login, password)
        if (users.rows.length) {
            return users.rows[0]
        } else {
            return 400
        }
    } catch (error) {
        console.log(error.message);
    }
}


const register = async ({ fullname, login, password }) => {
    try {
        const users = await uniqRow('select * from users where user_login = $1', login)
        if (users.rows.length) {
            return 'this user have in programm'
        } else {
            await uniqRow(`insert into users (user_fullname, user_login, user_password) values ($1, $2, $3)`, fullname, login, password)
        }
    } catch (error) {
        console.log(error.message);
    }
}


const recoverPassword = async ({ login }, password) => {
    try {
        console.log(login);
        return await uniqRow(`update users set user_password = $1 where user_login = $2;`, password, login)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    login,
    register,
    recoverPassword
}