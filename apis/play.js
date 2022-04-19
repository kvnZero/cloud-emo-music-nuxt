import http from "./http";

export const getPlayInfo = () => {
    return http('get', '/get/play')
}

export const getPlayList = () => {
    return http('get', '/get/play/list')
}