class ImagesPlayer {
  constructor(el, srcList, options) {
    try {
      if (typeof el === "string") this.el = document.querySelector(el)
      else if (el instanceof HTMLElement) this.el = el
      else throw '目标元素不能为空'
      if (srcList.length > 0) this.srcList = srcList
      else throw '图片数组不能为空'
      this.store = {
        length: 0
      }
      this.pl = this.el.parentNode
      this.index = 0
      this.status = 0
      this.options = options
      this.preLoad()
    } catch (e) {
      console.log(e)
    }
  }

  preLoad() {
    var _this = this
    this.options && typeof this.options.onLoadStart === 'function' && this.options.onLoadStart()
    this.srcList.forEach((src, index) => {
      (function (src, index) {
        var img = new Image()
        img.onload = () => {
          _this.store.length++
          _this.store[index] = img
          _this.options && typeof _this.options.onLoadProgress === 'function' && _this.options.onLoadProgress(_this.store.length * 100 / _this.srcList.length, src, index, true, img)
          if (_this.srcList.length === _this.store.length) _this.options && typeof _this.options.onLoadStop === 'function' && _this.options.onLoadStop()
          if (index === 0) _this.pl.replaceChild(img, _this.el)
          if (_this.options.auto) _this.play()
        }
        img.onerror = () => {
          _this.store.length++
          _this.options && typeof _this.options.onLoadProgress === 'function' && _this.options.onLoadProgress(_this.store.length * 100 / _this.srcList.length, src, index, false, img)
          if (_this.srcList.length === _this.store.length) _this.options && typeof _this.options.onLoadStop === 'function' && _this.options.onLoadStop()
          if (_this.options.auto) _this.play()
        }
        img.src = src;
      })(src, index)
    })
  }

  step () {
    if (this.status === 1 && this.index < this.store.length - 2) {
      var prev = this.store[this.index], curr = this.store[this.index+1]
      this.pl.replaceChild(curr, prev)
      this.options && typeof this.options.onProgress === 'function' && this.options.onProgress(this.index * 100 / this.store.length, curr, this.index+1, prev, this.index)
      this.index ++
      this.timer = setTimeout(() => {
        this.step()
      }, 42)
    } else if (this.status === 0) {
    } else {
      this.options && typeof this.options.onProgress === 'function' && this.options.onProgress(100, this.store[this.index], this.index)
      this.stop()
      if (this.options.loop) this.play()
    }
  }

  play() {
    if (!this.timer && this.srcList.length === this.store.length) {
      this.options && typeof this.options.onStart === 'function' && this.options.onStart()
      this.status = 1
      this.timer = setTimeout(() => {
        this.step()
      }, 100)
    }
  }

  pause() {
    this.status = 0
    clearTimeout(this.timer)
    this.timer = 0
    this.options && typeof this.options.onPause === 'function' && this.options.onPause()
  }

  stop() {
    this.status = 0
    clearTimeout(this.timer)
    this.timer = 0
    this.pl.replaceChild(this.store[0], this.store[this.index])
    this.index = 0
    this.options && typeof this.options.onStop === 'function' && this.options.onStop()
  }
}
module.exports = ImagesPlayer