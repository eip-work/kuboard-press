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
        'install-docker-desktop',
        ['install-k8s', '安装Kubernetes单Master节点'],
        'install-kubernetes',
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
    {
      title: '管理 Kubernetes',
      collapsable: false,
      children: [
        'install-dashboard',
        'install-dashboard-upgrade',
        'install-kubectl',
        'config-kubectl',
        'install-k8s-dashboard',
      ]
    },
    // {
    //   title: '常见问题',
    //   collapsable: false,
    //   children: [
    //     'faq/timeout'
    //   ]
    // }
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
            'k8s-intermediate/workload/workload',
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
            }
          ]
        },
        {
          title: '服务发现、负载均衡、网络',
          collapsable: true,
          children: [
            'k8s-intermediate/service/service',
            'k8s-intermediate/service/service-details',
            'k8s-intermediate/service/service-types',
            'k8s-intermediate/service/dns',
            'k8s-intermediate/service/host-alias',
            'k8s-intermediate/service/connecting',
            'k8s-intermediate/service/ingress',
            'k8s-intermediate/service/cni',
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
            {
              title: '污点和容忍',
              collapsable: true,
              children: [
                'k8s-intermediate/config/taints-toleration/',
                'k8s-intermediate/config/taints-toleration/use-case',
                'k8s-intermediate/config/taints-toleration/taint-based-evictions',
                'k8s-intermediate/config/taints-toleration/taint-nodes-by-condition',
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
      ]
    },
    {
      title: 'Kubernetes 实战',
      collapsable: true,
      children: [
        {
          title: '概述',
          collapsable: false,
          children: [
            'k8s-practice/micro-service/kuboard-view-of-k8s'
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
    }
  ],

  '/guide/': [
    {
      title: '概述',
      collapsable: false,
      children: [
        ['', '概述']
      ]
    },
    {
      title: 'Example',
      collapsable: false,
      children: [
        'example/busybox',
        'example/import',
        'example/monitor',
      ]
    },
    {
      title: '集群管理',
      collapsable: false,
      children: [
        'cluster/computing',
        'cluster/storage',
        'cluster/namespace'
      ]
    },
    {
      title: '应用管理',
      collapsable: false,
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
      collapsable: false,
      children: [
        'diagonize/events',
        'diagonize/logs',
        'diagonize/port-forward'
      ]
    },
    {
      title: '监控套件',
      collapsable: false,
      children: [
        'monitor/',
        'monitor/apis'
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
      ]
    }
  ],

}
