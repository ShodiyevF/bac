const { uniqRow } = require("../../lib/pg")

const searchModel = async (key, token, company_id) => {
    try {
        let results
        
        if (key.toString()[0] === '#'){
            const companys = await uniqRow('select * from company where user_id = $1', token.id)
            const row = +company_id
            const birniam = companys.rows.find(el => el.company_id === row)
            const mycompany = companys.rows[row > companys.rows.length ? 0 : row === 0 ? 0 : row - 1]
            const query = `
            select
            *
            from orders as o
            inner join clients as c on c.client_id = o.client_id
            where o.company_id = $1 and o.order_id = $2
            `
            results  = await uniqRow(query, birniam.company_id, key.split('#')[1])
        } else if (key.toString()[0] === '@') {
            const query = `
            select
            *
            from clients as cl
            inner join company as c on c.company_id = cl.company_id
            where c.user_id = $1 and c.company_id = $2 and cl.client_id = $3
            `
            
            const companys = (await uniqRow('select * from company where user_id = $1', token.id)).rows
            
            const findedCompany = companys.find(el => el.company_id === +company_id)
            
            results = await uniqRow(query, token.id, findedCompany.company_id, key.split('@')[1])
            
            // results = await uniqRow(`select * from clients where client_id = $1`, key.split('@')[1])
            
        } else {    
            return 400
        }
        return results
        // const filter1 = await uniqRow(`select * from ${key.toString()[0] === '#' ? 'orders' : key.toString()[0] === '@' ? 'clients' : 'clients'}`)
    } catch (error) {
        console.log(error.message, 'searchModel');
    }
}

module.exports = {
    searchModel
}