import classes from './CoinsTable.module.scss';
import { TableHeadProps } from './types';

export default function TableHead({ columnsTitles }: TableHeadProps) {
  return (
    <thead className={classes.head}>
      <tr className={classes.head__row}>
        {columnsTitles.map((title, i) => (
          <th key={i}>{title}</th>
        ))}
      </tr>
    </thead>
  );
}
