#!/bin/bash
set -e

datetime=$(date +%Y%m%d-%H%M%S)
tag=swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard-press-v4

pnpm install
pnpm docs:build

docker buildx build --platform linux/amd64 --load -t "$tag:$datetime" -t kuboard-press-v4:latest .

echo "构建完成: $tag:$datetime"

# 推送镜像到华为云 SWR（需 SWR_AK / SWR_PW；与根 build.sh --huawei 分支同款 skopeo 做法）
if [ -n "$SWR_AK" ] && [ -n "$SWR_PW" ]; then
  docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
    quay.io/skopeo/stable:v1.22 copy --dest-creds "cn-east-2@${SWR_AK}:${SWR_PW}" \
    "docker-daemon:$tag:$datetime" "docker://$tag:$datetime"
  echo "已推送: $tag:$datetime"
else
  echo "未检测到 SWR_AK/SWR_PW，跳过推送；手动推送命令:"
  echo "  skopeo copy --dest-creds cn-east-2@\$SWR_AK:\$SWR_PW docker-daemon:$tag:$datetime docker://$tag:$datetime"
fi
