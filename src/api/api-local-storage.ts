import { LocalSorageKeys } from '../pages/MainPage/types';

export function addToLocalStorage(key: LocalSorageKeys, data: any) {
  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage(key: LocalSorageKeys) {
  let storedValue = localStorage.getItem(key);

  if (!storedValue) {
    return null;
  }

  return JSON.parse(storedValue);
}
