#!/bin/bash
set -e

datetime=$(date +%Y%m%d-%H%M%S)
tag=swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard-press-v4

pnpm install
pnpm docs:build

docker buildx build --platform linux/amd64 -t "$tag:$datetime" -t kuboard-press-v4:latest .

echo "构建完成: $tag:$datetime"
echo "推送镜像（需配置 SWR 凭据）:"
echo "  skopeo copy --dest-creds cn-east-2@\$SWR_AK:\$SWR_PW docker-daemon:$tag:$datetime docker://$tag:$datetime"
