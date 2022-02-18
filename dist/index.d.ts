export declare const createStore: <X extends {
    [key: string]: any;
}, Y extends (set: Function, get: Function) => {
    [key: string]: Function;
}>(initialState: X, initialReducers: Y) => {
    useSelector: (selector: (state: X) => any) => any;
    useDispatch: (selector: (reducers: ReturnType<Y>) => any) => any;
    subscribe: (listener: Function) => () => void;
    get: () => X;
};
//# sourceMappingURL=index.d.ts.map