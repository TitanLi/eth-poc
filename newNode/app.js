const koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const fs = require('fs');
const compose = require('docker-compose');
const sudo = require('sudo-js');
sudo.setPassword('apple');
require('dotenv').load();

const app = new koa();
const router = Router();

var data = [
	{
		'name': 'node-app',
		'script': '/eth-net-intelligence-api/app.js',
		'log_date_format': 'YYYY-MM-DD HH:mm Z',
		'merge_logs': false,
		'watch': false,
		'max_restarts': 10,
		'exec_interpreter': 'node',
		'exec_mode': 'fork_mode',
		'env':
		{
			'NODE_ENV': 'production',
			'RPC_HOST': 'localhost',
			'RPC_PORT': '8545',
			'LISTENING_PORT': '30303',
			'INSTANCE_NAME': '',
			'CONTACT_DETAILS': '',
			'WS_SERVER': 'http://172.17.0.2:3000',
			'WS_SECRET': '101',
			'VERBOSITY': 2
		}
	}
];

app.use(logger());
app.use(bodyparser());

router.post('/newNode', async function (ctx) {
	let req = ctx.request.body;
	console.log(req);
	data[0].env.INSTANCE_NAME = req.INSTANCE_NAME;
	data[0].env.WS_SERVER = req.WS_SERVER;
	data[0].env.WS_SECRET = req.WS_SECRET;
	await fs.writeFile('./app.json', JSON.stringify(data), 'utf8', function (err) {
		if (err) {
			return console.error(err);
		}
	});
	await compose.up({ cwd: __dirname, log: true }).then(
		() => console.log('done'),
		err => console.log('something went wrong:', err.message)
	);
	ctx.body = data;
});

app.use(router.middleware());
app.listen(process.env.PORT, () => {
	console.log('listen port on ' + process.env.PORT);
});