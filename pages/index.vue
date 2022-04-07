<template>
  <div class="container">
    <SongTitle class="song-title" songName="歌名" singerName="歌手名" />
    <Cover class="cover" />
    <Message messageInfo="这是一条消息,假设这条消息很长很长很长很长很长长很长很长很长很长长很长很长很长很长长很长很长很长很长"/>
    <Message messageInfo="这是一条消息"/>
    <Message messageInfo="这是一条消息"/>
    <Message messageInfo="这是一条消息"/>

  </div>
</template>

<script>
export default {
  name: 'IndexPage'
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
