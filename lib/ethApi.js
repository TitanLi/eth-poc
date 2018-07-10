const request = require('request-promise');
module.exports = function (URL) {
	this.url = URL;
	/*
		RPC => {"method": "personal_listAccounts", "params": []}
		example :
			> personal.listAccounts
			["0x5e97870f263700f46aa00d967821199b9bc5a120", "0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"]
	*/
	this.personal_listAccounts = async (ctx) => {
		let options = {
			method: 'POST',
			uri: this.url,
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				'method': 'personal_listAccounts',
				'params': [],
				'id': 1
			},
			json: true
		};
		let data = await request(options);
		ctx.body = data;
	};

	/*
		RPC => {"method": "personal_newAccount", "params": [string]}

		Example :
			> personal.newAccount("h4ck3r")
			"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
	*/
	this.personal_newAccount = async (ctx) => {
		let options = {
			method: 'POST',
			uri: this.url,
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				'method': 'personal_newAccount',
				'params': ['string'],
				'id': 1
			},
			json: true
		};
		let data = await request(options);
		ctx.body = data;
	};
	/*
		RPC => {"method": "personal_sign", "params": [message, account, password]}
		example :
			> personal.sign("0xdeadbeaf", "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "")
			"0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
	*/
	this.personal_sign = async (ctx) => {
		let options = {
			method: 'POST',
			uri: this.url,
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				'method': 'personal_sign',
				'params': [
					'0xdeadbeaf',
					'0x4bcb7bafe16c442568f343d352acce72dcf2cde6',
					'string'],
				'id': 1
			},
			json: true
		};
		let data = await request(options);
		ctx.body = data;
	};
	/*
		RPC => "method": "personal_ecRecover", "params": [message, signature]}
		example :
			> personal.ecRecover("0xdeadbeaf", "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b")
			"0x9b2055d370f73ec7d8a03e965129118dc8f5bf83"
	*/
	this.personal_ecRecover = async (ctx) => {
		let options1 = {
			method: 'POST',
			uri: this.url,
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				'method': 'personal_sign',
				'params': [
					'0xdeadbeaf',
					'0x4bcb7bafe16c442568f343d352acce72dcf2cde6',
					'string'],
				'id': 1
			},
			json: true
		};
		let sign = await request(options1);

		let options2 = {
			method: 'POST',
			uri: this.url,
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				'method': 'personal_ecRecover',
				'params': [
					'0xdeadbeaf',
					sign.result
				],
				'id': 1
			},
			json: true
		};
		let data = await request(options2);

		ctx.body = data;
	};
	/*
		RPC => {"method": "personal_lockAccount", "params": [Account(String)]}
	*/
	this.personal_lockAccount = async (ctx) => {
		let options = {
			method: 'POST',
			uri: this.url,
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				'method': 'personal_lockAccount',
				'params': [
					'0xc452827150a26baa976f5ad17a90bde26915f168'
				],
				'id': 1
			},
			json: true
		};
		let data = await request(options);

		ctx.body = data;
	};
	/*
		RPC => 	{"method": "personal_unlockAccount", "params": [accountAddress(string), password(string), number]}
		example :
			1. > personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120", "foo", 30)
				true
			2. > personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120", null, 30)
				Unlock account 0x5e97870f263700f46aa00d967821199b9bc5a120
				Passphrase: 
				true
	*/
	this.personal_unlockAccount = async (ctx) => {
		let options = {
			method: 'POST',
			uri: this.url,
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				'method': 'personal_unlockAccount',
				'params': [
					'0xc452827150a26baa976f5ad17a90bde26915f168',
					'string',
					100],
				'id': 1
			},
			json: true
		};
		let data = await request(options);

		ctx.body = data;
	};
	/*
		RPC	=> {"method": "admin_nodeInfo"}
		example :
			> admin.nodeInfo
			{
 				enode: "enode://44826a5d6a55f88a18298bca4773fca5749cdc3a5c9f308aa7d810e9b31123f3e7c5fba0b1d70aac5308426f47df2a128a6747040a3815cc7dd7167d03be320d@[::]:30303",
  				id: "44826a5d6a55f88a18298bca4773fca5749cdc3a5c9f308aa7d810e9b31123f3e7c5fba0b1d70aac5308426f47df2a128a6747040a3815cc7dd7167d03be320d",
  				ip: "::",
  				listenAddr: "[::]:30303",
  				name: "Geth/v1.5.0-unstable/linux/go1.6",
  				ports: {
    				discovery: 30303,
    				listener: 30303
 				},
  				protocols: {
    				eth: {
      					difficulty: 17334254859343145000,
      					genesis: "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3",
      					head: "0xb83f73fbe6220c111136aefd27b160bf4a34085c65ba89f24246b3162257c36a",
      					network: 1
    				}
  				}
			}
	*/
	this.admin_nodeInfo = async (ctx) => {
		let options = {
			method: 'POST',
			uri: this.url,
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				'method': 'admin_nodeInfo',
				'id': 1
			},
			json: true
		};
		let data = await request(options);

		ctx.body = data;
	};
};