import classes from './CoinsTable.module.scss';
import { Tendency } from '../../pages/MainPage/types';
import { Badge } from '../ui/Badge/Badge';
import IconArrowUp from '../../assets/images/icon-arrow-up.svg';
import IconArrowDown from '../../assets/images/icon-arrow-down.svg';
import { ButtonControl } from '../ui/Button/ButtonControl';
import { Action } from '../ui/Button/types';
import { TableBodyProps } from './types';

export default function TableBody({
  userCoinsList,
  onRemoveCoin,
}: TableBodyProps) {
  return (
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
              onClick={() => onRemoveCoin(coin.id)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
