export default class EventEmitter {
  constructor() {
    this.handlers = [];
  }

  on(name, fn) {
    if (this.handlers[name] === undefined) {
      this.handlers[name] = [];
    }
    for (let i = 0, l = this.handlers[name].length; i < l; i++) {
      if (this.handlers[name][i] === fn) return false;
    }
    this.handlers[name].push(fn);
    return true;
  }

  off(name, fn) {
    if (this.handlers[name] === undefined) {
      return;
    }
    for (let i = this.handlers[name].length - 1; i >= 0; i--) {
      if (this.handlers[name][i] === fn) {
        this.handlers[name].splice(i, 1);
      }
    }
  }

  emit(name, data) {
    if (this.handlers[name] === undefined) {
      return;
    }

    for (let i = 0, l = this.handlers[name].length; i < l; i++) {
      this.handlers[name][i](data);
    }
  }
}
