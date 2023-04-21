import { Component, ReactNode } from 'react';
import { CoinsTable } from '../CoinsTable/CoinsTable';
import { ListHeader } from '../ListHeader/ListHeader';
import classes from './CoinsList.module.scss';
import { Coin } from '../../pages/types';

type CoinsListProps = {
  userCoinsList: Coin[];
};

type CoinsListState = {};

export class CoinsList extends Component<CoinsListProps, CoinsListState> {
  constructor(props: CoinsListProps) {
    super(props);
  }

  render(): ReactNode {
    const columnsTitles = ['#', 'Name', 'Price', 'Actions'];

    return (
      <section>
        <ListHeader title='My list' />
        <CoinsTable
          columnsTitles={columnsTitles}
          userCoinsList={this.props.userCoinsList}
        />
      </section>
    );
  }
}
