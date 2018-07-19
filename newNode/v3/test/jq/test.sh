#!/bin/sh

# echo $(jq '.address1 = "abcde"' startData.json) > endData.json
data=$(jq '.test.INSTANCE_NAME' startData.json)

echo $data
echo $(jq ".INSTANCE_NAME = $data" endData.json) > endData.json