const evenBus = require('./evenBus.js');

test('on to an event and emit it？', () => {
  const callback = jest.fn();
  evenBus.on('testEvent', callback);
  evenBus.emit('testEvent', 'testMessage');

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith('testMessage');
});

test('on twice times to the same event and emit it', () => {
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  evenBus.on('testEvent', callback1);
  evenBus.on('testEvent', callback2);
  evenBus.emit('testEvent', 'testMessage');

  expect(callback1).toHaveBeenCalledTimes(1);
  expect(callback1).toHaveBeenCalledWith('testMessage');
  expect(callback2).toHaveBeenCalledTimes(1);
  expect(callback2).toHaveBeenCalledWith('testMessage');
});

test('on twice times to the different event and emit them', () => {
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  evenBus.on('testEvent1', callback1);
  evenBus.on('testEvent2', callback2);
  evenBus.emit('testEvent1', 'testMessage1');
  evenBus.emit('testEvent2', 'testMessage2');

  expect(callback1).toHaveBeenCalledTimes(1);
  expect(callback1).toHaveBeenCalledWith('testMessage1');
  expect(callback2).toHaveBeenCalledTimes(1);
  expect(callback2).toHaveBeenCalledWith('testMessage2');
});

test('off from an event and does not emit it', () => {
  const callback1 = jest.fn();
  // const callback2 = jest.fn();
  evenBus.on('testEvent1', callback1);
  // evenBus.on('testEvent2', callback2);

  // evenBus.emit('testEvent2', 'testMessage2');
  evenBus.off('testEvent1', callback1);
  evenBus.emit('testEvent1', 'testMessage1');

  expect(callback1).not.toHaveBeenCalled();
  // expect(callback2).toHaveBeenCalledTimes(1);
  // expect(callback2).toHaveBeenCalledWith('testMessage2');
});

test('should receive and process an event after on it', () => {
  const callback = jest.fn();
  evenBus.emit('testEvent', 'Hello, World!');
  evenBus.on('testEvent', callback);
  evenBus.emit('testEvent', 'Another Message');

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith('Another Message');
});

test('Cancel one subscription and print others', () => {
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  const callback3 = jest.fn();
  evenBus.on('testEvent', callback1);
  evenBus.on('testEvent', callback2);
  evenBus.on('testEvent', callback3);
  evenBus.off('testEvent', callback2);

  evenBus.emit('testEvent', 'testEvent');

  expect(callback2).not.toHaveBeenCalled();
});


test('Handle events with no subscribers', () => {
  evenBus.emit('noSubscriberEvent', 'This should not cause an error');
});