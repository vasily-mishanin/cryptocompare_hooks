import classes from './Badge.module.scss';

type BadgeProps = {
  source: string;
  text: string;
  size: 's' | 'm' | 'l';
};

export function Badge({ source, text, size }: BadgeProps) {
  const badgeClasses = [classes.image, classes[size]].join(' ');
  return (
    <div className={badgeClasses}>
      <img src={source} alt={text} />
    </div>
  );
}
