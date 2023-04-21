import { Component } from 'react';
import classes from './CoinsTable.module.scss';
import { Coin } from '../../pages/types';

type CoinsTableProps = {
  userCoinsList: Coin[];
};

type CoinsTableState = {};

export class CoinsTable extends Component<CoinsTableProps, CoinsTableState> {
  constructor(props: CoinsTableProps) {
    super(props);
  }
}
