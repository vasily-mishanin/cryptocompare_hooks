import { Coin } from '../../pages/MainPage/types';

export type SearchResultItemProps = {
  currentCoin: Coin;
  isListed: boolean;
  onAdd: (id: string) => void;
};
