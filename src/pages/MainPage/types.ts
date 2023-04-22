export interface CoinStaticData {
  id: string;
  symbol: string;
  name: string;
  imagePath: string;
}

export interface CoinDynamicData {
  symbol: string;
  currency: string;
  price: number;
  dynamics?: Tendency;
}

export type Coin = CoinStaticData & CoinDynamicData;

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  RUB = 'RUB',
}

export enum Tendency {
  UP,
  DOWN,
  STATIC,
}

export enum LocalSorageKeys {
  coinsStaticData = 'coinsStaticData',
  userCoinsList = 'userCoinsList',
}
