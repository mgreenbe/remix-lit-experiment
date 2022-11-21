declare module "sort-by" {
  function sortBy<T>(...args: string[]): (a: T, b: T) => number;

  export default sortBy;
}
