import classes from './CoinsTable.module.scss';
import { CoinsTableProps } from './types';
import TableHead from './TableHead';
import TableBody from './TableBody';

export function CoinsTable({
  columnsTitles,
  userCoinsList,
  onRemoveCoin,
}: CoinsTableProps) {
  return (
    <table className={classes.table}>
      <TableHead columnsTitles={columnsTitles} />
      <TableBody userCoinsList={userCoinsList} onRemoveCoin={onRemoveCoin} />
    </table>
  );
}
