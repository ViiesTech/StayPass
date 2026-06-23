/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect} from 'react';
import {Platform, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Toast from 'react-native-toast-message';
import {Colors} from './src/assets/colors';
import {responsiveHeight} from './src/responsive_dimensions';
import Routes from './src/routes/Routes';
import {persistor, store} from './src/redux/store';
// import {StripeProvider} from '@stripe/stripe-react-native';

export default function MobileApp() {
  useEffect(() => {
    SystemNavigationBar.stickyImmersive();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <StripeProvider
          publishableKey={PUBLISHABLE_KEY}
          merchantIdentifier="merchant.com.myapp.payment" // iOS only
          urlScheme="com.myapp" // required for 3D Secure redirects
        > */}
        <SafeAreaView
          style={{
            flexGrow: 1,
            backgroundColor: Colors.white,
            paddingTop: Platform.OS === 'ios' ? responsiveHeight(4) : 0,
          }}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
          <Toast position="top" />
        </SafeAreaView>
        {/* </StripeProvider> */}
      </PersistGate>
    </Provider>
  );
}
