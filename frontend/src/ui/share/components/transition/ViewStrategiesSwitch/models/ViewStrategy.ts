export interface ViewStrategy<T> {
  view: React.ComponentType<T>;
  isMatch(props: T): boolean;
}
