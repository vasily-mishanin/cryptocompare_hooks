import { Component, ReactNode } from 'react';
import classes from './CoinsTable.module.scss';
import { Coin } from '../../pages/types';
import { Badge } from '../ui/Badge/Badge';

type CoinsTableProps = {
  columnsTitles: string[];
  userCoinsList: Coin[];
};

type CoinsTableState = {};

export class CoinsTable extends Component<CoinsTableProps, CoinsTableState> {
  constructor(props: CoinsTableProps) {
    super(props);
  }

  render(): ReactNode {
    const { userCoinsList, columnsTitles } = this.props;
    return (
      <table className={classes.table}>
        <thead className={classes.head}>
          <tr className={classes.head__row}>
            {columnsTitles.map((title) => (
              <th key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody className={classes.body}>
          {userCoinsList.map((coin, i) => (
            <tr className={classes.body__row} key={coin.id}>
              <td>{i + 1}</td>
              <td className={classes['coin-name']}>
                <Badge source={coin.imagePath} text={coin.name} size={'s'} />
                <span>{coin.name}</span>
                <span>{coin.symbol}</span>
              </td>
              <td>
                {coin.currency === 'USD' ? '$ ' : coin.currency}
                {coin.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
