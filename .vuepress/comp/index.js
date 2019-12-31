let components = [
  { name: 'LearningPlan', component: () => import(`./LearningPlan.vue`) }
]

export default function (Vue) {
  for (let component of components) {
    Vue.component(component.name, component.component)
  }
}
