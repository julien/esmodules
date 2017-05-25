
export function debounce(fn, delay = 2000) {
  return function(...args) {
    const ctx = this;
    const timeout = setTimeout(callFn,  delay);
    function callFn() {
      clearTimeout(timeout);
      fn.apply(ctx, args);
    }
  }
}
