/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {Header} from '../../components/Header';
import Wrapper from '../../components/Wrapper';
import {responsiveHeight} from '../../responsive_dimensions';

const PrivacyPolicy = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Wrapper containerStyle={styles.container}>
      <Header title="Privacy Policy" />
      <WebView
      showsVerticalScrollIndicator={false}
        source={{uri: 'https://stay-pass.vercel.app/privacy-and-policy'}}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveHeight(2),
  },
  webview: {
    flex: 1,
    marginTop: responsiveHeight(2),
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrivacyPolicy;
