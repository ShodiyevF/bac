const { uniqRow } = require("../pg")
const { tokenchecker } = require("../tokenchecker")

const permissionCtrl = async (user_id, nameId, actionId) => {
    
    try {
        // const companys = await uniqRow('select * from users where company_id = $1 and user_id = $2', company_id, user_id)
        
        const query = `
        select
        *
        from permissions_access as pc
        inner join users as u on u.user_id = pc.user_id
        where u.user_id = $1;
        `

        const test = await uniqRow(query, user_id == 0 ? user_id+1: user_id)
        
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

