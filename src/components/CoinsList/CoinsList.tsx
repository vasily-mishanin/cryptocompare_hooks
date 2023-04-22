import { Component, ReactNode } from 'react';
import { CoinsTable } from '../CoinsTable/CoinsTable';
import { ListHeader } from '../ListHeader/ListHeader';
import classes from './CoinsList.module.scss';
import { Coin } from '../../pages//MainPage/types';
import { Action } from '../ui/Button/types';

type CoinsListProps = {
  userCoinsList: Coin[];
  onRemoveCoin: (action: Action, coinId: string) => void;
};

type CoinsListState = {};

export class CoinsList extends Component<CoinsListProps, CoinsListState> {
  constructor(props: CoinsListProps) {
    super(props);
  }

  render(): ReactNode {
    const columnsTitles = ['#', '', 'Name', '', 'Price', '', 'Actions'];
    const { userCoinsList, onRemoveCoin } = this.props;

    return (
      <section className={classes['list-table']}>
        <ListHeader title='My list' />
        <CoinsTable
          columnsTitles={columnsTitles}
          userCoinsList={userCoinsList}
          onRemoveCoin={onRemoveCoin}
        />
      </section>
    );
  }
}
