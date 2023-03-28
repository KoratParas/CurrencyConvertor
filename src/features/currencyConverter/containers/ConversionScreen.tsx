import React, {FC, useEffect, useState} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {getLatestCurrencyConversionRates} from '../../../services/api';
import {
  BASE_CURRENCY,
  CurrencyRates,
  STORAGE_KEY,
  TARGET_CURRENCIES,
} from '../../../utils/constants';
import {
  getStoredCurrencyConversionRates,
  storeCurrencyConversionRates,
} from '../../../utils/helpers';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const ConversionScreen: FC<Props> = ({style}) => {
  const [currencyRates, setCurrencyRates] = useState<CurrencyRates>({});

  useEffect(() => {
    const fetchCurrencyConversionRates = async () => {
      try {
        const storedCurrencyConversionRates =
          await getStoredCurrencyConversionRates(STORAGE_KEY);
        if (storedCurrencyConversionRates) {
          setCurrencyRates(storedCurrencyConversionRates);
        } else {
          getLatestCurrencyConversionRates(
            BASE_CURRENCY,
            TARGET_CURRENCIES,
          ).then(currenciesRatesData => {
            setCurrencyRates(currenciesRatesData);
            storeCurrencyConversionRates(
              STORAGE_KEY,
              JSON.stringify(currenciesRatesData),
            );
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrencyConversionRates();
  }, []);

  return (
    <View style={[styles.container, style]}>
      {TARGET_CURRENCIES.map(currency => {
        const rate = currencyRates[currency];
        return (
          <View key={currency}>
            <Text>{currency}</Text>
            <Text>{rate ? rate.toFixed(2) : 0}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ConversionScreen;
