import { useEffect, useState } from "react";
export const createStore = (initialState, initialReducers) => {
    let listeners = [];
    let state = initialState;
    const set = (changer) => {
        state = Object.assign(Object.assign({}, state), changer);
        listeners.forEach((listener) => listener());
    };
    const get = () => {
        return state;
    };
    let reducers = initialReducers(set, get);
    const useSelector = (selector) => {
        const [selected, setSelected] = useState(selector(state));
        useEffect(() => {
            listeners.push(() => {
                const newSelected = selector(state);
                setSelected(newSelected);
            });
        }, []);
        return selected;
    };
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((item) => item !== listener);
        };
    };
    const useDispatch = (selector) => {
        const selected = selector(reducers);
        return selected;
    };
    return { useSelector, useDispatch, subscribe, get };
};
//# sourceMappingURL=index.js.map