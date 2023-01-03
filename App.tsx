import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';

import { fetchFonts } from '~/services/fonts';
import { Platform, Text } from 'react-native';
import Navigation from '~/components/Navigation';
import { setupStore } from '~/store';
//import Purchases from 'react-native-purchases';
import { API_KEY } from '~/services/constants';
import Purchases, { PurchasesOffering } from 'react-native-purchases';

const store = setupStore();

const APIKeys = {
  apple: 'sk_UEMVazZDHedhrGcZSBzamXliQzAQN',
  google: 'sk_UEMVazZDHedhrGcZSBzamXliQzAQN',
};

export default function App() {
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);
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

  useEffect(() => {
    const fetchData = async () => {
      const offerings = await Purchases.getOfferings();
      setCurrentOffering(offerings.current);
    };

    Purchases.setDebugLogsEnabled(true);
    if (Platform.OS == 'android') {
      await Purchases.configure({ apiKey: APIKeys.google });
    } else {
      await Purchases.configure({ apiKey: APIKeys.apple });
    }

    fetchData().catch(console.log);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      {currentOffering && (
        <Text>
          Package Count: {currentOffering.availablePackages.length}
        </Text>
      )}
      <Navigation />
    </Provider>
  );
}
