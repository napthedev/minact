import { useEffect, useState } from "react";

export const createStore = <
  X extends { [key: string]: any },
  Y extends (set: Function, get: Function) => { [key: string]: Function }
>(
  initialState: X,
  initialReducers: Y
) => {
  let listeners: Function[] = [];

  let state = initialState;

  const set = (changer: { [key: string]: any }) => {
    state = { ...state, ...changer };

    listeners.forEach((listener) => listener());
  };

  const get = () => {
    return state;
  };

  let reducers = initialReducers(set, get) as ReturnType<Y>;

  const useSelector = (selector: (state: X) => any) => {
    const [selected, setSelected] = useState(selector(state));

    useEffect(() => {
      listeners.push(() => {
        const newSelected = selector(state);
        setSelected(newSelected);
      });
    }, []);

    return selected;
  };

  const subscribe = (listener: Function) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((item) => item !== listener);
    };
  };

  const useDispatch = (selector: (reducers: ReturnType<Y>) => any) => {
    const selected = selector(reducers);

    return selected;
  };

  return { useSelector, useDispatch, subscribe, get };
};
