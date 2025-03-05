const evenBus = {
  bus: {},
  on: function (evenName, callBack) {
    if (!this.bus[evenName]) {
      this.bus[evenName] = []
    }
    this.bus[evenName].push(callBack)
    // console.log(this.bus)
  },

  off: function (evenName, callBack) {
    if (this.bus[evenName]) {
      this.bus[evenName] = this.bus[evenName].filter(item => item != callBack)
    }
  },
  emit: function (evenName, message) {
    if (this.bus[evenName]) {
      this.bus[evenName].forEach(el => {
        el(message)
      });
      // } else {
      //   console.log('dasdasdas')
      // }
    }
  }

}
// const testFuc = (data) => {
//   console.log('otherEvent', data)
// }
// evenBus.on('event1', message => {
//   console.log('event1', message)
// })
// evenBus.on('event1', message => {
//   console.log('event1', message)
// })
// evenBus.on('event2', message => {
//   console.log('event2', message)
// })
// evenBus.on('event2', testFuc)
// evenBus.emit('event1', 'gzc')
// evenBus.emit('event2', 'xmq')

// evenBus.off('event2', testFuc)


module.exports = evenBus;