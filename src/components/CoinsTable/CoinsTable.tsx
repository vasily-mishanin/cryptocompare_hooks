import { Component, ReactNode } from 'react';
import classes from './CoinsTable.module.scss';
import { Coin, Tendency } from '../../pages/MainPage/types';
import { Badge } from '../ui/Badge/Badge';
import { ButtonControl } from '../ui/Button/ButtonControl';
import { Action } from '../ui/Button/types';
import IconArrowUp from '../../assets/images/icon-arrow-up.svg';
import IconArrowDown from '../../assets/images/icon-arrow-down.svg';

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
              <td className={classes.symbol}>
                <span>{coin.symbol}</span>
              </td>
              <td
                className={
                  coin.dynamics === Tendency.UP
                    ? [classes.price, classes.green].join(' ')
                    : coin.dynamics === Tendency.DOWN
                    ? classes.red
                    : ''
                }
              >
                {coin.currency === 'USD' ? '$ ' : coin.currency}
                {coin.price}
              </td>
              <td className={classes.tendency}>
                {coin.dynamics === Tendency.UP && (
                  <Badge
                    source={IconArrowUp}
                    text='Rises'
                    size='s'
                    display='inline-block'
                  />
                )}
                {coin.dynamics === Tendency.DOWN && (
                  <Badge
                    source={IconArrowDown}
                    text='Getting cheaper'
                    size='s'
                    display='inline-block'
                  />
                )}
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
