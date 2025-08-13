/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UrlInput from './src/component/urlInput.tsx';
import { useState } from 'react';
import UrlContainerList from './src/component/urlContainerList.tsx';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [urls, setUrls] = useState<string[]>([]);
  const addUrl = (url: string) => {
    const data = url.split('\n');
    setUrls(pre => [...data, ...pre]);
  };
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <UrlInput onSubmit={addUrl} clearOnSubmit={false} />
        <UrlContainerList urls={urls} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
