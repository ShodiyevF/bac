const { uniqRow } = require("./pg")

const checkcompany = async (company_id) => {
    try {
        const mycompany = await uniqRow('select * from company where company_id = $1 ', company_id === 0 ? 1 : company_id)
        return mycompany.rows[0]
    } catch (error) {
        console.log(error.message, 'checkcompany');
    }
}

module.exports = {
    checkcompany
}