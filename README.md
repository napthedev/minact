<p align="center">
  <img src="https://res.cloudinary.com/naptest/image/upload/v1645189832/minact_avfrdg.png">
</p>

# Minact

[![Build Size](https://img.shields.io/bundlephobia/minzip/minact?label=Bundle%20size&style=flat&color=success)](https://bundlephobia.com/result?p=minact)
[![Version](https://img.shields.io/npm/v/minact?style=flat&color=success)](https://www.npmjs.com/package/minact)
[![Downloads](https://img.shields.io/npm/dt/minact.svg?style=flat&color=success)](https://www.npmjs.com/package/minact)

A simple react state management library without a provider

## Demo

[https://codesandbox.io/s/minact-demo-b3f6nd](https://codesandbox.io/s/minact-demo-b3f6nd?file=/src/store/index.js)

## Installation

```bash
npm install minact
# or
# yarn add minact
```

## Usage

### Create a store

```javascript
import { createStore } from "minact";

export const { useSelector, useDispatch } = createStore(
  { count: 0 },
  (set, get) => ({
    increase: (amount) => set({ count: get().count + (amount || 1) }),
  })
);
```

### Use the hooks inside your components

```jsx
const View = () => {
  const count = useSelector((state) => state.count);

  return <div>Count: {count}</div>;
};

const Controls = () => {
  const increase = useDispatch((reducers) => reducers.increase);

  return <button onClick={() => increase()}>Increase</button>;
};
```

### Async actions

Just call the `set` function to update the store, async functions don't matter.

```javascript
createStore({ data: null }, (set, get) => ({
  update: async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    set({ data });
  },
}));
```

### Multiple selectors

```jsx
const App = () => {
  const { count, user } = useSelector((state) => ({
    count: state.count,
    user: state.user,
  }));

  // or

  const [ count, user ] = useSelector((state) => [
    count: state.count,
    user: state.user,
  ]);

  // useDispatch also works

  const { increase, decrease } = useDispatch((reducers) => ({
    increase: reducers.increase,
    decrease: reducers.decrease,
  }));

  // or

  const [ increase, decrease ] = useDispatch((reducers) => [
    increase: reducers.increase,
    decrease: reducers.decrease,
  ]);
};
```

### Usage outside of react component

```javascript
const store = createStore({ count: 0 }, (set, get) => ({
  increase: () => set({ count: get().count + 1 }),
}));

// Subscribe to store changes and log the state
const unsubscribe = store.subscribe(() => console.log(store.get()));

// Unsubscribe from changes
unsubscribe();
```

### Scales very well

```
src
│── store
│   │── user-store.js
│   │── count-store.js
│   │── any-store.js
```

You can create as many store as you want, they will work independently from each other
