#!/bin/sh
addressInfo=$(ip -4 addr | grep "inet" | grep "eth0"  | awk '{print $2}' )

ipInfo=$(echo $addressInfo | cut -d'/' -f 1)

echo $ipInfo

jq '.[0]' "/eth-net-intelligence-api/app.json"
echo $(jq '.[0].env.RPC_HOST="'$ipInfo'"' /eth-net-intelligence-api/app.json) > /eth-net-intelligence-api/app.json

# sudo docker run -tid -h test --name test -v /home/titan/Titan/github/blockchain/eth-poc/newNode/volumes:/volumes ubuntu:16.04 /bin/bash
hostname=$(cat /etc/hostname)
echo $(jq '.[0].name="'$hostname'"' /eth-net-intelligence-api/app.json) > /eth-net-intelligence-api/app.json

INSTANCE_NAME=$(jq ".$hostname.INSTANCE_NAME" /volumes/initData.json)
echo $(jq ".[0].env.INSTANCE_NAME = $INSTANCE_NAME" /eth-net-intelligence-api/app.json) > /eth-net-intelligence-api/app.json

WS_SERVER=$(jq ".$hostname.WS_SERVER" /volumes/initData.json)
echo $(jq ".[0].env.WS_SERVER = $WS_SERVER" /eth-net-intelligence-api/app.json) > /eth-net-intelligence-api/app.json

WS_SECRET=$(jq ".$hostname.WS_SECRET" /volumes/initData.json)
echo $(jq ".[0].env.WS_SECRET = $WS_SECRET" /eth-net-intelligence-api/app.json) > /eth-net-intelligence-api/app.json

echo $(jq '.[0].script = "/eth-net-intelligence-api/app.js"' /eth-net-intelligence-api/app.json) > /eth-net-intelligence-api/app.json

puppethFrom=$(jq ".$hostname.puppethFrom" /volumes/initData.json)

puppeth=$(jq ".$hostname.puppeth" /volumes/initData.json)

puppethPath=$(echo $puppethFrom | sed 's/"//g')
puppethFileName=$(echo $puppeth | sed 's/"//g')

cp $puppethPath $puppethFileName

pm2 start /eth-net-intelligence-api/app.json

screen -S apple bash -c "geth --nodiscover --networkid 100 --datadir .etherum/ --rpc --rpcapi admin,debug,miner,personal,txpool,eth,net,web3 --rpcaddr=0.0.0.0 console"