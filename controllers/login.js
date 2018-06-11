var login = async (ctx, next) => {
	const monk = require('monk');
	const db = monk("localhost/admin")

	let requestData = ctx.request.body;
	let userName = requestData.userName;
	let passWord = requestData.passWord;

	let query = ()=>{
		return new Promise((resolve,reject)=>{
			db.get("userInfo").find({userName}).then((doc)=>{
				if(doc){
					resolve(doc)
				}
			})
		})
	}
	let result=await query();

	let dbUserName = result[0].userName;
	let dbPassWord = result[0].passWord;
	if(userName==dbUserName&&passWord==dbPassWord){
		ctx.body={
			code:200,
			message:"登陆成功"
		}
	}
};

module.exports = {
    'POST /api/login': login
};
