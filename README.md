### ☁Emo 前端Nuxt项目代码

体验地址： http://emo.abigeater.com

## 功能：

1. 云听歌，由服务端跟踪播放进度(测试环境下不会跳转进度)
2. 在线唠嗑、 人数统计

## 如何部署：

1. 修改环境变量下的服务器地址：
    nuxt.config.js[51:52] => 将服务器修改成你部署的服务器

2. 本地可直接通过建立`.env`文件设置环境变量：

```code
BASE_URL=http://127.0.0.1:9501
SOCKET_URL=ws://127.0.0.1:9502
```

参考部署文章：[Nuxt(vue)项目使用PM2部署](https://abigeater.com/archives/188)
