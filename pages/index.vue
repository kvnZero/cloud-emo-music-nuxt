<template>
  <div class="container">
    <SongTitle class="song-title" :songName="playInfo.data.music.name" :singerName="playInfo.data.music.signer.name" />
    <Cover class="cover" :img="playInfo.data.music.cover.url" />
    <audio id="audio" ref="audio" :src="playInfo.data.music.url" autoplay="autoplay" controls="" controlsList="nodownload" muted="muted"></audio>
    <div id="tips">
      部分浏览器不会自动播放, 请在底部控制播放
    </div>
  </div>
</template>

<script>
import axios from "axios";

Audio.prototype.play = (function(play) {
return function () {
  var audio = this,
      args = arguments,
      promise = play.apply(audio, args);
  if (promise !== undefined) {
    promise.catch(_ => {
      console.log('浏览器不支持自动播放')
    });
  }
};
})(Audio.prototype.play);

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
  mounted(){
    // var that = this
    // this.$refs.audio.addEventListener("ended", function(){
    //   console.log("播放完毕,获取下一首数据")
    //   that.getPlayInfo().then(res => { // 请求下一首
    //     that.handlePlay(res.data);
    //   })
    // })
    this.$refs.audio.addEventListener("ended", () => {
        console.log("播放完毕,获取下一首数据")
        this.getPlayInfo().then(res => this.handlePlay(res.data)) // 请求下一首
      }
    )
    this.$refs.audio.volume = 0.3;
  },
  created() {
    this.getPlayInfo().then(res => {
      this.handlePlay(res.data);
    })
  },
  methods: {
    // getPlayList () {
    //   return axios.get("http://emo_server.abigeater.com/get/play/list")
    // },
    getPlayInfo () {
      return axios.get( process.env.baseUrl + "/get/play")
    },
    handlePlay(res) {
      if (res.data.music.name != this.playInfo.data.music.name) {
        this.playInfo = res;
        this.$refs.audio.currentTime = this.playInfo.data.time
        this.$refs.audio.play()
      }
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
#tips {
  margin-top: 5px;
  font-size: 12px;
  text-align: center;
  color: gray;
}
#audio {
    margin: 0px auto;
    width: 95%;
    position: absolute;
    bottom: 10px;
}
body {
  background-image: repeating-linear-gradient(48deg, rgb(0,0,0) 0px, rgb(0,0,0) 27px,transparent 27px, transparent 30px),repeating-linear-gradient(352deg, rgb(0,0,0) 0px, rgb(0,0,0) 27px,transparent 27px, transparent 30px),repeating-linear-gradient(30deg, rgb(0,0,0) 0px, rgb(0,0,0) 27px,transparent 27px, transparent 30px),linear-gradient(90deg, rgb(14, 172, 245),rgb(129, 60, 165));
  background-color: black;
}
</style>
