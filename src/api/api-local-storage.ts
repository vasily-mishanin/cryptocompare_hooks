export function addToLocalStorage(key: string, data: any) {
  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage(key: string) {
  let storedValue = localStorage.getItem(key);

  if (!storedValue) {
    return null;
  }

  return JSON.parse(storedValue);
}
