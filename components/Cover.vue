<template>
  <div class="img-wrap">
    <div class="img-preview">
    </div>
    <div class="img-mask">
      <img v-show="img != ''" :src="img" class="img-bg">
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
  background-image: radial-gradient(circle at 1% 52%, rgba(139, 139, 139,0.05) 0%, rgba(139, 139, 139,0.05) 50%,rgba(21, 21, 21,0.05) 50%, rgba(21, 21, 21,0.05) 100%),radial-gradient(circle at 41% 28%, rgba(81, 81, 81,0.05) 0%, rgba(81, 81, 81,0.05) 50%,rgba(7, 7, 7,0.05) 50%, rgba(7, 7, 7,0.05) 100%),radial-gradient(circle at 48% 1%, rgba(93, 93, 93,0.05) 0%, rgba(93, 93, 93,0.05) 50%,rgba(7, 7, 7,0.05) 50%, rgba(7, 7, 7,0.05) 100%),linear-gradient(255deg, rgb(156, 41, 132),rgb(47, 14, 122));
  border-radius: 50%;
  overflow: hidden;
}

.img-mask {
  z-index: 2;
  width: 75%;
  height: 75%;
  background-color: rgb(146, 149, 103);
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
