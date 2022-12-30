import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
//import Purchases from 'react-native-purchases';
import { BLACK, GREEN, WHITE } from '../../services/colors';
import CarouselCards from './components/CarouselCards';

function PaymentScreen(): JSX.Element {
  const [packages, setPackages] = useState();

  useEffect(() => {
    // const getPackages = async () => {
    //   try {
    //     const offerings = await Purchases.getOfferings();
    //     console.log(offerings);
    //     if (offerings.current !== null) {
    //       setPackages(offerings.current.availablePackages);
    //     }
    //   } catch (e) {
    //     console.error(e);
    //   }
    // };
    // getPackages();
  }, []);

  const onSubsribe = async () => {
    // const { purchasesInfo } = await Purchases.purchasePackage(
    //   packages[0],
    // );
    // if (typeof purchasesInfo.entitlements.active['pro']) {
    //   console.log('User is pro');
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CarouselCards />
      <TouchableOpacity onPress={() => onSubsribe()}>
        <View style={styles.connectButton}>
          <Text style={styles.connectText}>Оформить подписку</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.restoreButton}>
          <Text style={styles.restoreText}>
            Восстановить подписку
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectButton: {
    backgroundColor: GREEN,
    paddingRight: 90,
    paddingLeft: 90,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 10,
  },
  connectText: {
    color: WHITE,
    fontFamily: 'open-bold',
  },
  restoreButton: {
    paddingRight: 60,
    paddingLeft: 60,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 10,
  },
  restoreText: {
    color: BLACK,
    fontFamily: 'open-bold',
  },
});
