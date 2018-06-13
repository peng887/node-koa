var signIn = async (ctx, next) => {
	const monk = require('monk');
	const db = monk("localhost/admin")
	const crypto = require('crypto');
	const secret = '29aisf928af9poir9284wqefuass'
	const setToken = token => {
		let hash = crypto.createHmac('sha256', secret).update(token).digest('hex')
		return hash
	}

	const requestData = ctx.request.body;
	const userName = requestData.userName;
	const passWord = requestData.passWord;

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

	if(result==""){
		ctx.body={
			success:false,
			message:"用户名不存在"
		}
	}else{
		let dbUserId = result[0].id
		let dbUserName = result[0].userName
		let dbPassWord = result[0].passWord
 		if(userName==dbUserName&&passWord!=dbPassWord){
			ctx.body={
				success:false,
				message:"密码错误"
			}
		}else	if(userName==dbUserName&&passWord==dbPassWord){
			let n = Number(ctx.cookies.get('view') || 0) + 1;
			ctx.cookies.set('view', n);
			let token = setToken(dbUserId+dbUserName+n)//n也可以用时间戳代替
	 		ctx.body={
				success:true,
				message:"登录成功",
				token:token
	 		}
	 	}
	}

};

module.exports = {
    'POST /api/signIn': signIn
};
