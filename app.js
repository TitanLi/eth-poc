const koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const request = require('request-promise');
require('dotenv').load();

const app = new koa();
const router = Router();

app.use(logger());
app.use(bodyparser());

router.get('/personal_listAccounts',personal_listAccounts);
router.get('/personal_newAccount',personal_newAccount);
router.get('/personal_sign',personal_sign);
router.get('/personal_ecRecover',personal_ecRecover);

/*
	RPC => {"method": "personal_listAccounts", "params": []}
	example :
		> personal.listAccounts
		["0x5e97870f263700f46aa00d967821199b9bc5a120", "0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"]
*/
async function personal_listAccounts(ctx){
	let options = {
		method: 'POST',
		uri: 'http://10.0.0.83:8545',
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			'method': 'personal_listAccounts',
			'params': [],
			'id':1
		},
		json: true
	};
	let data = await request(options);
	ctx.body = data;
}

/*
	RPC => {"method": "personal_newAccount", "params": [string]}

	Example :
		> personal.newAccount("h4ck3r")
		"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
*/
async function personal_newAccount(ctx){
	let options = {
		method: 'POST',
		uri: 'http://10.0.0.83:8545',
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			'method': 'personal_newAccount',
			'params': ['string'],
			'id':1},
		json: true
	};
	let data = await request(options);
	ctx.body = data;
}

/*
	RPC => {"method": "personal_sign", "params": [message, account, password]}
	example :
		> personal.sign("0xdeadbeaf", "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "")
		"0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
*/
async function personal_sign(ctx){
	let options = {
		method: 'POST',
		uri: 'http://10.0.0.83:8545',
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			'method': 'personal_sign',
			'params': [
				'0xdeadbeaf',
				'0x4bcb7bafe16c442568f343d352acce72dcf2cde6',
				'string'],
			'id':1},
		json: true
	};
	let data = await request(options);
	ctx.body = data;
}

/*
	RPC => "method": "personal_ecRecover", "params": [message, signature]}
	example :
		> personal.ecRecover("0xdeadbeaf", "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b")
		"0x9b2055d370f73ec7d8a03e965129118dc8f5bf83"
*/
async function personal_ecRecover(ctx){
	let options1 = {
		method: 'POST',
		uri: 'http://10.0.0.83:8545',
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			'method': 'personal_sign',
			'params': [
				'0xdeadbeaf',
				'0x4bcb7bafe16c442568f343d352acce72dcf2cde6',
				'string'],
			'id':1},
		json: true
	};
	let sign = await request(options1);

	let options2 = {
		method: 'POST',
		uri: 'http://10.0.0.83:8545',
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			'method':'personal_ecRecover',
			'params': [
				'0xdeadbeaf',
				sign.result
			],
			'id':1},
		json: true
	};
	let data = await request(options2);


	ctx.body = data;
}
app.use(router.middleware());
app.listen(3006,() => {
	console.log('listen port on 3006');
});