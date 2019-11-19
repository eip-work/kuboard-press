---
vssueId: 151
layout: LearningLayout
description: Kubernetes 的控制器模式中，
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,K8S培训,Kubernetes CronJob
---

# 练习_使用扩展进行并行处理

<AdSenseTitle>

> 参考文档： [Parallel Processing using Expansions](https://kubernetes.io/docs/tasks/job/parallel-processing-expansion/)

在这个例子中，我们将通过同一个模板创建多个Kubernetes Job。

[[TOC]]

</AdSenseTitle>

## 基本模板扩展

下面是一个 Job 的模板文件：

<<< @/.vuepress/public/statics/learning/job/job-tmpl.yaml {4,17}

与 pod template 不同，此处的 job template 并不是一个 Kubernetes API 对象，而仅仅是 Job 对象的 yaml 文件（其中包含一些占位符）。例子文件中的 `$ITEM` 对 Kubernetes 并没有任何意义，仅仅是一个占位符，必须在使用时用实际数值替换。

在此例子中，容器唯一做的事情就是 `echo` 一个字符串，并等待一小段时间。在实际使用中，应该是某种有意义的计算，例如渲染视频的某一帧图片，或处理数据库中某些记录。模板中的 `$ITEM` 占位符可用来指定视频的帧数，或者数据库记录的行数。

此 Job 及其 Pod template 包含标签 `jobgroup=jobexample`。对系统来说此标签并没有任何特别之处。该标签可以用来方便地操作这一组 Job。Pod 上也包含该标签，以便我们可以使用一条命令即可检查这些 Job 的所有 Pod。在 Job 创建以后，系统将添加更多的标签以区分不同的 Job 创建的 Pod。`jobgroup` 并不是 Kubernetes 特殊要求的标签，你可以使用任何标签达到此目的。

接下来，下载该模板文件，并将其扩展为多个文件：

``` sh
# 下载 job-tmpl.yaml
curl -L -s -O https://kuboard.cn/statics/learning/job/job-tmpl.yaml

# 将模板文件扩展为多个文件，并存到一个临时文件夹
mkdir ./jobs
for i in apple banana cherry
do
  cat job-tmpl.yaml | sed "s/\$ITEM/$i/" > ./jobs/job-$i.yaml
done
```

检查结果：
``` sh
ls jobs/
```

输出结果如下所示：

```
job-apple.yaml
job-banana.yaml
job-cherry.yaml
```

此处，我们使用 `sed` 将占位符 `$ITEM` 替换为循环变量的值。你可以使用任意模板语言（jinja2，erb等）或编写一个程序来生成 Job 对象。

接下来，创建这些 Job：
```sh
kubectl create -f ./jobs
```
输出结果如下所示：
```
job.batch/process-item-apple created
job.batch/process-item-banana created
job.batch/process-item-cherry created
```
执行命令，检查 Pod 的状态：
``` sh
kubectl get jobs -l jobgroup=jobexample
```
输出结果如下所示：
```
NAME                  COMPLETIONS   DURATION   AGE
process-item-apple    1/1           14s        20s
process-item-banana   1/1           12s        20s
process-item-cherry   1/1           12s        20s
```
此处，我们使用 `-l` 选项选择这一组 Job。执行如下命令可查看这组 Job 所有的 Pod：
``` sh
kubectl get pods -l jobgroup=jobexample
```
输出结果如下所示：
```
NAME                        READY     STATUS      RESTARTS   AGE
process-item-apple-kixwv    0/1       Completed   0          4m
process-item-banana-wrsf7   0/1       Completed   0          4m
process-item-cherry-dnfu9   0/1       Completed   0          4m
```
目前还不能直接使用一个命令去检查所有 Pod 的输出，但是，可以通过一个循环来检查所有 Pod 的输出：
```sh
for p in $(kubectl get pods -l jobgroup=jobexample -o name)
do
  kubectl logs $p
done
```
输出结果如下所示：
```
Processing item apple
Processing item banana
Processing item cherry
```

## 多模板参数

在前面的例子中，每一个模板的实例包含一个参数，同时，此参数也被用作标签。然而，标签的主键是受限于 [句法和字符集](/learning/k8s-intermediate/obj/labels.html#句法和字符集) 的。

下面这个例子稍微复杂一些，使用了 jinja2 模板语言来生成 Job 对象。我们将使用 python 脚本将模板转换为一个文件。

首先，创建一个文件 `job.yaml.jinja2`，其内容如下所示：

``` jinja2 {11,24}
{%- set params = [{ "name": "apple", "url": "http://www.orangepippin.com/apples", },
                  { "name": "banana", "url": "https://en.wikipedia.org/wiki/Banana", },
                  { "name": "raspberry", "url": "https://www.raspberrypi.org/" }]
%}
{%- for p in params %}
{%- set name = p["name"] %}
{%- set url = p["url"] %}
apiVersion: batch/v1
kind: Job
metadata:
  name: jobexample-{{ name }}
  labels:
    jobgroup: jobexample
spec:
  template:
    metadata:
      name: jobexample
      labels:
        jobgroup: jobexample
    spec:
      containers:
      - name: c
        image: busybox
        command: ["sh", "-c", "echo Processing URL {{ url }} && sleep 5"]
      restartPolicy: Never
---
{%- endfor %}
```

此模板中，使用 python 字典表（1-4行）为每个 Job 对象定义了参数。然后通过一个循环遍历这些参数，并生成 Job 的 yaml 对象文件。
> * 多个 yaml 对象可以合并到一个 yaml 文件，使用 `---` 分隔即可
> * 在运行时，你的环境中需要由 jinja2 包，如果没有，可以通过 `pip install --user jinja2` 命令安装

执行 python 脚本，以将模板扩展为多个yaml文件：
``` sh
alias render_template='python -c "from jinja2 import Template; import sys; print(Template(sys.stdin.read()).render());"'
```
输出结果将保存到一个文件中，例如：
``` sh
cat job.yaml.jinja2 | render_template > jobs.yaml
```
或者直接通过 kubectl 执行，例如：
``` sh
cat job.yaml.jinja2 | render_template | kubectl apply -f -
```

## 替代方案

如果您有许多的 Job 对象要创建，最终您会发现：
* 即使使用了标签，管理数量众多的 Job 对象仍然是非常麻烦的事情
* 一次性创建所有的 Job 对象可能会是您超出 [resource quota](/learning/k8s-advanced/policy/rq.html) 的限制，但您又不想等待太长时间以逐个创建 Job 对象
* 一次性创建数量众多的 Job 对象可能使 Kubernetes apiserver、controller、scheduler 等组件过载

在这些情况下，您可以考虑其他的 [job pattern](/learning/k8s-intermediate/workload/wl-job/pattern.html)
