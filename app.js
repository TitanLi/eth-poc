const koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const EthApi = require('./lib/ethApi.js');
require('dotenv').load();

const ethApi = new EthApi(process.env.URL);

const app = new koa();
const router = Router();

app.use(logger());
app.use(bodyparser());

router.get('/personal_listAccounts',ethApi.personal_listAccounts);
router.get('/personal_newAccount',ethApi.personal_newAccount);
router.get('/personal_sign',ethApi.personal_sign);
router.get('/personal_ecRecover',ethApi.personal_ecRecover);
router.get('/personal_lockAccount',ethApi.personal_lockAccount);
router.get('/personal_unlockAccount',ethApi.personal_unlockAccount);

app.use(router.middleware());
app.listen(3006,() => {
	console.log('listen port on 3006');
});