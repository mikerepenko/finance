import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';

import { fetchFonts } from '~/services/fonts';
import Navigation from '~/components/Navigation';
import { setupStore } from '~/store';
//import Purchases from 'react-native-purchases';
import { API_KEY } from '~/services/constants';

const store = setupStore();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await fetchFonts();
      setIsReady(true);
    }

    prepare();
  }, []);

  useEffect(() => {
    // Purchases.setDebugLogsEnabled(true)
    // Purchases.setPushToken(API_KEY)
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
