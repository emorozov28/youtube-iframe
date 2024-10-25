declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: unknown;
  }
}

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}