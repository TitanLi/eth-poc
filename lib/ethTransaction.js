const request = require('request-promise');
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
	}
};