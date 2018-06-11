var signIn = async (ctx, next) => {
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

	if(result==""){
		ctx.body={
			success:false,
			message:"用户名不存在"
		}
	}else{
		let dbUserName = result[0].userName;
		let dbPassWord = result[0].passWord;
 		if(userName==dbUserName&&passWord!=dbPassWord){
			ctx.body={
				success:false,
				message:"密码错误"
			}
		}else	if(userName==dbUserName&&passWord==dbPassWord){
	 		ctx.body={
				success:true,
				message:"登录成功"
	 		}
	 	}
	}

};

module.exports = {
    'POST /api/signIn': signIn
};
