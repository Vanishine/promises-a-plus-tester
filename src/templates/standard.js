export default {
  resolved(value) {
    return Promise.resolve(value);
  },
  rejected(reason) {
    return Promise.reject(reason);
  },
  deferred() {
    return Promise.withResolvers();
  },
};
