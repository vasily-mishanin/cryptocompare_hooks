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
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  RUB = 'RUB',
}
