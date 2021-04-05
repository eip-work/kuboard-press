let components = [
  { name: 'LearningPlan', component: () => import(`./LearningPlan.vue`) },
  { name: 'Course', component: () => import(`./Course.vue`) },
  { name: 'CurrentVersion', component: () => import(`./CurrentVersion.vue`) },
  { name: 'CurrentVersionV3', component: () => import(`./CurrentVersionV3.vue`) },
  { name: 'KuboardDemo', component: () => import(`./KuboardDemo.vue`) },
]

export default function (Vue) {
  for (let component of components) {
    Vue.component(component.name, component.component)
  }
}
