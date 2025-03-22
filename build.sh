#!/bin/bash
datetime=`date +%Y%m%d-%H%M%S`
echo $datetime
tag=swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard-press

pnpm install
pnpm docs:build

docker buildx build --platform linux/amd64 -t $tag:latest .


if test $datetime != ""; then
  # docker push $tag:latest
  docker tag $tag:latest $tag:$datetime
  docker push $tag:$datetime
  echo pushded $tag:$datetime
fi
