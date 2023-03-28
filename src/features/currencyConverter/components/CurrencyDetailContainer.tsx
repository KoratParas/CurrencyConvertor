import React, {FC} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {
  DOLLAR_CURRENCIES_SYMBOL,
  POUND_CURRENCIES_SYMBOL,
} from '../../../utils/constants';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  currencyName: string;
  conversionRate: number;
  convertedAmount: number;
}

const CurrencyDetailContainer: FC<Props> = ({
  containerStyle,
  currencyName,
  conversionRate,
  convertedAmount,
}) => {
  const currencySymbol =
    currencyName === 'GBP' ? POUND_CURRENCIES_SYMBOL : DOLLAR_CURRENCIES_SYMBOL;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text>{currencyName}</Text>
      {convertedAmount && (
        <View>
          <Text style={styles.convertedAmountLabel}>
            {currencySymbol} {convertedAmount}
          </Text>
          <Text style={styles.conversionRateLabel}>
            1 AUD = {conversionRate} {currencyName}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  convertedAmountLabel: {
    textAlign: 'right',
    fontSize: 16,
    marginBottom: 2,
    fontWeight: '500',
  },
  conversionRateLabel: {
    textAlign: 'right',
    color: '#A9A9A9',
    fontSize: 14,
  },
});

export default CurrencyDetailContainer;
