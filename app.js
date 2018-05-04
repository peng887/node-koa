const Koa=require("koa");
const app=new Koa();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');


app.use(bodyParser());
app.use(controller());
app.listen(3000);
console.info("localhost:3000...");