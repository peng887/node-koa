var index = async (ctx, next) => {

    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
        const crypto = require('crypto');
        const secret = 'fasd';
      const hash = crypto.createHmac('sha256', secret)
                         .update('I love cupcakes')
                         .digest('hex');
      console.log(hash);
};



module.exports = {
    'GET /': index
};
