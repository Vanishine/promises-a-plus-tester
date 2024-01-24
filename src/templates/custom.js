class MyPromise extends Promise {}

export default {
  // `resolved` is optional
  resolved(value) {
    return MyPromise.resolve(value);
  },
  // `rejected` is optional
  rejected(reason) {
    return MyPromise.reject(reason);
  },
  // `deferred` is mandatory
  deferred() {
    return MyPromise.withResolvers();
  },
};
