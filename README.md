#CurrencyConverter

This is a React Native application thay allows users to convert currencies from **Australian Dollar (AUD)** to other 5 predefined currencies **['INR', 'CAD', 'USD', 'GBP', 'NZD']** using the conversion rates obtained from the [Open Exchange Rates](https://docs.openexchangerates.org/).

##Installation

### To install and run the application, follow the steps below:

1. Clone this repository using git clone https://gitlab.com/ParasK/currencyconvertor.git.
2. Install dependencies by running `npm install` or `yarn install` in the root directory of project.
3. Run `cd ios && pod install` to install the iOS dependencies
4. Create a `.env` file in the project directory and add BASE_URL and APP_ID as follows: `BASE_URL = https://openexchangerates.org/api/latest.json` and `APP_ID = 3674d6e9bf364222a08ed97750d2db3a`.
5. Run npm start or yarn start to start the Metro bundler.
6. Run npm run ios or yarn ios to launch the app on an iOS simulator/device.
7. Run npm run android or yarn android to launch the app on an Android emulator/device.

##Usage

Once the application has been started, you will be able to enter an amount on the base currency(AUD) and click on the calculate icon. The app will then display the converted amount using the stored or latest conversion rates obtained from the API or Async storage.

##Dependecies

- `@react-native-async-storage/async-storage`
- `react-native-config`
