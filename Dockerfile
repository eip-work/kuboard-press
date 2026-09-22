# 基础镜像与 npm 源均可通过 ARG 覆盖：
#   默认使用 Docker Hub 与官方 npm registry；离线/受限环境可传镜像代理或内网源参数。
ARG NODE_IMAGE=node:22-alpine
ARG NGINX_IMAGE=nginx:alpine
ARG NPM_REGISTRY=https://registry.npmjs.org/

FROM ${NODE_IMAGE} AS build
WORKDIR /app
RUN apk add --no-cache git
RUN npm install -g pnpm@11.27.0 --registry=${NPM_REGISTRY} --no-audit --no-fund
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile --registry=${NPM_REGISTRY}
COPY docs ./docs
RUN pnpm docs:build

FROM ${NGINX_IMAGE}
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80