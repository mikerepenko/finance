import { userSlice } from '../slices/userSlice';
import { AppDispatch } from '..';
import * as api from '~/services/api';
import { Currencies, Languages } from '~/services/constants';
import { ARTICLES } from '~/services/articles';
import { User } from '~/types/models';

export const SetLanguage = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startLoading());

    try {
    } catch (e) {
      dispatch(userSlice.actions.hasError(e as Error));
    }
  };
};

export const SetCurrency = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startLoading());

    try {
    } catch (e) {
      dispatch(userSlice.actions.hasError(e as Error));
    }
  };
};

export const GetUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startLoading());

    try {
      const user: User = await api.getStorage('user');
      console.log(user);
      dispatch(userSlice.actions.getUser(user));
    } catch (e) {
      dispatch(userSlice.actions.hasError(e as Error));
    }
  };
};

export const CreateUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startLoading());

    try {
      api.setStorage('user', {
        lang: Languages.RUS,
        currency: Currencies.RUB,
        isFirstStart: true,
        isPayment: true,
      });

      api.setStorage('expenses', []);
      api.setStorage('incomes', []);
      api.setStorage('moneybox', []);

      api.setStorage('articles', ARTICLES);
    } catch (e) {
      dispatch(userSlice.actions.hasError(e as Error));
    }
  };
};
