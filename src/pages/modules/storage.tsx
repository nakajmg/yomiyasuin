import { UserData } from '../types';

export type ChromeStorage = {
  userData: UserData[];
};

export type StorageKeys = typeof STORAGE_KEYS;

const defaultStorage: ChromeStorage = {
  userData: [],
};

export const STORAGE_KEYS = Object.keys(defaultStorage);

export const saveStorage = (storageData: ChromeStorage, cb?: () => void) => {
  return new Promise<void>((resolve) => {
    chrome.storage.local.set(storageData, () => {
      console.log('saved');
      cb && cb();
      resolve();
    });
  });
};

export const loadStorage = async (keys: string[]) => {
  return new Promise<ChromeStorage>((resolve) => {
    chrome.storage.local.get(keys, (storageData) => {
      resolve({
        ...defaultStorage,
        ...storageData,
      });
    });
  });
};
