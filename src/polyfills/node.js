import { Buffer } from 'buffer/';

if (typeof globalThis !== 'undefined') {
  if (!globalThis.Buffer) {
    globalThis.Buffer = Buffer;
  }

  if (!globalThis.global) {
    globalThis.global = globalThis;
  }
}
