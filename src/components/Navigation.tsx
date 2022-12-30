import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen/MainScreen';
import PaymentScreen from '../screens/PaymentScreen/PaymentScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import { useEffect, useState } from 'react';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import ReportScreen from '../screens/ReportScreen/ReportScreen';
import { GREEN } from '~/services/colors';
import AddScreen from '~/screens/AddScreen/AddScreen';
import EditScreen from '~/screens/EditScreen/EditScreen';
import ArticlesScreen from '~/screens/ArticlesScreen/ArticlesScreen';
import { useTypedDispatch, useTypedSelector } from '~/hooks/redux';
import { CreateUser, GetUser } from '~/store/actions/userActions';
import * as api from '~/services/api';
import { GetExpenses } from '~/store/actions/expensesActions';
import { GetIncomes } from '~/store/actions/incomesActions';
import { GetMoneybox } from '~/store/actions/moneyboxActions';
//import Purchases from 'react-native-purchases';

export type NavigationProps = any;
export type RouteProps = any;

function Navigation() {
  const [isPayment, setIsPayment] = useState(false);
  const Stack = createNativeStackNavigator();

  const { user } = useTypedSelector(state => state.user);
  const dispatch = useTypedDispatch();

  const [userInStorage, setUserInStorage] = useState(false);

  const checkIsUser = async () => {
    const userInStorage = await api.getStorage('user');

    if (!userInStorage) {
      dispatch(CreateUser());
    }
  };

  useEffect(() => {
    checkIsUser();

    setTimeout(() => {
      dispatch(GetUser());
      dispatch(GetExpenses());
      dispatch(GetIncomes());
      dispatch(GetMoneybox());
    }, 2000);
  }, []);

  // useEffect(() => {
  //   const checkPurchases = async () => {
  //     const purchasesInfo = await Purchases.getPurchaserInfo()

  //     if (typeof purchasesInfo.entitlements.active['pro'] !== 'undefined') {
  //       setIsPayment(true)
  //     }
  //   }

  //   checkPurchases();
  // }, [])

  if (!user) {
    return null;
  }

  return (
    <NavigationContainer>
      {isPayment ? (
        <Stack.Navigator initialRouteName="MainScreen">
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false, title: '' }}
          />
          <Stack.Screen
            name="HistoryScreen"
            component={HistoryScreen}
          />
          <Stack.Screen name="AddScreen" component={AddScreen} />
          <Stack.Screen name="EditScreen" component={EditScreen} />
          <Stack.Screen
            name="ArticlesScreen"
            component={ArticlesScreen}
          />
          <Stack.Screen
            name="ReportScreen"
            component={ReportScreen}
            options={{
              title: 'Отчет',
              headerStyle: {
                backgroundColor: GREEN,
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{
              title: 'Настройки',
              headerStyle: {
                backgroundColor: GREEN,
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="PaymentScreen"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default Navigation;
