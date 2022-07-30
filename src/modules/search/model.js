const { uniqRow } = require("../../lib/pg")

const searchModel = async (key, token, company_id) => {
    try {
        console.log('asd');
        let results
        let phone = key.test('^998[389][012345789][0-9]{7}$')
        console.log(phone);
        
        if (key.toString()[0] === '#'){
            const owner = await uniqRow('select * from company where company_owner = $1', token.id)
            
            
            const companys = await uniqRow('select * from users where user_id = $1 and company_id = $2', token.id, company_id)
            const row = +company_id
            const birniam = companys.rows.find(el => el.company_id === row)
            const mycompany = companys.rows[row > companys.rows.length ? 0 : row === 0 ? 0 : row - 1]
            // console.log(mycompany);
            const query = `
            select
            *
            from orders as o
            inner join clients as c on c.company_id = o.company_id
            where ${owner.rows.length ? 'o.company_id = $1 and o.order_id = $2 and o.client_id = c.client_id' : 'o.company_id = $1 and o.order_id = $2 and o.client_id = c.client_id'}
            order by order_id desc
            `
            results  = await uniqRow(query, birniam.company_id, key.split('#')[1])
        } else if (key.toString()[0] === '@') {

            const owner = await uniqRow('select * from company where company_owner = $1', token.id)

            const query = `
            select
            *
            from clients as cl
            inner join users as u on u.company_id = cl.company_id
            inner join company as c on c.company_id = cl.company_id
            where ${owner.rows.length ? 'u.user_id = $1 and u.company_id = $2 and cl.client_id = $3' : 'u.user_id = $1 and u.company_id = $2 and cl.client_id = $3 and cl.client_delete = 0'}
            order by cl.client_id desc;
            
            `
            
            const companys = (await uniqRow('select * from users where user_id = $1 and company_id = $2', token.id, company_id)).rows
            
            const findedCompany = companys.find(el => el.company_id === +company_id)
            
            results = await uniqRow(query, token.id, findedCompany.company_id, key.split('@')[1])
            
            // results = await uniqRow(`select * from clients where client_id = $1`, key.split('@')[1])
            
        } else if (key.toString()[0] === '@') {

            const owner = await uniqRow('select * from company where company_owner = $1', token.id)

            const query = `
            select
            *
            from clients as cl
            inner join users as u on u.company_id = cl.company_id
            inner join company as c on c.company_id = cl.company_id
            where ${owner.rows.length ? 'u.user_id = $1 and u.company_id = $2 and cl.client_id = $3' : 'u.user_id = $1 and u.company_id = $2 and cl.client_id = $3 and cl.client_delete = 0'}
            order by cl.client_id desc;
            
            `

            const companys = (await uniqRow('select * from users where user_id = $1 and company_id = $2', token.id, company_id)).rows

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