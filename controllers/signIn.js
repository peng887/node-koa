var signIn = async (ctx, next) => {
	const MongoClient = require('mongodb').MongoClient
	const crypto = require('crypto');
	const secret = '29aisf928af9poir9284wqefuass'
	const setToken = token => {
		let hash = crypto.createHmac('sha256', secret).update(token).digest('hex')
		return hash
	}
	const time = new Date().getTime()
	const requestData = ctx.request.body
	const userName = requestData.userName
	const passWord = requestData.passWord

	let query = ()=>{
		return new Promise((resolve,reject)=>{
			MongoClient.connect('mongodb://localhost:27017/admin',(err,db) => {
				db.collection('userInfo').find({userName:userName}).toArray((err,res) => {
					if(res){
						resolve(res)
					}
				})
				db.close()
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
			let token = setToken(dbUserId+'&'+dbUserName+'&'+time)
			MongoClient.connect('mongodb://localhost:27017/admin',(err,db) => {
				db.collection('userInfo').update({userName:userName},{$set:{token:token}})
				db.close()
			})
	 		ctx.body={
				success:true,
				message:"登录成功",
				token:token
	 		}
	 	}
	}
}

module.exports = {
    'POST /api/signIn': signIn
}
