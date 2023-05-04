import { useEffect, useReducer } from 'react';
import { Header } from '../../components/Header/Header';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import classes from './MainPage.module.scss';
import {
  domainUrl,
  getCoinsData,
  getMultipleSymbolsPrices,
  getSingleSymbolPrice,
} from '../../api/api-crypto';
import { SearchResultItem } from '../../components/SearchResultItem/SearchResultItem';
import {
  CoinDynamicData,
  CoinStaticData,
  Tendency,
  LocalSorageKeys,
  MainPageState,
  PriceResponseBody,
  ActionType,
  Coin,
} from './types';
import {
  addToLocalStorage,
  getFromLocalStorage,
} from '../../api/api-local-storage';
import { CoinsList } from '../../components/CoinsList/CoinsList';
import { Loading } from '../../components/ui/Loading/Loading';
import { DOGECOIN, REFETCH_TIME } from './constants';
import { coinsReducer } from './reducer';

const initialState: MainPageState = {
  currentSearchResult: null,
  currentCoin: null,
  userCoinsList: [],
  coinsStaticData: [],
  loadingStatus: {
    isLoading: false,
    loadingMessage: '',
    resultMessage: '',
  },
};

export function MainPage() {
  const [state, dispatch] = useReducer(coinsReducer, initialState);

  useEffect(() => {
    if (!state.coinsStaticData || state.coinsStaticData.length === 0) {
      initCoinsStaticData();
    }

    setCurrentCoin();
    const refetchInterval = setInterval(refreshRates, REFETCH_TIME);

    return () => {
      clearInterval(refetchInterval);
    };
  }, [state.currentSearchResult, state.userCoinsList]);

  const handleSearch = async (inputValue: string) => {
    const priceData = await getPriceData(inputValue);

    if (!priceData) {
      return;
    }

    const coinPrice = Object.entries(priceData).at(0); // {USD: 28770.34} => ['USD', 28770.34]
    if (!coinPrice) {
      return;
    }

    const newResult: CoinDynamicData = {
      symbol: inputValue.toUpperCase(),
      currency: coinPrice[0],
      price: coinPrice[1],
    };

    dispatch({
      type: ActionType.SET_CURRENT_SEARCH_RESULT,
      payload: { currentSearchResult: newResult },
    });
  };

  const handleAddCoinToUserList = (id: string) => {
    dispatch({
      type: ActionType.ADD_COIN_TO_USER_LIST,
      payload: { coinId: id },
    });
  };

  const handleRemoveCoinFromUserList = (coinId: string) => {
    const updatedUserCoinsList = state.userCoinsList.filter(
      (coin) => coin.id !== coinId
    );

    addToLocalStorage(LocalSorageKeys.userCoinsList, updatedUserCoinsList);

    dispatch({
      type: ActionType.REMOVE_COIN_FROM_USER_LIST,
      payload: { userCoinsList: updatedUserCoinsList },
    });
  };

  const initCoinsStaticData = async () => {
    let coins = getFromLocalStorage(LocalSorageKeys.coinsStaticData);
    let userCoinsListFromLocalStorage = getFromLocalStorage(
      LocalSorageKeys.userCoinsList
    );

    const initialUserCoinsList = userCoinsListFromLocalStorage
      ? userCoinsListFromLocalStorage
      : [DOGECOIN];

    if (!coins) {
      dispatch({ type: ActionType.LOADING_STATIC_DATA, payload: {} });
      coins = await getCoinsData();
      dispatch({ type: ActionType.LOADING_END, payload: {} });
    }

    addToLocalStorage(LocalSorageKeys.coinsStaticData, coins);

    dispatch({
      type: ActionType.INIT_STATIC_DATA,
      payload: { coinsStaticData: coins, userCoinsList: initialUserCoinsList },
    });
  };

  const getCurrentCoinStaticData = () => {
    const coin = state.coinsStaticData.find(
      (coin) => coin.symbol === state.currentSearchResult?.symbol
    );

    if (!coin) {
      return null;
    }

    const { id, symbol, name, imagePath } = coin;

    const currentCoin: CoinStaticData = {
      id,
      name,
      symbol,
      imagePath: `${domainUrl}${imagePath}`,
    };
    return currentCoin;
  };

  const setCurrentCoin = () => {
    const currentCoinStaticData = getCurrentCoinStaticData(); // uses state

    if (!currentCoinStaticData || !state.currentSearchResult) {
      return;
    }

    const currentCoin: Coin = {
      ...state.currentSearchResult,
      ...currentCoinStaticData,
    };

    dispatch({
      type: ActionType.SET_CURRENT_COIN,
      payload: { currentCoin: currentCoin },
    });
  };

  const getPriceData = async (coinSymbol: string) => {
    dispatch({ type: ActionType.LOADING_PRICE, payload: {} });
    let priceData = (await getSingleSymbolPrice({
      symbol: coinSymbol,
    })) as PriceResponseBody | null;

    if (!priceData) {
      dispatch({ type: ActionType.LOADING_END_NO_DATA, payload: {} });
      return;
    }

    dispatch({ type: ActionType.LOADING_END, payload: {} });
    return priceData;
  };

  const refreshRates = async () => {
    const newPrices = await getNewPrices();
    const updatedUserCoinsList = createUpdatedUserCoinsList(newPrices);
    dispatch({
      type: ActionType.REFRESH_RATES,
      payload: { userCoinsList: updatedUserCoinsList },
    });
  };

  const getNewPrices = async () => {
    const symbols = state.userCoinsList.map((coin) => coin.symbol); // e.g. 'BTC,ETH,DOGE' for API
    const newPricesData = await getMultipleSymbolsPrices({ symbols }); // {BTC:{USD:28500,56}, ETH:{USD:..}..}
    const newPrices = Object.entries(newPricesData).map(([symbol, price]) => {
      const [currency, value] = Object.entries(
        price as { [key: string]: number }
      )[0];
      return { symbol, currency, value };
    }); // [['BTC', USD, 28500,56]]
    return newPrices;
  };

  const createUpdatedUserCoinsList = (
    newPrices: {
      symbol: string;
      currency: string;
      value: number;
    }[]
  ) => {
    return [...state.userCoinsList].map((coin) => {
      const newPrice = newPrices.find((price) => price.symbol === coin.symbol);
      if (newPrice && newPrice.value > coin.price) {
        coin.price = newPrice.value;
        coin.dynamics = Tendency.UP;
        return coin;
      }
      if (newPrice && newPrice.value < coin.price) {
        coin.price = newPrice.value;
        coin.dynamics = Tendency.DOWN;
        return coin;
      }
      coin.dynamics = Tendency.STATIC;
      return coin;
    });
  };

  const { currentCoin, userCoinsList, loadingStatus } = state;
  const isCurrentCoinListed = userCoinsList.find(
    (coin) => coin.id === currentCoin?.id
  );

  return (
    <div className={classes.app}>
      <Header />
      <SearchBar
        placeholder="e.g. 'ETH' for Ethereum"
        onSearch={handleSearch}
      />
      {currentCoin && (
        <SearchResultItem
          currentCoin={currentCoin}
          onAdd={handleAddCoinToUserList}
          isListed={!!isCurrentCoinListed}
        />
      )}

      {!currentCoin && (
        <Loading
          isLoading={loadingStatus.isLoading}
          loadingMessage={loadingStatus.loadingMessage}
          resultMessage={loadingStatus.resultMessage}
        />
      )}

      <CoinsList
        userCoinsList={userCoinsList}
        onRemoveCoin={handleRemoveCoinFromUserList}
      />
    </div>
  );
}
