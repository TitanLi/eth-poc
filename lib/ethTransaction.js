const request = require('request-promise');
const Web3 = require('web3');
const web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider('http://10.0.0.83:8545'));
module.exports = {
	/*
		* @apiParam {String} node1RPC Run addPeer cmd grpc api address
		* @apiParam {String} getNodeInfo Get node2 info api
		* @apiParam {String} node2IP Run ethereum node2 ip address
 		*
 		* @apiSuccess {JSON} {
    							"jsonrpc": "2.0",
    							"id": 1,
    							"result": true
								}
	*/
	'admin_addPeer': (node1RPC, getNodeInfo, node2IP) => {
		return async (ctx) => {
			//Get node2 Info
			let get_nodeInfo = {
				method: 'GET',
				uri: getNodeInfo,
				json: true
			};
			let nodeInfo = await request(get_nodeInfo);

			//Add Peer
			let options = {
				method: 'POST',
				uri: node1RPC,
				headers: {
					'Content-Type': 'application/json'
				},
				body: {
					'method': 'admin_addPeer',
					'params': [`enode://${nodeInfo.result.id}@${node2IP}:30303`],
					'id': 1
				},
				json: true
			};
			let data = await request(options);
			ctx.body = data;
		};
	},
	/*
		* @apiParam {String} nodeRPC Run ethereum grpc api ip address
		* @apiParam {Int} number
 		*
 		* @apiSuccess {JSON} {
    							"jsonrpc": "2.0",
    							"id": 1,
    							"result": true
								}
	*/
	'miner_start': (nodeRPC,number) => {
		return async (ctx) => {
			let options = {
				method: 'POST',
				uri: nodeRPC,
				headers: {
					'Content-Type': 'application/json'
				},
				body: {
					'method': 'miner_start',
					'params': [number],
					'id':1
				},
				json: true
			};
			let data = await request(options);
			ctx.body = data;
		};
	},
	/*
		* @apiParam {String} nodeRPC Run ethereum grpc api ip address
		* @apiParam {Int} number
 		*
 		* @apiSuccess {JSON} {
    							"jsonrpc": "2.0",
    							"id": 1,
    							"result": true
								}
	*/
	'miner_stop': (nodeRPC) => {
		return async (ctx) => {
			let options = {
				method: 'POST',
				uri: nodeRPC,
				headers: {
					'Content-Type': 'application/json'
				},
				body: {
					'method': 'miner_stop',
					'params': [],
					'id':1
				},
				json: true
			};
			let data = await request(options);
			ctx.body = data;
		};
	},
	/*
		* @apiParam {String} nodeRPC Run ethereum grpc api ip address
		* @apiParam {String} fromAccount Ethereum account
		* @apiParam {String} toAccount Ethereum account
		* @apiParam {Int} value
		* @apiParam {String} password Ethereum account(from) password
 		*
 		* @apiSuccess {JSON} {
    							"jsonrpc": "2.0",
    							"id": 1,
    							"result": "0x18e123eef83556aa84756531a5605972d5b0829f94fe23c7494bfb630e8a6874"
							}
	*/
	'personal_sendTransaction': (nodeRPC,fromAccount,toAccount,value,password) => {
		return async (ctx) => {
			let options = {
				method: 'POST',
				uri: nodeRPC,
				headers: {
					'Content-Type': 'application/json'
				},
				body: {
					'method': 'personal_sendTransaction', 
					'params': [
						{
							'from': fromAccount, 
							'to': toAccount,
							'value': '0x'+value
						}, 
						password],
					'id':1
				},
				json: true
			};
			let data = await request(options);
			console.log(web3.toWei(value, 'ether'));
			ctx.body = data;
		};
	}
};