export const STORAGE_KEY = 'currency_conversion_rates';
export const BASE_CURRENCY = 'AUD';
export const TARGET_CURRENCIES = ['INR', 'CAD', 'USD', 'GBP', 'NZD'];
export const DOLLAR_CURRENCIES_SYMBOL = '$';
export const POUND_CURRENCIES_SYMBOL = '£';

export interface CurrencyRates {
  [currency: string]: number;
}
