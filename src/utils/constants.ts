export const STORAGE_KEY = 'currency_conversion_rates';
export const BASE_CURRENCY = 'AUD';
export const TARGET_CURRENCIES = ['INR', 'CAD', 'USD', 'GBP', 'ANZ '];

export interface CurrencyRates {
  [currency: string]: number;
}
