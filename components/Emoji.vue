<template>
  <div class="rain-el" ref="emoji" v-if="isShow">
  </div>
</template>

<script>
const {Animation, Clip} = require('chito')

export default {
  name: "Emoji",
  data() {
    return {
      animation: null,
      options: null,
      isShow: true
    }
  },
  methods: {
    show(obj) {
      this.options = obj
      this.$refs['emoji'].innerHTML = obj.text

      let clip = new Clip({
        duration: obj.speed || 2000,
        repeat: 1
      }, {
        y: [-100, document.documentElement.clientHeight]
      })
      clip.on('update', (ev) => {
        const keyframe = ev.keyframe;
        this.$nextTick(() => {
          this.$refs['emoji'].style.top = keyframe.y + 'px';
          this.$refs['emoji'].style.left = obj.xAxis + 'px'
        })
      });
      this.animation = new Animation();
      this.animation.addClip([clip]);
    },
    start(){
      this.animation.start()
      this.animation.on('complete', () => {
        this.options.onDropped()
      })
    }
  }
}
</script>

<style>
.rain-el {
  height: 30px;
  width: 30px;
  position: absolute;
  z-index: 99;
  top: -1.5rem
}
</style>
