import Config from 'react-native-config';

export const getLatestCurrencyConversionRates = async (
  baseCurrencyName: string,
  targetCurrenciesSymbols: string[],
) => {
  const convertedTargetCurrenciesSymbols = targetCurrenciesSymbols.join(',');
  const API_URL = `${Config.BASE_URL}?app_id=${Config.APP_ID}&base=${baseCurrencyName}&symbols=${convertedTargetCurrenciesSymbols}`;
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      return data.rates;
    }
  } catch (error) {
    console.error(error);
  }
};
