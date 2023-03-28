import React, {Dispatch, FC, SetStateAction} from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {DOLLAR_CURRENCIES_SYMBOL} from '../../../utils/constants';
import {cleanCommas, numberWithCommas} from '../../../utils/helpers';
import CalculatorIcon from '../../../assets/images/icon-calculator.png';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  onConvertPress: () => void;
  hasError: boolean;
  setHasError: Dispatch<SetStateAction<boolean>>;
}

const CurrencyInputBox: FC<Props> = ({
  containerStyle,
  amount,
  setAmount,
  onConvertPress,
  hasError,
  setHasError,
}) => {
  const onFocusAmount = () => {
    if (amount?.length === 0) {
      setAmount(DOLLAR_CURRENCIES_SYMBOL);
    }
  };

  const onBlurAmount = () => {
    if (amount?.length === 0 || amount === DOLLAR_CURRENCIES_SYMBOL) {
      setAmount('');
    }
  };

  const _onChangeText = (text: string) => {
    setHasError(false);
    let textCleaned = cleanCommas(text);
    let textFormatted = `${
      DOLLAR_CURRENCIES_SYMBOL + numberWithCommas(textCleaned ?? '')
    }`;

    setAmount(textFormatted);
  };
  return (
    <View style={styles.container}>
      <View style={[containerStyle, hasError && styles.error]}>
        <View style={styles.labelContainer}>
          <Text>AUD</Text>
        </View>
        <TextInput
          value={amount}
          onChangeText={_onChangeText}
          placeholder="Enter amount in AUD"
          keyboardType="numeric"
          style={styles.textInput}
          onFocus={onFocusAmount}
          onBlur={onBlurAmount}
        />
        <Pressable
          onPress={onConvertPress}
          style={styles.convertButtonContainer}>
          <Image source={CalculatorIcon} style={styles.calculatorIcon} />
        </Pressable>
      </View>
      {hasError && (
        <View>
          <Text style={styles.errorText}>Please enter a valid amount</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },
  convertButtonContainer: {
    borderLeftWidth: 1,
    height: 60,
    justifyContent: 'center',
    paddingLeft: 10,
    borderColor: '#D3D3D3',
  },
  labelContainer: {
    height: 60,
    justifyContent: 'center',
    borderColor: '#D3D3D3',
  },
  textInput: {
    textAlign: 'right',
    flex: 1,
    marginRight: 10,
  },
  calculatorIcon: {
    height: 30,
    width: 30,
  },
  error: {
    borderColor: '#f00',
  },
  errorText: {
    color: '#f00',
    marginTop: 10,
  },
});

export default CurrencyInputBox;
