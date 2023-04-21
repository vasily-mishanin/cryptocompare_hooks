import { Component, ReactNode } from 'react';
import { Header } from '../components/Header/Header';
import { SearchBar } from '../components/SearchBar/SearchBar';
import classes from './MainPage.module.scss';
import {
  domainUrl,
  getCoinsData,
  getSingleSymbolPrice,
} from '../api/api-crypto';
import { SearchResultItem } from '../components/SearchResultItem/SearchResultItem';
import { CoinDynamicData, CoinStaticData } from './types';
import { Action } from '../components/ui/Button/types';

interface PriceResponseBody {
  [currency: string]: number;
}

type MainPageProps = {};
type MainPageState = {
  currentSearchResult: CoinDynamicData | null;
  // currentCoinStaticData: CoinStaticData | null;
  coinsStaticData: CoinStaticData[];
};

export class MainPage extends Component<MainPageProps, MainPageState> {
  state: MainPageState = {
    currentSearchResult: null,
    //currentCoinStaticData: null,
    coinsStaticData: [],
  };

  async componentDidMount(): Promise<void> {
    // try get info from local storage
    //if not in local storage
    const coins = await getCoinsData();

    if (coins) {
      this.setState({ coinsStaticData: coins });
    }

    console.log('componentDidMount ', coins);
  }

  handleSearch = async (inputValue: string) => {
    let priceData = (await getSingleSymbolPrice({
      symbol: inputValue,
    })) as PriceResponseBody;

    const coinPrice = Object.entries(priceData).at(0); // {USD: 28770.34} => ['USD', 28770.34]

    if (!coinPrice) {
      return;
    }

    const newResult: CoinDynamicData = {
      symbol: inputValue.toUpperCase(),
      currency: coinPrice[0],
      price: coinPrice[1],
    };

    this.setState((prev) => ({
      ...prev,
      currentSearchResult: newResult,
    }));
  };

  getCurrentCoinStaticData = () => {
    console.log(
      'getCurrentCoinStaticData',
      this.state.currentSearchResult?.symbol
    );
    const coin = this.state.coinsStaticData.find(
      (coin) => coin.symbol === this.state.currentSearchResult?.symbol
    );

    if (!coin) {
      return null;
    }

    const { id, symbol, name, imagePath } = coin;
    const currentCoin: CoinStaticData = {
      id,
      symbol,
      name,
      imagePath: `${domainUrl}${imagePath}`,
    };
    return currentCoin;
  };

  handleAddCoinToMyLists = (action: Action, id: string) => {
    console.log('handleAddCoinToMyLists ', action, id);
  };

  render(): ReactNode {
    const { currentSearchResult } = this.state;
    const currentCoinStaticData = this.getCurrentCoinStaticData();

    return (
      <div className={classes.app}>
        <Header />
        <SearchBar
          placeholder='e.g. ETH or Ethereum'
          onSearch={this.handleSearch}
        />
        {currentSearchResult && currentCoinStaticData && (
          <SearchResultItem
            staticData={currentCoinStaticData}
            dynamicData={currentSearchResult}
            onAdd={this.handleAddCoinToMyLists}
          />
        )}
      </div>
    );
  }
}
