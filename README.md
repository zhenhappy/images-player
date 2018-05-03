# 序列图片视频化播放器

感谢张鑫旭提供的思路

[http://www.zhangxinxu.com/wordpress/2018/05/image-sequence-html5-video-play/](http://www.zhangxinxu.com/wordpress/2018/05/image-sequence-html5-video-play/)

## Demo

[https://zhenhappy.github.io/images-player/test/](https://zhenhappy.github.io/images-player/test/)

## Install

```
<script type="text/javascript" src="https://zhenhappy.github.io/images-player/dist/index.js"></script>
```

## Usage

```js
var imagesPlayer = new ImagesPlayer('#img', list, {
    auto: true,
    loop: true,
    onLoadStart() {
        console.log('load start')
    },
    onLoadProgress(percent) {
        console.log(percent)
    },
    onLoadStop() {
        console.log('load stop')
    },
    onStart() {
        console.log('start')
    },
    onProgress(percent) {
        console.log(percent)
    },
    onPause() {
        console.log('pause')
    },
    onStop() {
        console.log('stop')
    }
})
```
