<template>
  <div class="img-wrap">
    <div class="img-preview">
    </div>
    <div class="img-mask">
    </div>
  </div>

</template>

<script>

export default({
  name: "Cover",
  props: {
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
  border-radius: 50%;
  overflow: hidden;
}

.img-mask {
  z-index: 2;
  width: 75%;
  height: 75%;
  background-color: blue;
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
