const { uniqRow } = require("../pg")
const { tokenchecker } = require("../tokenchecker")

const permissionCtrl = async (company_id, nameId, actionId, user_id) => {
    
    try {
        const companys = await uniqRow('select * from company where user_id = $1', user_id)
        
        const query = `
        select
        *
        from permissions_access as pc
        inner join company as c on c.company_id = pc.company_id
        where c.company_id = $1;
        `

        const test = await uniqRow(query, company_id == 0 ? company_id+1: company_id)
        
        const permissionsModel = test.rows
        const permission = permissionsModel.find(el => el.permissions_names_id === nameId && el.action_id === actionId)
        
        return permission
    } catch (error) {
        console.log(error.message, 'permissions');
    }
}

module.exports = {
    permissionCtrl
}

