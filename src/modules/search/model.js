const { uniqRow } = require("../../lib/pg")

const search = async (e) => {
    try {
        let results = []
        const filter1 = await uniqRow(`select * from ${e.toString()[0] === '#' ? 'orders' : 'clients'}`)
        const filter2 = await uniqRow(`select * from ${e.toString()[0] === '#' ? 'orders' : 'clients'}`)
        
        console.log((await asdd).rows);
    } catch (error) {
        
    }
}

search('asdasd')