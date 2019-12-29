let components = [
  { name: 'LearningPlan', component: () => import(`./LearningPlan.vue`) }
]

export default function (Vue) {
  for (let component of components) {
    window.console.log('注册组件 ', component.name)
    Vue.component(component.name, component.component)
  }
}
