export enum Action {
  ADD = 'add',
  REMOVE = 'remove',
}

export type ButtonControlProps = {
  type: Action;
  size: 'xxs' | 'xs' | 's' | 'm' | 'l';
  onClick: (action: Action) => void;
};
