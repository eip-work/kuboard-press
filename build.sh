#!/bin/bash
datetime=`date +%Y%m%d-%H%M%S`
echo $datetime
tag=swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard-press

pnpm install
pnpm docs:build

docker buildx build --platform linux/amd64 -t $tag:$datetime . --load


# echo "在宿主机上使用如下指令推送镜像到仓库"
# echo "skopeo copy --dest-creds cn-east-2@\$SWR_AK:\$SWR_PW docker-daemon:$tag:$datetime docker://$tag:$datetime"
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock quay.io/skopeo/stable:v1.22 copy --dest-creds cn-east-2@$SWR_AK:$SWR_PW docker-daemon:$tag:$datetime docker://$tag:$datetime

echo $tag:$datetime
