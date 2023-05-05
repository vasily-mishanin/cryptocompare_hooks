export const domainUrl = `https://www.cryptocompare.com`;
const baseURL = `https://min-api.cryptocompare.com/data`;

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getSingleSymbolPrice({
  symbol,
  currency = 'USD',
}: {
  symbol: string;
  currency?: string;
}) {
  const URI = `${baseURL}/price?fsym=${symbol}&tsyms=${currency}&api_key=${API_KEY}&gt`;

  try {
    const response = await fetch(URI);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    if (data.Response === 'Error') {
      console.log('ERROR: ', data);
      return null;
    }

    return data; // ETH -> {USD: 285600}
  } catch (err) {
    console.log(err);
  }
}

export async function getMultipleSymbolsPrices({
  symbols,
  currency = 'USD',
}: {
  symbols: string[];
  currency?: string;
}) {
  const cryptoSymbols = symbols.join(',');
  const URI = `${baseURL}/pricemulti?fsyms=${cryptoSymbols}&tsyms=${currency}&api_key=${API_KEY}&gt`;

  try {
    const response = await fetch(URI);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    if (data.Response === 'Error') {
      console.log('ERROR: ', data);
      return;
    }

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getCoinsData() {
  const URI = `${baseURL}/all/coinlist`;

  try {
    const response = await fetch(URI);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    if (data.Response === 'Error') {
      console.log('ERROR: ', data);
      return;
    }
    const coinsData = getCoinsMainInfo(data);
    return coinsData;
  } catch (err) {
    console.log(err);
  }
}

//helpers
function getCoinsMainInfo({
  Data,
}: {
  Data: {
    [symbol: string]: { Id: string; CoinName: string; ImageUrl: string };
  };
}) {
  const coinsInfo = [];

  for (let symbol in Data) {
    const coin = {
      id: Data[symbol].Id,
      symbol: symbol,
      name: Data[symbol].CoinName,
      imagePath: Data[symbol].ImageUrl,
    };
    coinsInfo.push(coin);
  }

  return coinsInfo;
}
