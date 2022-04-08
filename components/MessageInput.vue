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
  name: "MessageInput",
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
  height: 40px;
  width: 100%;
}
.message-input {
  width: 75%;
  height: 100%;
  display: inline-block;
  background-color: rgba(108, 108, 108, 0.2);
}
.message-send-btn {
  width: 15%;
  height: 60%;
  background-color: rgb(47, 196, 255);
  border-radius: 10px;
  display: inline-block;
  padding: 10px auto;
}
</style>
