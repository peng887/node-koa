var login = async (ctx, next) => {

  const n = Number(ctx.cookies.get('view') || 0) + 1;
  ctx.cookies.set('view', n);
  ctx.response.body = n + ' views';

}
module.exports = {
	'GET /api/login': login
}