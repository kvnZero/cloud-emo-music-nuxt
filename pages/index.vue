<template>
  <div class="container">
    <song-title class="song-title" :songName="playInfo.data.music.name" :singerName="playInfo.data.music.signer.name" />
    <cover class="cover" :img="playInfo.data.music.cover.url" />
    <div id="online">当前在线人数:{{online}}</div>
    <div id="tips">部分浏览器不会自动播放, 请在底部控制播放</div>
    <vue-danmaku id="danmaku" ref="danmaku" :danmus="danmus" :speeds="100" :channels="5" :fontSize="20" :randomChannel="true" extraStyle="color:#30e1d7e3;font-weight: bold;"></vue-danmaku>

    <audio v-show="!isPlay" id="audio" ref="audio" :src="playInfo.data.music.url" autoplay="autoplay" controls="" controlsList="nodownload" muted="muted"></audio>
    <message-input :isPlay="isPlay" :online="online"></message-input>
  </div>
</template>

<script>
import socket from '~/plugins/socket.io.js'
import { getPlayInfo } from '~/apis/play.js'

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
      },
      online: 0,
      danmus: [],
      isPlay: false,
    }
  },
  mounted(){
    this.$refs.audio.addEventListener("ended", () => {
        console.log("播放完毕,获取下一首数据")
        getPlayInfo().then(res => this.handlePlay(res.data)) // 请求下一首
      }
    )
    this.$refs.audio.addEventListener("play", () => {
        if (this.online) {
          this.isPlay = true
        }
      }
    )
    this.$refs.audio.volume = 0.3;
    socket.on('client-change', data => {
      this.online = data
    });
    socket.on('someone-leave-room', () => {
      console.log("有人离开了房间")
      socket.emit('query-room-count', 'main', data => {
        this.online = data
      });
    });
    socket.on('message-come', (data) => {
      this.$refs.danmaku.add(data)
    });
  },
  created() {
    getPlayInfo().then(res => {
      this.handlePlay(res.data);
    })
  },
  methods: {
    handlePlay(res) {
      if (res.music.name !== this.playInfo.data.music.name) {
        this.playInfo.data = res;
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
#online {
  margin-top: 5px;
  font-size: 12px;
  text-align: center;
  color: gray;
}
#audio {
  width: 100%;
  position: absolute;
  bottom: 10px;
  left: 0
}

#danmaku{
  margin-top: 5px;
  height: 200px;
}
body {
  background-image: repeating-linear-gradient(48deg, rgb(0,0,0) 0px, rgb(0,0,0) 27px,transparent 27px, transparent 30px),repeating-linear-gradient(352deg, rgb(0,0,0) 0px, rgb(0,0,0) 27px,transparent 27px, transparent 30px),repeating-linear-gradient(30deg, rgb(0,0,0) 0px, rgb(0,0,0) 27px,transparent 27px, transparent 30px),linear-gradient(90deg, rgb(14, 172, 245),rgb(129, 60, 165));
  background-color: black;
}
</style>
