import { Component, ReactNode } from 'react';
import classes from './SearchResultItem.module.scss';
import { Coin } from '../../pages/types';
import { ButtonControl } from '../ui/Button/ButtonControl';
import { Action } from '../ui/Button/types';

type SearchResultItemProps = {
  currentCoin: Coin;
  isListed: boolean;
  onAdd: (action: Action, id: string) => void;
};

type SearchResultItemState = {};

export class SearchResultItem extends Component<
  SearchResultItemProps,
  SearchResultItemState
> {
  constructor(props: SearchResultItemProps) {
    super(props);
  }

  onAddClick = (action: Action) => {
    this.props.onAdd(action, this.props.currentCoin.id);
  };

  render(): ReactNode {
    const { currentCoin, isListed, onAdd } = this.props;
    const currensySymbol =
      currentCoin.currency === 'USD' ? '$' : currentCoin.currency;

    return (
      <div className={classes.wrapper}>
        <div className={classes.image}>
          <img src={currentCoin.imagePath} alt={currentCoin.name} />
        </div>
        <div>
          <span className={classes.name}>{currentCoin.name}</span>
          <span className={classes.symbol}>{currentCoin.symbol}</span>
        </div>
        <span className={classes.price}>
          {currensySymbol}
          {currentCoin.price}
        </span>
        {!isListed ? (
          <ButtonControl
            type={Action.ADD}
            size='s'
            onClick={() => this.onAddClick(Action.ADD)}
          />
        ) : (
          <span>Listed</span>
        )}
      </div>
    );
  }
}
