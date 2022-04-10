<template>
  <div class="top-info">
    <div class="song-name">
        {{songName}}
    </div>
    <div class="singer-name">
        {{singerName}}
    </div>
  </div>
</template>

<script>

export default({
  name: "SongTitle",
  props: {
    songName: {
      type: String,
      default: "未知",
    },
    singerName: {
      type: String,
      default: "未知",
    },
  }
})
</script>

<style>
.top-info {
  text-align: center;
}
.song-name {
  font-size: 18px;
  color: rgb(188, 188, 188)
}
.singer-name {
  font-size: 12px;
  color: gray
}
</style>
