<template>
  <div class="container">
    <song-title class="song-title" :songName="playInfo.data.music.name" :singerName="playInfo.data.music.signer.name" />
    <div id="loop" v-show="isPlay">
      <input type="button" class="loop-btn"  v-bind:class="{'loop-btn-enable': isLoop, 'loop-btn-disable': !isLoop}" @click='loopChange' value="🔁循环播放" />
    </div>
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
import Vue from "vue";
import Emoji from "../components/Emoji";

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
          },
          animation: []
        }
      },
      online: 0,
      danmus: [],
      isPlay: false,
      isLoop: false
    }
  },
  mounted(){
    this.$refs.audio.addEventListener("ended", () => {
        console.log("播放完毕,获取下一首数据")
        if (this.isLoop) {
          this.$refs.audio.currentTime = 0;
          this.$refs.audio.play()
        } else {
          getPlayInfo().then(res => this.handlePlay(res.data)) // 请求下一首
        }
      }
    )
    this.$refs.audio.addEventListener("play", () => {
        if (this.online) {
          this.isPlay = true
        }
      }
    )
    this.$refs.audio.volume = 0.3;
    socket.on('client-change', (data) => {
      this.online = data
    });
    socket.on('someone-leave-room', () => {
      console.log("有人离开了房间")
      socket.emit('query-room-count', 'main', data => {
        this.online = data
      });
    });
    socket.on('play-animation', (data) => {
      console.log("服务器投放雨")
      this.rainAnimation({
        num: data.num,
        text: data.text
      })
    });
    socket.on('message-come', (data) => {
      this.$refs.danmaku.add(data)
    });
  },
  created() {
    getPlayInfo().then(res => {
      this.handlePlay(res.data);
    })
    this.loopSongAnimation();
  },
  methods: {
    handlePlay(res) {
      if (res.music.name !== this.playInfo.data.music.name) {
        this.playInfo.data = res;
        this.$refs.audio.currentTime = this.playInfo.data.time
        this.$refs.audio.play()
      }
    },
    loopSongAnimation() {
      setTimeout(() => {
        for (let i = 0; i < this.playInfo.data.animation.length; i++){
          let item = this.playInfo.data.animation[i]
          if (item.position === parseInt(this.$refs.audio.currentTime)) {
            this.rainAnimation({
              num: item.num,
              text: item.text
            })
          }
        }
        this.loopSongAnimation();
      }, 1000)
    },
    loopChange () {
      this.isLoop = !this.isLoop
    },
    rainAnimation(info) {
      for (let i = 0; i < info.num; i++){
        let x = Math.floor(Math.random() * ( window.innerWidth - 20) + 20)
        let node = new Vue({
          render: h => h(Emoji)
        }).$mount()
        document.body.appendChild(node.$el)
        let instance = node.$children[0]
        instance.show({
          xAxis:  x,
          text: info.text,
          speed:  5000,
          onDropped: () => {
            document.body.removeChild(instance.$el)
          }
        })
        setTimeout(() => {
          instance.start()
        }, i * (10 * 1000 / info.num))
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
#loop{
  text-align: center;
  margin-bottom: 10px;
}
.loop-btn-enable {
  background-color: rgba(59, 133, 175, 0.84);
}
.loop-btn-disable {
  background-color: #cbcbcb;
}
.loop-btn {
  height: 30px;
  width: 100px;
  border-radius: 20px;
  color: #2c2c2c;
}
body {
  background-image: repeating-linear-gradient(48deg, rgb(0,0,0) 0px, rgb(0,0,0) 27px,transparent 27px, transparent 30px),repeating-linear-gradient(352deg, rgb(0,0,0) 0px, rgb(0,0,0) 27px,transparent 27px, transparent 30px),repeating-linear-gradient(30deg, rgb(0,0,0) 0px, rgb(0,0,0) 27px,transparent 27px, transparent 30px),linear-gradient(90deg, rgb(14, 172, 245),rgb(129, 60, 165));
  background-color: black;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
