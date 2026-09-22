# Kuboard Press V4

Kuboard v4 官方文档站源码（中文 / English 双语），基于 [VitePress](https://vitepress.dev/) 构建。

在线文档：<https://kuboard.cn/>

## 技术栈

- [VitePress](https://vitepress.dev/)
- [mermaid](https://mermaid.js.org/)（流程图 / 时序图 / 架构图）
- pnpm 11

## 目录结构

```
docs/
├── zh/          # 中文文档
├── en/          # English docs
├── public/      # 静态资源
└── .vitepress/  # 站点配置与主题
```

## 本地开发

```bash
pnpm install
pnpm docs:dev
```

## 构建与预览

```bash
pnpm docs:build     # 构建到 docs/.vitepress/dist
pnpm docs:preview   # 本地预览构建产物
```

## Docker 镜像

```bash
# 一键安装依赖、构建并打包镜像（参考 build.sh）
./build.sh
```

镜像基于 `nginx:alpine`，将构建产物通过 `docker/nginx.conf` 提供服务，默认端口 80。

## 分支说明

- `v4`：默认分支，Kuboard v4 文档源码
