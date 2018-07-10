const koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const EthApi = require('./lib/ethApi.js');
const transaction = require('./lib/ethTransaction.js');
require('dotenv').load();

const node1 = new EthApi(process.env.NODE1);
const node2 = new EthApi(process.env.NODE2);

const app = new koa();
const router = Router();

app.use(logger());
app.use(bodyparser());

router.get('/node1/personal_listAccounts', node1.personal_listAccounts);
router.get('/node1/personal_newAccount', node1.personal_newAccount);
router.get('/node1personal_sign', node1.personal_sign);
router.get('/node1/personal_ecRecover', node1.personal_ecRecover);
router.get('/node1/personal_lockAccount', node1.personal_lockAccount);
router.get('/node1/personal_unlockAccount', node1.personal_unlockAccount);
router.get('/node1/admin_nodeInfo',node1.admin_nodeInfo);

router.get('/node2/personal_listAccounts', node2.personal_listAccounts);
router.get('/node2/personal_newAccount', node2.personal_newAccount);
router.get('/node2/personal_sign', node2.personal_sign);
router.get('/node2/personal_ecRecover', node2.personal_ecRecover);
router.get('/node2/personal_lockAccount', node2.personal_lockAccount);
router.get('/node2/personal_unlockAccount', node2.personal_unlockAccount);
router.get('/node2/admin_nodeInfo',node2.admin_nodeInfo);

router.get('/admin_addPeer',transaction.admin_addPeer(process.env.NODE1,'http://127.0.0.1:3006/node2/admin_nodeInfo','172.17.0.3'));
router.get('/miner_start',transaction.miner_start(process.env.NODE1,1));
app.use(router.middleware());
app.listen(3006, () => {
	console.log('listen port on 3006');
});