import React, {FC, useEffect, useState} from 'react';
import {ScrollView, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {getLatestCurrencyConversionRates} from '../../../services/api';
import {
  BASE_CURRENCY,
  CurrencyRates,
  STORAGE_KEY,
  TARGET_CURRENCIES,
} from '../../../utils/constants';
import {
  checkIncorrectInput,
  cleanCommas,
  getStoredCurrencyConversionRates,
  storeCurrencyConversionRates,
} from '../../../utils/helpers';
import CurrencyDetailContainer from '../components/CurrencyDetailContainer';
import CurrencyInputBox from '../components/CurrencyInputBox';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const ConversionScreen: FC<Props> = ({style}) => {
  const [currencyRates, setCurrencyRates] = useState<CurrencyRates>({});
  const [conversionAmounts, setConversionAmounts] = useState<CurrencyRates>({});
  const [amount, setAmount] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  /**
   * To fetch the latest currency conversion rates from API and store in cache if cache is empty
   * otherwise fetch from cache
   * */
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

  /**
   * Convert the amount entered by the user to the selected currencies
   * */
  const onConvertCurrencyPress = () => {
    if (
      !cleanCommas(amount) ||
      parseFloat(cleanCommas(amount)) === 0 ||
      checkIncorrectInput(amount)
    ) {
      setConversionAmounts({});
      setHasError(true);
      return;
    }
    const convertedAmounts: CurrencyRates = {};
    TARGET_CURRENCIES.forEach(currency => {
      const rate = currencyRates[currency];
      convertedAmounts[currency] = rate * parseFloat(cleanCommas(amount));
    });
    setConversionAmounts(convertedAmounts);
  };

  return (
    <ScrollView
      style={[styles.container, style]}
      keyboardShouldPersistTaps={'handled'}>
      <CurrencyInputBox
        amount={amount}
        setAmount={setAmount}
        onConvertPress={onConvertCurrencyPress}
        containerStyle={styles.borderBox}
        setHasError={setHasError}
        hasError={hasError}
      />
      {TARGET_CURRENCIES.map(currency => {
        const rate = currencyRates?.[currency] ?? 0;
        const conversionAmount = conversionAmounts[currency] ?? 0;
        return (
          <CurrencyDetailContainer
            currencyName={currency}
            convertedAmount={conversionAmount}
            key={currency}
            conversionRate={rate}
            containerStyle={styles.borderBox}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  borderBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 60,
    borderColor: '#D3D3D3',
  },
});

export default ConversionScreen;
