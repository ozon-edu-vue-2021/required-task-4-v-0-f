// leading + trailing debounce
export default function debounce(func, timeout) {
  let lastCall, timerId;
  return function debounced(...args) {
    const previousCall = lastCall;
    lastCall = Date.now();
    if (!previousCall || lastCall - previousCall >= timeout) {
      func.apply(this, args); // leading
    }
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), timeout);
  };
}
