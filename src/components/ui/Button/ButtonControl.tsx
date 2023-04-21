import classes from './ButtonControl.module.scss';
import IconMinus from '../../../assets/images/icon-minus.svg';
import IconPlus from '../../../assets/images/icon-plus.svg';
import { Action } from './types';

type ButtonControlProps = {
  type: Action;
  size: 'xs' | 's' | 'm' | 'l';
  onClick: (action: Action) => void;
};

export function ButtonControl({ type, size, onClick }: ButtonControlProps) {
  const buttonClasses = [classes.btn, classes[size], classes[type]].join(' ');
  const buttonImage = type === Action.ADD ? IconPlus : IconMinus;
  return (
    <button className={buttonClasses} onClick={() => onClick(type)}>
      <img src={buttonImage} alt={type} />
    </button>
  );
}
