<template>
  <div class="container">
    <SongTitle class="song-title" :songName="playInfo.data.music.name" :singerName="playInfo.data.music.signer.name" />
    <Cover class="cover" :img="playInfo.data.music.cover.url" />
    <audio id="audio" ref="audio" :src="playInfo.data.music.url" autoplay="autoplay" controls=""></audio>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'IndexPage',
  data() {
    return {
      playList: [],
      playInfo: {
        data: {
          music: {
            name: "-",
            url: "",
            signer: {
              name: "-"
            },
            cover: {
              url: ""
            }
          }
        }
      }
    }
  },
  created() {
    this.getPlayList().then(res => {
      this.playList = res.data;
    })
    this.getPlayInfo().then(res => {
      this.playInfo = res.data;
    })
  },
  methods: {
    getPlayList () {
      return axios.get("http://emo_server.abigeater.com/get/play/list")
    },
    getPlayInfo () {
      return axios.get("http://emo_server.abigeater.com/get/play")
    },
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
#audio {
    margin: 0px auto;
    width: 95%;
    position: absolute;
    bottom: 10px;
}
</style>
