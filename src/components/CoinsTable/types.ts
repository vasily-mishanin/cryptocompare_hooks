import { Coin } from '../../pages/MainPage/types';

export type CoinsTableProps = {
  columnsTitles: string[];
  userCoinsList: Coin[];
  onRemoveCoin: (coinId: string) => void;
};

export type TableHeadProps = {
  columnsTitles: string[];
};

export type TableBodyProps = {
  userCoinsList: Coin[];
  onRemoveCoin: (coinId: string) => void;
};
