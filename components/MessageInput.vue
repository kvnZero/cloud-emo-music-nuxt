<template>
  <div v-show="isPlay" id="message">
    <input v-model="message" />
    <button @click="sendMessage">发 送</button>
  </div>
</template>

<script>
import socket from '~/plugins/socket.io.js'

export default({
  name: "message-input",
  props: {
    isPlay: {
      type: Boolean,
      default: false,
    },
    online: {
      default: 0,
    },
  },
  data() {
    return {
      message: ""
    }
  },
  methods: {
    sendMessage() {
      if (this.message && this.online) {
        socket.emit('message-send', this.message);
        this.message = ""
      }
    }
  }
})
</script>

<style>
#message button {
  width: 17%;
  height: 35px;
  font-size:16px;
  caret-color: green;
  border: 0;
  border-radius: 8px;
  color: white;
  background-color: #52cced;
  font-weight: 400;
  padding: 2px 10px;
  border-color: transparent;
}

#message input {
  width: 72%;
  height: 30px;
  font-size:16px;
  caret-color: green;
  border: 0;
  outline-color: green;
  outline-width: 1px;
  border-radius: 8px;
  padding: 2px 10px;
  border-color: transparent;
}

#message {
  position: absolute;
  bottom: 5px;
  width: 100%;
}
</style>
