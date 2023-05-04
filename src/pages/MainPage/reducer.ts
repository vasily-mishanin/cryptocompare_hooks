import { addToLocalStorage } from '../../api/api-local-storage';
import {
  ActionType,
  CoinAction,
  LocalSorageKeys,
  MainPageState,
} from './types';

export function coinsReducer(
  state: MainPageState,
  action: CoinAction
): MainPageState {
  const { currentCoin, userCoinsList, coinsStaticData, coinId } =
    action.payload;

  switch (action.type) {
    case ActionType.LOADING_STATIC_DATA: {
      return {
        ...state,
        loadingStatus: {
          isLoading: true,
          loadingMessage: 'Getting crypto static data...',
        },
      };
    }

    case ActionType.LOADING_END: {
      return {
        ...state,
        loadingStatus: { isLoading: false, loadingMessage: '' },
      };
    }

    case ActionType.LOADING_PRICE: {
      return {
        ...state,
        loadingStatus: { isLoading: true, loadingMessage: 'Loading price...' },
      };
    }

    case ActionType.LOADING_END_NO_DATA: {
      return {
        ...state,
        loadingStatus: {
          isLoading: false,
          loadingMessage: '',
          resultMessage: 'No such coin 💁‍♂️. Or use a symbol, please ',
        },
        currentCoin: null,
      };
    }

    case ActionType.INIT_STATIC_DATA: {
      if (coinsStaticData && userCoinsList) {
        return {
          ...state,
          coinsStaticData: coinsStaticData,
          userCoinsList: userCoinsList,
        };
      }
    }

    case ActionType.SET_CURRENT_SEARCH_RESULT: {
      return {
        ...state,
        currentSearchResult: action.payload.currentSearchResult,
      };
    }

    case ActionType.SET_CURRENT_COIN: {
      if (currentCoin) {
        return { ...state, currentCoin: currentCoin };
      }
    }

    case ActionType.ADD_COIN_TO_USER_LIST: {
      if (coinId) {
        return addCoinIfNotExists(state, coinId);
      }
    }

    case ActionType.REMOVE_COIN_FROM_USER_LIST: {
      if (userCoinsList) {
        return {
          ...state,
          userCoinsList: userCoinsList,
        };
      }
    }

    case ActionType.REFRESH_RATES:
      {
        if (userCoinsList) {
          return {
            ...state,
            userCoinsList: userCoinsList,
          };
        }
      }

      throw Error('Unknown action: ' + action.type + ' or payload');
  }
}

const addCoinIfNotExists = (prevState: MainPageState, id: string) => {
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
