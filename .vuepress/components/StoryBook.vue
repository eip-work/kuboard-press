<template>
  <div>
    <el-dialog
      :title="$page.frontmatter.storyBook.title"
      :visible.sync="dialogVisible"
      custom-class="storybook-dialog"
      :fullscreen="true">
      <div slot="title" class="storybook-title">
        {{$page.frontmatter.storyBook.title}} --- 
        <!-- <el-tag type="danger"> -->
          <span>{{slides[activeIndex] ? slides[activeIndex].title : ''}}</span>
        <!-- </el-tag> -->
        <el-button style="float: right; margin-right: 20px; virtical-align: top;" size="mini" type="text" @click="dialogVisible = false">全文阅读</el-button>
      </div>

      <div class="swiper-container swiper-no-swiping">
        <div class="swiper-wrapper swiper-no-swiping">
          <div v-for="(step, index) in slides" :key="step.name" class="swiper-slide swipe-slide-width swiper-no-swiping" :data-hash="step.name">
            <div :class="activeIndex === index ? 'slide-wrapper' : 'slide-wrapper noselect'"
                :disabled="activeIndex !== index"
                :style="activeIndex === index ? '' : 'cursor: pointer; opacity: 0.5;'">
              <div class="slide"
                @click.capture="clickNeighbour(index)">
                <!-- <div>{{step.title}}</div> -->
                <div :id="`dialog_${step.name}`">
                  <!-- <div :id="step.name">
                    <slot :name="step.name">
                      {{step.title}}
                    </slot>
                  </div> -->
                </div>
              </div>
              <el-button v-if="activeIndex === index" style="float: left; z-index: 100; margin-top: 5px;" size="mini" type="primary" @click="clickNeighbour(index - 1)">上一步</el-button>
              <el-button v-if="activeIndex === index" style="float: right; z-index: 100; margin-top: 5px;" size="mini" type="primary" @click="clickNeighbour(index + 1)">下一步</el-button>
            </div>
          </div>
        </div>
        <div class="swiper-pagination swiper-pagination-bullets swiper-pagination-custom swiper-no-swiping noselect" slot="pagination"></div>
        <!-- <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div> -->
      </div>
    </el-dialog>
    <el-button @click="dialogVisible = true" type="text" style="position: fixed; right: 20px; top: 60px; z-index: 10;">分步阅读</el-button>
    <template v-for="(step, index) in slides">
      <div :key="step.name">
        <div :id="`full_${step.name}`">
          <div :id="step.name">
            <slot :name="step.name">
              {{step.title}}
            </slot>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    let _this = this
    return {
      dialogVisible: false,
      activeIndex: 0,
      mySwiper: undefined,
      canSlideNext: true,
      slides: []
    }
  },
  mounted () {
    this.$nextTick(_ => {
      for (let item of this.$page.frontmatter.storyBook.pages) {
        this.slides.push(item)
      }
      setTimeout(_ => {
        this.dialogVisible = this.$page.frontmatter.storyBook.initial === 'StoryBook'
      }, 100)
    })
  },
  components: {
    // swiper, swiperSlide
  },
  watch: {
    dialogVisible () {
      let _this = this
      if (this.dialogVisible) {
        setTimeout(_ => {
          if (_this.mySwiper === undefined) {
            _this.mySwiper = new Swiper ('.swiper-container', {
              hashNavigation: {
                watchState: true,
              },
              pagination: {
                el: '.swiper-pagination',
                renderBullet(index, className) {
                    return `<span class="${className} swiper-pagination-bullet-custom">${index + 1}</span>`
                  }
              },
              speed: 300,
              freeMode: false,
              slidesPerView: 'auto',
              centeredSlides: true,
              spaceBetween: 20,
              effect: 'coverflow',
              on:{
                slideChange: function(a){
                  console.log('slideChange')
                  _this.$nextTick(_ => {
                    _this.activeIndex = _this.mySwiper.activeIndex
                  })
                },
              },
              observer:true,
              // navigation: {
              //   nextEl: '.swiper-button-next',
              //   prevEl: '.swiper-button-prev',
              // }
            })
          }
          for (let item of this.slides) {
            // console.log(`dialog_${item.name}`, document.getElementById(`dialog_${item.name}`))
            document.getElementById(`dialog_${item.name}`).appendChild(document.getElementById(item.name))
          }
          for (let item of this.slides) {
            document.getElementById(`dialog_${item.name}`).scrollTop = 0
          }
        }, 100)
      } else {
        setTimeout(_ => {
          for (let item of this.slides) {
            // console.log(`full_${item.name}`, document.getElementById(`full_${item.name}`))
            document.getElementById(`full_${item.name}`).appendChild(document.getElementById(item.name))
          }
        }, 100)
      }
    }
  },
  methods: {
    activeLinkStyle(href) {
      if (this.$page.path.indexOf(href) === 0) {
        return 'border-bottom: 2px solid #0b85ff;'
      } else {
        return ''
      }
    },
    clickNeighbour (index) {
      if (index > this.activeIndex) {
        event.stopPropagation()
        event.preventDefault()
        if (this.$parent.canSlideNext) {
          let result = this.$parent.canSlideNext.apply(this.$parent, [this.slides[this.activeIndex].name])
          console.log(result)
          if (!result.flag) {
            this.$message.error(result.message)
            return
          } else {
            this.mySwiper.slideNext()
          }
        } else {
          this.mySwiper.slideNext()
        }
      } else if (index === this.activeIndex) {
        // do nonething
      } else if (index < this.activeIndex) {
        event.stopPropagation()
        event.preventDefault()
        this.mySwiper.slidePrev()
      }
    },
    next() {
      if (this.active++ >= this.$page.frontmatter.storyBook.pages.length) this.active = 0;
    }
  }
}
</script>

<style>

.storybook-dialog {
  background-color: #555;
}

.storybook-title {
  color: #fff !important;
  font-weight: 500;
}

.storybook-dialog .el-dialog__body {
  padding: 0 0px;
  
}
.swiper-pagination-custom {
  text-align: center;
  bottom: 10px !important;
  display: inline-block;
  left: 20vw !important;
  width: 60vw !important;
}

.swiper-pagination-bullet-custom {
  width: 20px !important;
  height: 20px !important;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #ffffff !important;
  opacity: 1 !important;
  background: rgba(0,0,0,0.3) !important;
}
.swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
  color: #fff !important;
  background: #007af5 !important;
}

.swipe-slide-width {
  width: 70vw;
}

.slide-wrapper {
  height: calc(100vh - 55px);
  margin: 0 0px;
}

.slide {
  background-color: #ffffff;
  /* border: 1px solid #d7dae2; */
  padding: 0 20px;
  height: calc(100vh - 95px);
  overflow: hidden;
  overflow-y: scroll;
}

</style>
