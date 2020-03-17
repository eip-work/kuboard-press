#!/bin/bash
datetime=`date +%Y%m%d-%H%M%S`
# echo $datetime
tag=eipwork/kuboard-press

npm install --registry=https://registry.npm.taobao.org
npm run docs:build

yarn install
yarn docs:build

docker build -t $tag:latest .


if test $datetime != ""; then
  # docker push $tag:latest
  docker tag $tag:latest $tag:$datetime
  docker push $tag:$datetime
fi
