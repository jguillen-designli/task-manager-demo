const { TextDecoder, TextEncoder } = require('util');
const {
  ReadableStream,
  TransformStream,
  WritableStream,
} = require('stream/web');

class BroadcastChannelPolyfill {
  constructor() {}
  postMessage() {}
  addEventListener() {}
  removeEventListener() {}
  close() {}
}

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  BroadcastChannel: { value: BroadcastChannelPolyfill },
  ReadableStream: { value: ReadableStream },
  TransformStream: { value: TransformStream },
  WritableStream: { value: WritableStream },
});
