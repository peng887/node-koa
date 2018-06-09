var login = async (ctx, next) => {
	const monk = require('monk');
	const db = monk("localhost/test")

	let query=()=>{
		return new Promise((resolve,reject)=>{
			db.get('userName').find({}).then((doc)=>{
				if(doc){
					resolve(doc)
				}
			})
		})
	}
	db.get("userName").insert([
			{userName:"ccc"},
			{userName:"bbb"}
	])
	let result=await query();
	ctx.body=result;

};

module.exports = {
    'GET /api/login': login
};
