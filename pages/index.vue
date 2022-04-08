<template>
  <div class="container">
    <SongTitle class="song-title" songName="歌名" singerName="歌手名" />
    <Cover class="cover" />
  </div>
</template>

<script>
import socket from '~/plugins/socket.io.js'

export default {
  name: 'IndexPage',
  asyncData () {
    return new Promise(resolve =>
      socket.emit('last-messages', messages => resolve({ messages }))
    )
  },
   watch: {
    messages: 'scrollToBottom'
  },
  beforeMount () {
    socket.on('new-message', (message) => {
      this.messages.push(message)
    })
  },
  mounted () {
    this.scrollToBottom()
  },
  methods: {
    sendMessage () {
      if (!this.message.trim()) { return }
      const message = {
        date: new Date().toJSON(),
        text: this.message.trim()
      }
      this.messages.push(message)
      this.message = ''
      socket.emit('send-message', message)
    },
    scrollToBottom () {
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      })
    }
  }
}
</script>

<style>
.cover {
  margin-bottom: 10px;
}
.song-title {
  margin-bottom: 10px;
}
</style>
