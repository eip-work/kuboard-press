<template>
  <div v-if="course">
    <a class="school"
      :href="course.href"
      target="_blank"
      :title="course.description"
    >
      <p>
        {{ course.title ? course.title : '观看本节视频讲解'}}
      </p>
    </a>
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
.school p {
  background-color: #e7ecf3;
  padding: 10px 66px;
  border-radius: 2px;
  color: #486491;
  position: relative;
  margin: 10px 0;
}
.school {
  color: #486491 !important;
  /* position: relative; */
  /* padding-left: 36px; */
}
.school p:before {
  content: '';
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  top: 9px;
  left: 20px;
  border-radius: 50%;
  background-color: #73abfe;
}
.school p:after {
  content: '';
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  top: 19px;
  left: 32px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 8px solid #fff;
}
</style>
