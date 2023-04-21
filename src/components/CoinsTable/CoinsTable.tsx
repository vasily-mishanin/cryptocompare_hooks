import { Component, ReactNode } from 'react';
import classes from './CoinsTable.module.scss';
import { Coin } from '../../pages/types';
import { Badge } from '../ui/Badge/Badge';
import { ButtonControl } from '../ui/Button/ButtonControl';
import { Action } from '../ui/Button/types';

type CoinsTableProps = {
  columnsTitles: string[];
  userCoinsList: Coin[];
  onRemoveCoin: (action: Action, coinId: string) => void;
};

type CoinsTableState = {};

export class CoinsTable extends Component<CoinsTableProps, CoinsTableState> {
  constructor(props: CoinsTableProps) {
    super(props);
  }

  render(): ReactNode {
    const { userCoinsList, columnsTitles, onRemoveCoin } = this.props;
    return (
      <table className={classes.table}>
        <thead className={classes.head}>
          <tr className={classes.head__row}>
            {columnsTitles.map((title) => (
              <th key={title + Math.random().toFixed(3)}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody className={classes.body}>
          {userCoinsList.map((coin, i) => (
            <tr className={classes.body__row} key={coin.id}>
              <td>{i + 1}</td>
              <td>
                <Badge source={coin.imagePath} text={coin.name} size={'s'} />
              </td>
              <td>
                <span>{coin.name}</span>
              </td>
              <td>
                <span>{coin.symbol}</span>
              </td>
              <td>
                {coin.currency === 'USD' ? '$ ' : coin.currency}
                {coin.price}
              </td>
              <td>
                <ButtonControl
                  type={Action.REMOVE}
                  size='xs'
                  onClick={() => onRemoveCoin(Action.REMOVE, coin.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
