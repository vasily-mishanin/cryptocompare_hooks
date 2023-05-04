import { Coin } from '../../pages/MainPage/types';

export type CoinsTableProps = {
  columnsTitles: string[];
  userCoinsList: Coin[];
  onRemoveCoin: (coinId: string) => void;
};
