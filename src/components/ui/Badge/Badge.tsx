import classes from './Badge.module.scss';
import { BadgeProps } from './types';

export function Badge({ source, text, size, display }: BadgeProps) {
  const badgeClasses = [
    classes.image,
    classes[size],
    display ? classes[display] : '',
  ].join(' ');
  return (
    <div className={badgeClasses}>
      <img src={source} alt={text} />
    </div>
  );
}
