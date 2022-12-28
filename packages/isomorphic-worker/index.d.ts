type ConstructorOf<C> = { new (...args: any[]): C };

declare const _default: ConstructorOf<Worker>;
export default _default;



declare module '@wixc3/isomorphic-worker/worker' {
    export default Worker;
}