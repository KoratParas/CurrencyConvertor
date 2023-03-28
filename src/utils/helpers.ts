import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 *
 * @param key
 * @param conversionRates
 *
 * Store conversion rates in AsyncStorage
 */
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

/**
 *
 * @param key
 * @returns Object of stored currency conversion rates
 *
 * Get stored currency conversion rates from AsyncStorage
 */
export const getStoredCurrencyConversionRates = async (key: string) => {
  try {
    const storedConversionRates = await AsyncStorage.getItem(key);
    if (storedConversionRates !== null) {
      return JSON.parse(storedConversionRates);
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param num
 * @returns string with commas
 *
 * Generates a string with comma separated numbers
 */
export const numberWithCommas = (num: string) => {
  return num?.toString?.().replace?.(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '';
};

/**
 *
 * @param num
 * @returns string without commas
 *
 * Cleans a comms from the comma separated string
 */
export const cleanCommas = (num: string) => {
  return String(num).replace(/[^0-9.]/g, '');
};

/**
 *
 * @param num
 * @returns boolean value
 *
 * To check if a number is valid
 */
export const checkIncorrectInput = (num: string) => {
  const regex = /\./g;
  const matches = num.match(regex);
  return matches && matches.length > 1;
};
