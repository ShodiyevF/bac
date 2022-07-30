const { uniqRow } = require("../../lib/pg")

const ordersGETModel = async (user_id, company_id) => {
    try {
        const owner = await uniqRow('select * from company where company_owner = $1', user_id)
        const companys = await uniqRow('select * from users where company_id = $1 and user_id = $2', company_id, user_id)
        const companysowner = await uniqRow('select * from company where company_id = $1 and company_owner = $2', company_id, user_id)
        const row = +company_id
        const birniam = ((companys.rows.length ? companys : companysowner)).rows.find(el => el.company_id === row)
        const mycompany = companys.rows[row > companys.rows.length ? 0 : row === 0 ? 0 : row - 1]
        const query = `
        select
        *
        from orders as o
        inner join clients as c on c.company_id = o.company_id
        where ${owner.rows.length ? 'o.company_id = $1 and o.client_id = c.client_id' : 'o.company_id = $1 and o.client_id = c.client_id and o.order_deleted = 0'}
        order by order_id desc
        `
        const orders = await uniqRow(query, birniam.company_id)
        return orders
        
    } catch (error) {
        console.log(error.message);
    }
}

const ordersPOSTModel = async ({order_device_type, order_device_name, order_device_bug, order_over_time, order_price, order_about}, client_id, company_id) => {
    try {
        
        const user = await uniqRow('select * from clients where client_id = $1 and  company_id = $2', client_id, company_id)
        
        if (user.rows.length) {
            const query = `insert into orders (order_status, order_device_type,  order_device_name, order_device_bug, order_over_time, order_price, order_about, client_id, company_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
            const overtime = new Date().getHours() + ':' +  new Date().getMinutes()
            await uniqRow(query, 1, order_device_type, order_device_name, order_device_bug, order_over_time + "|" + overtime, order_price, order_about, client_id, company_id)
            return true
        } else {
            return false
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

const orderOneGETModel = async (client_id, company_id) => {
    try {
        const query = `select * from orders where client_id = $1 and company_id = $2 order by order_id desc`
        return await uniqRow(query, client_id, company_id)
    } catch (error) {
        console.log(error.message); 
    }
}

const orderUPDATEStatusModel = async ({status, order_id, company_id}) => {
    try {

        const query = `
        update orders set order_status = $1 where order_id = $2 and company_id = $3`
        
        const send = await uniqRow(query, status, order_id, company_id)
        
    } catch (error) {
        console.log(error.message, 'ORDER UPDATE STATUS MODEL')
    }
}

module.exports = {
    ordersGETModel,
    ordersPOSTModel,
    orderOneGETModel,
    orderUPDATEStatusModel
}