const { uniqRow } = require("../../lib/pg")

const searchModel = async (key, token, company_id, action) => {
    try {
        let results
        let regex = new RegExp('^[+]998[389][012345789][0-9]{7}$')
        let phone = regex.test(key)

    
        if (key.toString()[0] === '#'){
            const owner = await uniqRow('select * from company where company_owner = $1', token.id)

            const adminquery = `
            select
            *
            from company
            where company_id = $1
            `
            
            const companys = await uniqRow(adminquery, company_id)
            const mycompany = companys.rows[+company_id > companys.rows.length ? 0 : +company_id === 0 ? 0 : +company_id - 1]
            const query = `
            select
            *
            from orders as o
            inner join clients as c on c.company_id = o.company_id
            where ${owner.rows.length ? 'o.company_id = $1 and o.order_id = $2 and o.client_id = c.client_id' : 'o.company_id = $1 and o.order_id = $2 and o.client_id = c.client_id'}
            order by order_id desc
            `
            results = await uniqRow(query, companys.rows[0].company_id, key.split('#')[1])
        } else if (key.toString()[0] === '@') {

            const owner = await uniqRow('select * from company where company_owner = $1', token.id)

            const query = `
            select
            *
            from clients as cl
            inner join users as u on u.company_id = cl.company_id
            inner join company as c on c.company_id = cl.company_id
            where ${owner.rows.length ? 'c.company_id = $1 and cl.client_id = $2' : 'c.company_id = $1 and cl.client_id = $2 and cl.client_delete = 0'}
            `
            
            const companyquery = await uniqRow('select * from company where company_id = $1', company_id)

            results = await uniqRow(query, +(companyquery.rows[0].company_id), +(key.split('@')[1]))
            
            // results = await uniqRow(`select * from clients where client_id = $1`, key.split('@')[1])
            
        } else if (phone) {
            
            const owner = await uniqRow('select * from company where company_owner = $1', token.id)

            const query = `
            select
            *
            from clients as cl
            inner join users as u on u.company_id = cl.company_id
            inner join company as c on c.company_id = cl.company_id
            where ${owner.rows.length ? 'u.user_id = $1 and u.company_id = $2 and cl.client_phone_number_first = $3 or cl.client_phone_number_second = $3' : 'u.user_id = $1 and u.company_id = $2 and cl.client_id = $3 and cl.client_delete = 0'}
            order by cl.client_id desc;
            `
            
            const queryo = `
            select
            *
            from orders as o
            inner join company as c on c.company_id = o.company_id
            inner join clients as cl on cl.company_id = c.company_id
            inner join users as u on u.company_id = c.company_id
            where ${owner.rows.length ? 'u.user_id = $1 and u.company_id = $2 and o.client_id = cl.client_id and cl.client_phone_number_first = $3 or cl.client_phone_number_second = $3' : 'u.user_id = $1 and u.company_id = $2 and cl.client_id = $3 and cl.client_delete = 0'}
            `

            const companys = (await uniqRow('select * from users where user_id = $1 and company_id = $2', token.id, company_id)).rows

            const findedCompany = companys.find(el => el.company_id === +company_id)

            results = await uniqRow(action == 1 ? query : queryo, token.id, findedCompany.company_id, key.split('+')[1])

        } else {
            return 400
        }
        return results
        
    } catch (error) {
        console.log(error.message, 'searchModel');
    }
}

module.exports = {
    searchModel
}