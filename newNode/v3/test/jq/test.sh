#!/bin/sh

# echo $(jq '.address1 = "abcde"' startData.json) > endData.json
# data=$(jq '.test.INSTANCE_NAME' startData.json)

# echo $data
# echo $(jq ".INSTANCE_NAME = $data" endData.json) > endData.json

# hostname="titan"
# echo $hostname

# jq ".$hostname.INSTANCE_NAME" startData.json

puppethFrom=$(jq ".test.puppethFrom" /home/titan/Titan/github/blockchain/eth-poc/newNode/volumes/initData.json)

asd=$(echo $puppethFrom | sed 's/"//g')

echo $asd

a="apple"
echo $a