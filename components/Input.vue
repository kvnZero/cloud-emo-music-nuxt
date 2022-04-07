<template>
  <div class="input-wrap">
    <input class="message-input" />
    <div class="message-send-btn">
        发送
    </div>
  </div>

</template>

<script>

export default({
  name: "Message",
  props: {
    messageInfo: {
      type: String
    },
  }
})
</script>

<style>
.input-wrap {
  padding: 0 10px;
  height: 100%;
  width: 100%;
}
.message-input {
  width: 80%;
  height: 40px;
  display: inline-block;
  background-color: rgba(108, 108, 108, 0.2);
}
.message-send-btn {
  width: 10%;
  height: 40px;
  background-color: rgb(47, 196, 255);
  border-radius: 10px;
  display: inline-block;
}
</style>
