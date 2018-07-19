#!/bin/sh
addressInfo=$(ip -4 addr | grep "inet" | grep "eth0"  | awk '{print $2}' )

ipInfo=$(echo $addressInfo | cut -d'/' -f 1)

echo $ipInfo

echo $(cat /eth-net-intelligence-api/app.json | jq '.[0].env.RPC_HOST="'$ipInfo'"')

pm2 start /eth-net-intelligence-api/app.json