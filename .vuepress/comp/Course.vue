<template>
  <div v-if="course">
    <div class="school">
      <a
        :href="course.href"
        target="_blank"
        :title="course.description"
      >{{ course.title ? course.title : '观看本节视频讲解'}}</a>
    </div>
  </div>
  <div v-else>配置信息不存在</div>
</template>

<script>
import courses from './course-index.js'

export default {
  props: {
    courseId: { type: String, required: true }
  },
  data() {
    let course = courses[this.courseId]
    if (course) {
      if (course.type === undefined) {
        course.type = '直播/回看'
      }
    }
    return {
      course: course,
    }
  }
}
</script>

<style scoped>
.school {
  background-color: #e7ecf3;
  padding: 1em 1.25em;
  border-radius: 2px;
  color: #486491;
  position: relative;
}
.school a {
  color: #486491 !important;
  position: relative;
  padding-left: 36px;
}
.school a:before {
  content: '';
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  top: -5px;
  left: -4px;
  border-radius: 50%;
  background-color: #73abfe;
}
.school a:after {
  content: '';
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  top: 5px;
  left: 8px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 8px solid #fff;
}
</style>
