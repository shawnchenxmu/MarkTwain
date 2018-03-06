const Koa = require('koa')
const send = require('koa-send')
const Router = require('koa-router')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.dev.config')

const DEVPORT = 3001

const app = new Koa()
const router = new Router()

router.get('/', async function(ctx) {
	await send(ctx, 'entry/index.html')
})

router.get('**/react.min.js', async function (ctx) {
  await send(ctx, 'entry/react-with-addons.js')
})
router.get('**/react-dom.min.js', async function (ctx) {
  await send(ctx, 'entry/react-dom.js')
})

app.use(router.routes())

app.listen(3000, function () {
  console.log('server running on http://localhost:3000')
})

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	headers: { 'Access-Control-Allow-Origin': '*' },
	hot: true,
	lazy: false,
	quiet: false,
	noInfo: false,
	stats: {
		colors: true
	}
}).listen(DEVPORT, 'localhost', function(err, result) {
	if (err) {
		return console.log(err)
	}
})

router.get('**/*.js(on)?', async function (ctx) {
  ctx.redirect(`http://localhost:${DEVPORT}/${ctx.path}`)
})