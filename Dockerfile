# 基础镜像与 npm 源均可通过 ARG 覆盖：
#   默认使用 Docker Hub 与官方 npm registry；离线/受限环境可传镜像代理或内网源参数。
ARG NODE_IMAGE=node:22-alpine
ARG NGINX_IMAGE=nginx:alpine
ARG NPM_REGISTRY=https://registry.npmjs.org/

FROM ${NODE_IMAGE} AS build
WORKDIR /app
RUN apk add --no-cache git
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund --registry=${NPM_REGISTRY}
COPY docs ./docs
RUN npx vitepress build docs

FROM ${NGINX_IMAGE}
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80