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
  name: "cover",
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
  box-shadow: 2px 2px 10px #525252;
  background-image: repeating-linear-gradient(45deg, rgba(137,137,137, 0.06) 0px, rgba(137,137,137, 0.06) 2px,transparent 2px, transparent 4px),linear-gradient(90deg, rgb(5,5,5),rgb(5,5,5));
  border-radius: 50%;
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
