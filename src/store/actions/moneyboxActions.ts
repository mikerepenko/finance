import { moneyboxSlice } from '../slices/moneyboxSlice';
import { AppDispatch } from '..';
import { Moneybox } from '~/types/models';
import * as api from '~/services/api';

export const AddMoneybox = (m: Moneybox) => {
  return async (dispatch: AppDispatch) => {
    dispatch(moneyboxSlice.actions.startLoading());

    try {
      const moneybox: Moneybox[] = await api.getStorage('moneybox');
      api.updateStorage('moneybox', [...moneybox, m]);
      dispatch(moneyboxSlice.actions.addMoneybox(m));
    } catch (e) {
      dispatch(moneyboxSlice.actions.hasError(e as Error));
    }
  };
};

export const DeleteMoneybox = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(moneyboxSlice.actions.startLoading());

    try {
      const moneybox: Moneybox[] = await api.getStorage('moneybox');
      api.updateStorage(
        'moneybox',
        moneybox.filter(m => m.id !== id),
      );
      dispatch(moneyboxSlice.actions.deleteMoneybox(id));
    } catch (e) {
      dispatch(moneyboxSlice.actions.hasError(e as Error));
    }
  };
};

export const GetMoneybox = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(moneyboxSlice.actions.startLoading());

    try {
      const moneybox: Moneybox[] = await api.getStorage('moneybox');
      dispatch(moneyboxSlice.actions.getMoneybox(moneybox));
    } catch (e) {
      dispatch(moneyboxSlice.actions.hasError(e as Error));
    }
  };
};
