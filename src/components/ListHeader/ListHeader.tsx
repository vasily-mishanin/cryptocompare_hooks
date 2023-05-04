import classes from './ListHeader.module.scss';

export function ListHeader({ title }: { title: string }) {
  const data = new Date().toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className={classes.header}>
      <span className={classes.line}></span>
      <span>{title}</span>
      <span className={classes.line}></span>
      <span>{data}</span>
      <span className={classes.line}></span>
    </div>
  );
}
