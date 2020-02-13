declare module 'is-proxy' {
  /**
   * Checks whether a value is a proxy object
   *
   * @param {*} o
   * @returns {boolean} a boolean, true if value is a proxy object, false if it is not
   */
  export var isProxy: (o: any) => boolean;
}
declare module 'is-proxy/pure' {
  /**
   * Checks whether a value is a proxy object
   *
   * @param {*} o
   * @returns {boolean} a boolean, true if value is a proxy object, false if it is not
   */
  export function isProxy(o: any): boolean;
  export var Proxy: ProxyConstructor;
}
