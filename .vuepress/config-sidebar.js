module.exports = {
  '/overview/': [
    {
      title: '简介',
      collapsable: false,
      children: [
        '',
        'share-coder'
      ]
    }, {
      title: '概念',
      collapsable: false,
      children: [
        'quick-win',
        'why-kuboard',
        'concepts'
      ]
    }, 
  ],

  '/articles/': [
    {
      title: '文章',
      collapsable: false,
      children: [
        '201908/kuboard-view-of-k8s'
      ]
    }
  ],

  '/install/': [
    {
      title: '安装 Kubernetes',
      collapsable: false,
      children: [
        // 'install-docker-desktop',
        ['install-k8s', '安装Kubernetes单Master节点'],
        'install-kubernetes',
        'sealos/',
        'install-node-port-range',
        'docker-mirror',
        'k8s-restart',
      ]
    },
    {
      title: '安装 Kubernetes 管理工具',
      collapsable: false,
      children: [
        'install-dashboard',
        'install-dashboard-offline',
        {
          title: '配置Kuboard',
          collapsable: true,
          children: [
            'install-dashboard-upgrade',
            'install-kuboard-layout',
            'install-kuboard-env',
          ]
        },
        {
          title: 'kubectl',
          collapsable: true,
          children: [
            'install-kubectl',
            'config-kubectl',
            'install-kubectl-sa',
          ]
        },
        'install-k8s-dashboard',
      ]
    },
    {
      title: '升级 Kubernetes',
      collapsable: false,
      children: [
        // ['install-k8s-upgrade', '升级Kubernetes集群'],
        'upgrade-k8s/1.15.x-1.15.4',
        ['upgrade-k8s/1.15.x-1.16.x', 'K8S从1.15.x(1.16.x)升级到 1.16.x'],
        'upgrade-k8s/calico-3.8-3.9',
      ]
    },
  ],

  '/learning/': [
    {
      title: 'Kubernetes 介绍',
      collapsable: true,
      sidebarDepth: 3,
      children: [
        '',
        'k8s-bg/what-is-k8s',
        'k8s-bg/component',
        
      ]
    },
    {
      title: 'Kubernetes 入门',
      collapsable: true,
      sidebarDepth: 3,
      children: [
        'k8s-basics/kubernetes-basics',
        'k8s-basics/deploy-app',
        'k8s-basics/explore',
        'k8s-basics/expose',
        'k8s-basics/scale',
        'k8s-basics/update',
        'k8s-basics/k8s-core-concepts'
      ]
    },
    {
      title: 'Kubernetes 进阶',
      collapsable: true,
      children: [
        {
          title: '架构',
          collapsable: true,
          children: [
            {
              title: '节点',
              collapsable: true,
              // path: '/learning/k8s-bg/architecture/nodes',
              children: [
                'k8s-bg/architecture/nodes',
                'k8s-bg/architecture/nodes-mgmt',
              ]
            },
            {
              title: '集群内的通信',
              collapsable: true,
              // path: '/learning/k8s-bg/architecture/com',
              children: [
                'k8s-bg/architecture/com',
                'k8s-bg/architecture/com-n-m',
                'k8s-bg/architecture/com-m-n',
              ]
            },
            'k8s-bg/architecture/controller',
          ]
        },
        {
          title: '操作Kubernetes',
          collapsable: true,
          children: [
            'k8s-intermediate/obj/k8s-object',
            'k8s-intermediate/obj/manage',
            'k8s-intermediate/obj/names',
            'k8s-intermediate/obj/namespaces',
            'k8s-intermediate/obj/namespace-op',
            'k8s-intermediate/obj/labels',
            'k8s-intermediate/obj/annotations',
            'k8s-intermediate/obj/field',
          ]
        },
        {
          title: '容器',
          collapsable: true,
          children: [
            'k8s-intermediate/container/images',
            'k8s-intermediate/container/env',
            'k8s-intermediate/container/runtime',
            'k8s-intermediate/container/lifecycle',
            'k8s-intermediate/container/lifecycle-p',
          ]
        },
        {
          title: '工作负载',
          collapsable: true,
          children: [
            'k8s-intermediate/workload/pod',
            'k8s-intermediate/workload/pod-lifecycle',
            'k8s-intermediate/workload/init-container',
            'k8s-intermediate/workload/init-config',
            'k8s-intermediate/workload/init-debug',
            'k8s-intermediate/workload/disruption',
            'k8s-intermediate/workload/disruption-example',
            'k8s-intermediate/workload/pod-health.html',
            
            'k8s-intermediate/workload/workload',
            'k8s-intermediate/workload/wl-replicaset/',
            {
              title: '控制器 - Deployment',
              collapsable: true,
              children: [
                'k8s-intermediate/workload/wl-deployment/',
                'k8s-intermediate/workload/wl-deployment/create',
                'k8s-intermediate/workload/wl-deployment/update',
                'k8s-intermediate/workload/wl-deployment/rollback',
                'k8s-intermediate/workload/wl-deployment/scale',
                'k8s-intermediate/workload/wl-deployment/pause',
                'k8s-intermediate/workload/wl-deployment/status',
                'k8s-intermediate/workload/wl-deployment/cleanup',
                'k8s-intermediate/workload/wl-deployment/strategy',
                'k8s-intermediate/workload/wl-deployment/canary',
              ]
            },
            {
              title: '控制器 - StatefulSet',
              collapsable: true,
              children: [
                'k8s-intermediate/workload/wl-statefulset/',
                'k8s-intermediate/workload/wl-statefulset/basics.html',
                'k8s-intermediate/workload/wl-statefulset/scaling.html',
                'k8s-intermediate/workload/wl-statefulset/update.html',
              ]
            },
            {
              title: '控制器 - DaemonSet',
              collapsable: true,
              children: [
                'k8s-intermediate/workload/wl-daemonset/',
                'k8s-intermediate/workload/wl-daemonset/create',
                'k8s-intermediate/workload/wl-daemonset/schedule',
                'k8s-intermediate/workload/wl-daemonset/communicate',
                'k8s-intermediate/workload/wl-daemonset/update',
                'k8s-intermediate/workload/wl-daemonset/alternative',
              ]
            },
            {
              title: '控制器 - Job',
              collapsable: true,
              children: [
                'k8s-intermediate/workload/wl-job/',
                'k8s-intermediate/workload/wl-job/spec',
                'k8s-intermediate/workload/wl-job/failure',
                'k8s-intermediate/workload/wl-job/cleanup',
                'k8s-intermediate/workload/wl-job/auto-cleanup',
                'k8s-intermediate/workload/wl-job/pattern',
                'k8s-intermediate/workload/wl-job/usage',
                'k8s-intermediate/workload/wl-job/when',
                'k8s-intermediate/workload/wl-job/task_expansion',
              ]
            },
            {
              title: '控制器 - CronJob',
              collapsable: true,
              children: [
                'k8s-intermediate/workload/wl-cronjob/',
                'k8s-intermediate/workload/wl-cronjob/run',
              ]
            },
            'k8s-intermediate/workload/gc',
          ]
        },
        {
          title: '服务发现、负载均衡、网络',
          collapsable: true,
          children: [
            {
              title: 'Service',
              collapsable: true,
              children: [
                'k8s-intermediate/service/service',
                'k8s-intermediate/service/service-details',
                'k8s-intermediate/service/service-types',
                'k8s-intermediate/service/dns',
                'k8s-intermediate/service/connecting',
              ]
            },
            'k8s-intermediate/service/ingress',
            'k8s-intermediate/service/host-alias',
            'k8s-intermediate/service/cni',
            {
              title: '网络策略',
              collapsable: true,
              children: [
                'k8s-intermediate/service/np',
                'k8s-intermediate/service/np-default',
                'k8s-intermediate/service/np-example',
              ]
            },
            'k8s-intermediate/service/network'
          ]
        },
        {
          title: '存储',
          collapsable: true,
          children: [
            'k8s-intermediate/persistent/volume',
            'k8s-intermediate/persistent/volume-mount-point.html',
            'k8s-intermediate/persistent/pv',
            'k8s-intermediate/persistent/storage-class',
            'k8s-intermediate/persistent/nfs',
            'k8s-intermediate/persistent/limits',
          ]
        },
        {
          title: '配置',
          collapsable: true,
          children: [
            'k8s-intermediate/private-registry',
            'k8s-intermediate/config/config-map',
            'k8s-intermediate/config/computing-resource',
            'k8s-intermediate/config/assign-pod-node',
            'k8s-intermediate/config/affinity',
            {
              title: '污点和容忍',
              collapsable: true,
              children: [
                'k8s-intermediate/config/taints-toleration/',
                'k8s-intermediate/config/taints-toleration/use-case',
                'k8s-intermediate/config/taints-toleration/taint-based-evictions',
                'k8s-intermediate/config/taints-toleration/taint-nodes-by-condition',
                'k8s-intermediate/config/taints-toleration/kuboard-toleration',
              ]
            },
            {
              title: 'Secret',
              collapsable: true,
              children: [
                'k8s-intermediate/config/secrets/',
                'k8s-intermediate/config/secrets/create-kubectl',
                'k8s-intermediate/config/secrets/create-manually',
                'k8s-intermediate/config/secrets/create-generator',
                'k8s-intermediate/config/secrets/create-kuboard',
                'k8s-intermediate/config/secrets/decode-edit',
                'k8s-intermediate/config/secrets/use-case-ingress-tls',
                // 'k8s-intermediate/config/secrets/use-as_file',
                // 'k8s-intermediate/config/secrets/use-as_env',
                // 'k8s-intermediate/config/secrets/use-image-pull-secrets',
                // 'k8s-intermediate/config/secrets/details',
                // 'k8s-intermediate/config/secrets/use-cases',
                // 'k8s-intermediate/config/secrets/best-practices',
              ]
            },
            {
              title: 'Security Context',
              collapsable: true,
              children: [
                'k8s-intermediate/config/sec-ctx/',
                'k8s-intermediate/config/sec-ctx/pod',
                'k8s-intermediate/config/sec-ctx/con',
                'k8s-intermediate/config/sec-ctx/con-cap',
                'k8s-intermediate/config/sec-ctx/con-sel',
                'k8s-intermediate/config/sec-ctx/volumes',
                'k8s-intermediate/config/sec-ctx/pod-kuboard',
                'k8s-intermediate/config/sec-ctx/con-kuboard',
              ]
            },
            'k8s-intermediate/config/priority-preemption',
          ]
        }
      ]
    },
    {
      title: 'Kubernetes 高级',
      collapsable: true,
      children: [
        {
          title: '问题诊断',
          collapsable: true,
          children: [
            'k8s-advanced/ts/application',
            'k8s-advanced/ts/cluster',
            'k8s-advanced/ts/deployment'
          ]
        },
        {
          title: '日志',
          collapsable: true,
          children: [
            'k8s-advanced/logs/',
            'k8s-advanced/logs/basic',
            'k8s-advanced/logs/node',
            'k8s-advanced/logs/cluster',
          ]
        },
        {
          title: '调度',
          collapsable: true,
          children: [
            'k8s-advanced/schedule/',
            'k8s-advanced/schedule/tuning',
            'k8s-advanced/schedule/framework',
          ]
        },
        {
          title: '策略',
          collapsable: true,
          children: [
            {
              title: 'Limit Range',
              collapsable: true,
              children: [
                'k8s-advanced/policy/lr',
                'k8s-advanced/policy/lr_container',
                'k8s-advanced/policy/lr_pod',
                'k8s-advanced/policy/lr_storage',
                'k8s-advanced/policy/lr_ratio',
              ]
            },
            {
              title: 'Resource Quota',
              collapsable: true,
              children: [
                'k8s-advanced/policy/rq',
                'k8s-advanced/policy/rq_types',
                'k8s-advanced/policy/rq_scope',
                'k8s-advanced/policy/rq_more',
                'k8s-advanced/policy/rq_example_cpu_mem',
                'k8s-advanced/policy/rq_example_obj',
              ]
            },
            // {
            //   title: 'Pod Security',
            //   collapsable: true,
            //   children: [
            //     'k8s-advanced/policy/sec',
            //   ]
            // },
          ]
        },
        'k8s-advanced/gc',
        {
          title: '安全',
          collapsable: true,
          children: [
            {
              title: '用户认证',
              collapsable: true,
              children: [
                'k8s-advanced/sec/authenticate/',
                'k8s-advanced/sec/sa-admin',
                'k8s-advanced/sec/authenticate/install',
              ]
            }, {
              title: '用户授权',
              collapsable: true,
              children: [
                'k8s-advanced/sec/kuboard',
                'k8s-advanced/sec/rbac/logs.html',
                'k8s-advanced/sec/rbac/api',
                'k8s-advanced/sec/rbac/default',
                'k8s-advanced/sec/rbac/escalation',
                'k8s-advanced/sec/rbac/cmd',
                'k8s-advanced/sec/rbac/sa',
                'k8s-advanced/sec/rbac/permissive',
                'k8s-advanced/sec/rbac/example',
              ]
            },
          ]
        },
        {
          title: '监控',
          collapsable: true,
          children: [
            'k8s-advanced/observe/kube-prometheus.html',
          ]
        },
        {
          title: '扩展Kubernetes',
          collapsable: true,
          children: [
            'k8s-advanced/extend/aggregation',
          ]
        },
      ]
    },
    {
      title: 'Kubernetes 实战',
      collapsable: true,
      children: [
        {
          title: '练习',
          collapsable: true,
          children: [
            'k8s-practice/access/port-forward',
            'k8s-practice/admin/list-images',
          ]
        },
        {
          title: '概述',
          collapsable: false,
          children: [
            'k8s-practice/micro-service/kuboard-view-of-k8s',
            'k8s-practice/micro-service/design-pattern'
          ]
        },
        {
          title: 'Spring Cloud',
          collapsable: false,
          children: [
            'k8s-practice/spring-cloud/',
            // 'spring-cloud/cloud-eureka'
          ]
        },
        {
          title: 'Open Capacity Platform',
          collapsable: true,
          children: [
            {
              title: '准备',
              collapsable: false,
              path: '/learning/k8s-practice/ocp/',
              children: [
                ['k8s-practice/ocp/', 'OCP介绍'],
                'k8s-practice/ocp/prepare',
                'k8s-practice/ocp/build',
              ]
            },
            {
              title: '部署',
              collapsable: false,
              path: '/learning/k8s-practice/ocp/sequence.html',
              children: [
                'k8s-practice/ocp/sequence',
                'k8s-practice/ocp/eureka-server',
                'k8s-practice/ocp/mysql',
                'k8s-practice/ocp/redis',
                'k8s-practice/ocp/auth-server',
                'k8s-practice/ocp/user-center',
                'k8s-practice/ocp/api-gateway',
                'k8s-practice/ocp/back-center',
                'k8s-practice/ocp/review',
              ]
            },
            {
              title: '多环境',
              collapsable: false,
              path: '/learning/k8s-practice/ocp/export.html',
              children: [
                'k8s-practice/ocp/export',
                'k8s-practice/ocp/import',
              ]
            },
          ]
        },
      ]
    },
    {
      title: 'Kubernetes 常见问题',
      collapsable: true,
      children: [
        'faq/ping-service',
        'faq/request-limit',
        'faq/image-pull-backoff'
      ]
    },
  ],

  '/guide/': [
    {
      title: '概述',
      collapsable: true,
      children: [
        ['', '概述']
      ]
    },
    {
      title: 'Example',
      collapsable: true,
      children: [
        'example/busybox',
        'example/import',
        'example/monitor',
      ]
    },
    {
      title: '集群管理',
      collapsable: true,
      children: [
        'cluster/computing',
        'cluster/storage',
        'cluster/namespace'
      ]
    },
    {
      title: '应用管理',
      collapsable: true,
      children: [
        'namespace/workload',
        'namespace/secrets',
        'namespace/configMap',
        'namespace/pvc',
        'namespace/adjustion',
        'namespace/multi-env'
      ]
    },
    {
      title: '问题诊断',
      collapsable: true,
      children: [
        'diagonize/events',
        'diagonize/logs',
        'diagonize/port-forward',
        'diagonize/skills',
      ]
    },
    {
      title: 'Kuboard Proxy',
      collapsable: false,
      children: [
        ['proxy/', 'Kuboard Proxy 介绍'],
        ['proxy/authorization', '授权用户访问 Kuboard Proxy'],
        ['proxy/rebase', '为何极少部分网页显示不正常-Rebase'],
        ['proxy/auth-proxy', '使用Auth-Proxy实现单点登录']
      ]
    },
    {
      title: 'CI/CD集成',
      collapsable: false,
      children: [
        'cicd/'
      ]
    },
    {
      title: '套件',
      collapsable: false,
      children: [
        'addon/',
        'addon/customize',
        'addon/api',
        'addon/repository'
      ]
    },
    {
      title: '监控套件',
      collapsable: false,
      children: [
        'monitor/',
      ]
    },
  ],

  '/t/': [
    {
      title: 'CKA每日一题',
      collapsable: false,
      children: [
        'cka/daily',
      ]
    },
  ],
  
  '/support/': [
    {
      title: '授权/支持',
      collapsable: false,
      children: [
        '',
      ]
    },
    {
      title: '更新说明',
      collapsable: false,
      children: [
        'change-log/v1.0.x',
        'known-issue',
      ]
    }
  ],

}
