<template>
  <div class="img-wrap">
    <div class="img-preview">
    </div>
    <div class="img-mask">
      <img v-show="img" :src="img" class="img-bg">
    </div>
  </div>

</template>

<script>
export default({
  name: "Cover",
  props: {
    img: {
      type: String,
      default: '',
    }
  },
  created() {

  }
})
</script>

<style>
.img-wrap {
  margin: 0 auto;
  width: 250px;
  height: 250px;
  position: relative;
}

.img-preview {
  width: 100%;
  height: 100%;
  background-color: #000;
  background-image: linear-gradient(25deg, #1b155e, #4d3375, #78548d, #a477a5);
  border-radius: 50%;
  overflow: hidden;
}

.img-mask {
  z-index: 2;
  width: 75%;
  height: 75%;
  background-image: repeating-linear-gradient(48deg, rgb(0,0,0) 0px, rgb(0,0,0) 27px,transparent 27px, transparent 30px),repeating-linear-gradient(352deg, rgb(0,0,0) 0px, rgb(0,0,0) 27px,transparent 27px, transparent 30px),repeating-linear-gradient(30deg, rgb(0,0,0) 0px, rgb(0,0,0) 27px,transparent 27px, transparent 30px),linear-gradient(90deg, rgb(14, 172, 245),rgb(129, 60, 165));
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


.img-bg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: rotation 30s infinite ease;
}

@-webkit-keyframes rotation {
  from {transform: rotate(0deg);border-radius: 50%;}
  to {transform: rotate(360deg);}
}

</style>
