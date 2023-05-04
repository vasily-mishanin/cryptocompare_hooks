export interface PriceResponseBody {
  [currency: string]: number;
}

export type MainPageProps = {};

export type MainPageState = {
  currentSearchResult: CoinDynamicData | null | undefined;
  currentCoin: Coin | null;
  userCoinsList: Coin[];
  coinsStaticData: CoinStaticData[];
  loadingStatus: {
    isLoading: boolean;
    loadingMessage: string;
    resultMessage?: string;
  };
};

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

export type CoinAction = {
  type: ActionType;
  payload: Partial<MainPageState> & { coinId?: string };
};

export enum ActionType {
  LOADING_STATIC_DATA,
  INIT_STATIC_DATA,
  LOADING_PRICE,
  LOADING_END,
  LOADING_END_NO_DATA,
  SET_CURRENT_SEARCH_RESULT,
  SET_CURRENT_COIN,
  ADD_COIN_TO_USER_LIST,
  REMOVE_COIN_FROM_USER_LIST,
  REFRESH_RATES,
}
