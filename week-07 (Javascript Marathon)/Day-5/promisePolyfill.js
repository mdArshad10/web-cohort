// custom Promise

class MyPromise {
  constructor(executorFn) {
    this._state = "pending";
    this._successCallbacks = [];
    this._errorCallbacks = [];
    this._finallyCallbacks = [];
    executorFn(this.resolverFn.bind(this), this.rejectFn.bind(this));
  }

  then(cb) {
    this._successCallbacks.push(cb);

    return this;
  }

  finally(cb) {
    this._finallyCallbacks.push(cb);
    return this;
  }

  catch(cb) {
    this._errorCallbacks.push(cb);

    return this;
  }

  resolverFn(value) {
    this._state = "fullfil";
    this._successCallbacks.forEach((cb) => cb(value));
    this._finallyCallbacks.forEach((cb) => cb());
  }
  rejectFn(value) {
    this._state = "reject";
    this._errorCallbacks.forEach((cb) => cb(value));
    this._finallyCallbacks.forEach((cb) => cb());
  }
}

const bulidPromise = () => {
  return new Promise((resolver, reject) => {
    setTimeout(() => {
      resolver();
    }, 3000);
  });
};

const MyNewPromise = bulidPromise();

MyNewPromise.then(() => console.log("waiting for 5 section"));
