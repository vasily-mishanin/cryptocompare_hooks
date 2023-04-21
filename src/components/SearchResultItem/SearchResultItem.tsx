import { Component, ReactNode } from 'react';
import classes from './SearchResultItem.module.scss';
import { Coin } from '../../pages/types';
import { ButtonControl } from '../ui/Button/ButtonControl';
import { Action } from '../ui/Button/types';
import { Badge } from '../ui/Badge/Badge';

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
    const currencySymbol =
      currentCoin.currency === 'USD' ? '$' : currentCoin.currency;
    const nameClasses = [
      classes.name,
      currentCoin.name.length > 8 ? classes['font-xs'] : '',
    ].join(' ');

    const symbolClasses = [
      classes.symbol,
      currentCoin.name.length > 8 ? classes['font-xs'] : '',
    ].join(' ');

    return (
      <div className={classes.wrapper}>
        <Badge
          source={currentCoin.imagePath}
          text={currentCoin.name}
          size='l'
        />
        <div>
          <span className={nameClasses}>{currentCoin.name}</span>
          <span className={symbolClasses}>{currentCoin.symbol}</span>
        </div>
        <span className={classes.price}>
          {currencySymbol}
          {currentCoin.price}
        </span>
        {!isListed ? (
          <ButtonControl
            type={Action.ADD}
            size='s'
            onClick={() => this.onAddClick(Action.ADD)}
          />
        ) : (
          <span className={classes.listed}>Listed</span>
        )}
      </div>
    );
  }
}
