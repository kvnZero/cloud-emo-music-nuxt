<template>
  <div class="message-wrap">
    <div class="message-avater">
    </div>
    <div class="message-info">
        {{messageInfo}}
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
.message-wrap {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  margin-bottom: 10px;
}
.message-info {
  width: 70%;
  padding: 10px;
  background-color: rgba(108, 108, 108, 0.2);
  border-radius: 10px;
  margin-left: 5px;
}
.message-avater {
  width: 40px;
  height: 40px;
  background-color: #000;
  border-radius: 50%;
}
</style>
