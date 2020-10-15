// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NotoSansTC_400Regular, NotoSansTC_700Bold, NotoSansTC_900Black } from '@expo-google-fonts/noto-sans-tc'

import CharityEventsMap from './src/pages/CharityEventsMap'
import { useFonts } from 'expo-font';
import Routes from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    NotoSansTC_400Regular,
    NotoSansTC_700Bold,
    NotoSansTC_900Black
  })

  if (!fontsLoaded) return null

  return (
    <View style={styles.container}>
      <Routes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
