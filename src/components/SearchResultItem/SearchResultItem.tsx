import classes from './SearchResultItem.module.scss';
import { ButtonControl } from '../ui/Button/ButtonControl';
import { Action } from '../ui/Button/types';
import { Badge } from '../ui/Badge/Badge';
import { SearchResultItemProps } from './types';

export function SearchResultItem({
  currentCoin,
  isListed,
  onAdd,
}: SearchResultItemProps) {
  const onAddClick = () => {
    onAdd(currentCoin.id);
  };

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
      <Badge source={currentCoin.imagePath} text={currentCoin.name} size='l' />
      <div>
        <span className={nameClasses}>{currentCoin.name}</span>
        <span className={symbolClasses}>{currentCoin.symbol}</span>
      </div>
      <span className={classes.price}>
        {currencySymbol}
        {currentCoin.price}
      </span>
      {!isListed ? (
        <ButtonControl type={Action.ADD} size='s' onClick={onAddClick} />
      ) : (
        <span className={classes.listed}>Listed</span>
      )}
    </div>
  );
}
