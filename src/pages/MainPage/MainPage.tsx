import { Component, ReactNode } from 'react';
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
  MainPageProps,
  MainPageState,
  PriceResponseBody,
} from './types';
import { Action } from '../../components/ui/Button/types';
import {
  addToLocalStorage,
  getFromLocalStorage,
} from '../../api/api-local-storage';
import { CoinsList } from '../../components/CoinsList/CoinsList';
import { Loading } from '../../components/ui/Loading/Loading';
import { DOGECOIN, REFETCH_TIME } from './constants';

export class MainPage extends Component<MainPageProps, MainPageState> {
  timer: number | null;

  constructor(props: MainPageProps) {
    super(props);
    this.state = {
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

    this.timer = null;
  }

  async componentDidMount(): Promise<void> {
    this.initCoinsStaticData();

    this.timer = setInterval(this.refreshRates, REFETCH_TIME);
  }

  componentWillUnmount(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  handleSearch = async (inputValue: string) => {
    const priceData = await this.getPriceData(inputValue);

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

    this.setState(
      (prev) => ({
        ...prev,
        currentSearchResult: newResult,
      }),
      this.setCurrentCoin
    );
  };

  handleAddCoinToUserList = (id: string) => {
    this.setState((prev) => this.addCoinIfNotExists(prev, id));
  };

  handleRemoveCoinFromUserList = (coinId: string) => {
    const updatedUserCoinsList = this.state.userCoinsList.filter(
      (coin) => coin.id !== coinId
    );
    addToLocalStorage(LocalSorageKeys.userCoinsList, updatedUserCoinsList);
    this.setState((prev) => {
      return {
        ...prev,
        userCoinsList: updatedUserCoinsList,
      };
    });
  };

  initCoinsStaticData = async () => {
    let coins = getFromLocalStorage(LocalSorageKeys.coinsStaticData);
    let userCoinsListFromLocalStorage = getFromLocalStorage(
      LocalSorageKeys.userCoinsList
    );

    if (!coins) {
      this.setState({
        loadingStatus: {
          isLoading: true,
          loadingMessage: 'Getting crypto static data...',
        },
      });
      coins = await getCoinsData();
      this.setState({
        loadingStatus: { isLoading: false, loadingMessage: '' },
      });
      return;
    }

    addToLocalStorage(LocalSorageKeys.coinsStaticData, coins);
    const initialUserCoinsList = userCoinsListFromLocalStorage
      ? userCoinsListFromLocalStorage
      : [DOGECOIN];

    this.setState({
      coinsStaticData: coins,
      userCoinsList: initialUserCoinsList,
    });
  };

  getCurrentCoinStaticData = () => {
    const coin = this.state.coinsStaticData.find(
      (coin) => coin.symbol === this.state.currentSearchResult?.symbol
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

  setCurrentCoin = () => {
    const currentCoinStaticData = this.getCurrentCoinStaticData(); // uses this.state

    if (!currentCoinStaticData || !this.state.currentSearchResult) {
      return;
    }

    const currentCoin = {
      ...this.state.currentSearchResult,
      ...currentCoinStaticData,
    };

    this.setState((prev) => ({ ...prev, currentCoin: currentCoin }));
  };

  getPriceData = async (coinSymbol: string) => {
    this.setState({
      loadingStatus: { isLoading: true, loadingMessage: 'Loading price...' },
    });

    let priceData = (await getSingleSymbolPrice({
      symbol: coinSymbol,
    })) as PriceResponseBody | null;

    if (!priceData) {
      this.setState({
        loadingStatus: {
          isLoading: false,
          loadingMessage: '',
          resultMessage: 'No such coin 💁‍♂️. Or use a symbol, please ',
        },
        currentCoin: null,
      });
      return;
    }

    this.setState({ loadingStatus: { isLoading: false, loadingMessage: '' } });
    return priceData;
  };

  addCoinIfNotExists = (prevState: MainPageState, id: string) => {
    const existingCoinInTheList = prevState.userCoinsList.find(
      (coin) => coin.id === id
    );

    if (prevState.currentCoin && !existingCoinInTheList) {
      const updatedUserCoinsList = [
        ...prevState.userCoinsList,
        prevState.currentCoin,
      ];
      addToLocalStorage(LocalSorageKeys.userCoinsList, updatedUserCoinsList);

      return {
        ...prevState,
        userCoinsList: updatedUserCoinsList,
      };
    }

    return prevState;
  };

  refreshRates = async () => {
    const newPrices = await this.getNewPrices();

    const updatedUserCoinsList = await this.getUpdatedUserCoinsList(newPrices);

    this.setState((prev) => ({
      ...prev,
      userCoinsList: updatedUserCoinsList,
    }));
  };

  getNewPrices = async () => {
    const symbols = this.state.userCoinsList.map((coin) => coin.symbol); // e.g. 'BTC,ETH,DOGE' for API
    const newPricesData = await getMultipleSymbolsPrices({ symbols }); // {BTC:{USD:28500,56}, ETH:{USD:..}..}
    const newPrices = Object.entries(newPricesData).map(([symbol, price]) => {
      const [currency, value] = Object.entries(
        price as { [key: string]: number }
      )[0];
      return { symbol, currency, value };
    }); // [['BTC', USD, 28500,56]]
    return newPrices;
  };

  getUpdatedUserCoinsList = async (
    newPrices: {
      symbol: string;
      currency: string;
      value: number;
    }[]
  ) => {
    return [...this.state.userCoinsList].map((coin) => {
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

  render(): ReactNode {
    const { currentCoin, userCoinsList, loadingStatus } = this.state;
    const isCurrentCoinListed = userCoinsList.find(
      (coin) => coin.id === currentCoin?.id
    );

    return (
      <div className={classes.app}>
        <Header />
        <SearchBar
          placeholder="e.g. 'ETH' for Ethereum"
          onSearch={this.handleSearch}
        />
        {currentCoin && (
          <SearchResultItem
            currentCoin={currentCoin}
            onAdd={this.handleAddCoinToUserList}
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
          onRemoveCoin={this.handleRemoveCoinFromUserList}
        />
      </div>
    );
  }
}
