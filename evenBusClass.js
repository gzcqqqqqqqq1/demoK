// eventbus.js
class EventBus {
  constructor () {
    this.bus = {};
  }

  // 订阅事件
  on (eventName, callback) {
    if (!this.bus[eventName]) {
      this.bus[eventName] = [];
    }
    this.bus[eventName].push(callback);
  }

  // 发布事件
  emit (eventName, message) {
    if (this.bus[eventName]) {
      this.bus[eventName].forEach(item => item(message));
    }
  }

  // 取消订阅事件
  off (eventName, callback) {
    if (this.bus[eventName]) {
      this.bus[eventName] = this.bus[eventName].filter(cb => cb !== callback);
    }
  }
}

const bus = new EventBus()
const testCallBack = (message) => {
  console.log('hello', message)
}
bus.on('test1', testCallBack)
bus.emit('test1', 'gzc')
// module.exports = EventBus;