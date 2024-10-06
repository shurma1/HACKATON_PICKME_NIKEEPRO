declare module '*.module.scss' {
    interface CSSModule {
        readonly [key: string]: string;
    }
    const cssModule: CSSModule;
    export default cssModule;
}