import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeCurrencyConversionRates = async (
  key: string,
  conversionRates: string,
) => {
  try {
    await AsyncStorage.setItem(key, conversionRates);
  } catch (error) {
    console.error(error);
  }
};

export const getStoredCurrencyConversionRates = async (key: string) => {
  try {
    const storedConversionRates = await AsyncStorage.getItem(key);
    if (storedConversionRates !== null) {
      return JSON.parse(storedConversionRates);
    } else {
      console.log('storedConversionRates is null');
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};
