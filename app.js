const Koa=require("koa");
const app=new Koa();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const monk = require('monk');
const url = 'localhost:27017/yay';
const db = monk(url);

db.then(() => {
    console.log('Connected correctly to server');
    app.use(controller());
})

app.use(bodyParser());
app.listen(3000);
console.info("localhost:3000...");