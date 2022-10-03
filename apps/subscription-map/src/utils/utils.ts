export function debounce(cb: Function, duration = 250) {
  let debounceId: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(debounceId);
    debounceId = setTimeout(() => {
      cb(...args);
    }, duration);
  };
}
