import '@testing-library/jest-dom/extend-expect';

let savedItem = {};

const localStorageMock = {
  setItem: (key, item) => {
    savedItem[key] = item;
  },

  getItem: (key) => savedItem[key],

  clear:() => savedItem = {}
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
// window.localStorage = localStorageMock;
