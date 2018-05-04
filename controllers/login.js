var login = async (ctx, next) => {
	const monk = require('monk');
	const url = 'localhost:27017/yay';
	const db = monk(url);
	db.then(() => {
	    console.log('Connected correctly to server');
	})
    
	let query=()=>{
		return new Promise((resolve,reject)=>{
			db.get('user').find({}).then((doc)=>{
				if(doc){
					resolve(doc)
				}
			})
		})
	}
	let result=await query();
	ctx.body=result;	
};
	


module.exports = {
    'GET /api/login': login
};