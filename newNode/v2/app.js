const koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const fs = require('fs');
const shell = require('shelljs');
const exec = require('child_process').exec;
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
			'WS_SERVER': '',
			'WS_SECRET': '',
			'VERBOSITY': 2
		}
	}
];

app.use(logger());
app.use(bodyparser());

router.post('/newNode', async function (ctx) {
	let req = ctx.request.body;
	console.log(req);
	data[0].env.INSTANCE_NAME = req.INSTANCE_NAME || process.env.INSTANCE_NAME;
	data[0].env.WS_SERVER = req.WS_SERVER || process.env.WS_SERVER;
	data[0].env.WS_SECRET = req.WS_SECRET || process.env.WS_SECRET;
	await fs.writeFile('./eth-net-intelligence-api/app.json', JSON.stringify(data), 'utf8', function (err) {
		if (err) {
			return console.error(err);
		}
	});
	await shell.exec('chmod +x ethereum.sh');
	await new Promise(function (resolve, reject) {
		shell.exec('./ethereum.sh', (error, stdout, stderr) => {
			console.log(`${stdout}`);
			console.log(`${stderr}`);
			if (error) {
				console.log(`exec error: ${error}`);
				reject();
			} else {
				exec('geth --nodiscover --networkid 100 --datadir .etherum/ --rpc --rpcapi admin,debug,miner,personal,txpool,eth,net,web3 --rpcaddr=0.0.0.0 console');
				resolve();
			}
		});
	});
	ctx.body = data;
});

app.use(router.middleware());
app.listen(process.env.PORT, () => {
	console.log('listen port on ' + process.env.PORT);
});