import classes from './Badge.module.scss';

type BadgeProps = {
  source: string;
  text: string;
  size: 'xs' | 's' | 'm' | 'l';
  display?: 'block' | 'inline' | 'inline-block';
};

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
