import { resolve, reject, Promise } from 'https://esm.run/rsvp';

export default {
  resolved: resolve,
  rejected: reject,
  deferred() {
    let resolve, reject;
    const promise = new Promise((...args) => {
      [resolve, reject] = args;
    });
    return { promise, resolve, reject };
  },
};
