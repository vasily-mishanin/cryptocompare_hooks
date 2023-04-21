import { Component, ReactNode } from 'react';
import classes from './SearchResultItem.module.scss';
import { CoinDynamicData, CoinStaticData } from '../../pages/types';
import { ButtonControl } from '../ui/Button/ButtonControl';
import { Action } from '../ui/Button/types';

type SearchResultItemProps = {
  staticData: CoinStaticData;
  dynamicData: CoinDynamicData;
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
    this.props.onAdd(action, this.props.staticData.id);
  };

  render(): ReactNode {
    const { staticData, dynamicData, onAdd } = this.props;
    const currensySymbol =
      dynamicData.currency === 'USD' ? '$' : dynamicData.currency;

    return (
      <div className={classes.wrapper}>
        <div className={classes.image}>
          <img src={staticData.imagePath} alt={staticData.name} />
        </div>
        <div>
          <span className={classes.name}>{staticData.name}</span>
          <span className={classes.symbol}>{staticData.symbol}</span>
        </div>
        <span className={classes.price}>
          {currensySymbol}
          {dynamicData.price}
        </span>
        <ButtonControl
          type={Action.ADD}
          size='s'
          onClick={() => this.onAddClick(Action.ADD)}
        />
      </div>
    );
  }
}
