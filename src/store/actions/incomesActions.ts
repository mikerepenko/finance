import { incomesSlice } from '../slices/incomesSlice';
import { AppDispatch } from '..';
import { Income } from '~/types/models';
import * as api from '~/services/api';

export const AddIncome = (income: Income) => {
  return async (dispatch: AppDispatch) => {
    dispatch(incomesSlice.actions.startLoading());

    try {
      const incomes: Income[] = await api.getStorage('incomes');
      api.updateStorage('incomes', [...incomes, income]);
      dispatch(incomesSlice.actions.addIncome(income));
    } catch (e) {
      dispatch(incomesSlice.actions.hasError(e as Error));
    }
  };
};

export const DeleteIncome = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(incomesSlice.actions.startLoading());

    try {
      const incomes: Income[] = await api.getStorage('incomes');
      api.updateStorage(
        'incomes',
        incomes.filter(income => income.id !== id),
      );
      dispatch(incomesSlice.actions.deleteIncome(id));
    } catch (e) {
      dispatch(incomesSlice.actions.hasError(e as Error));
    }
  };
};

export const GetIncomes = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(incomesSlice.actions.startLoading());

    try {
      const incomes: Income[] = await api.getStorage('incomes');
      dispatch(incomesSlice.actions.getIncomes(incomes));
    } catch (e) {
      dispatch(incomesSlice.actions.hasError(e as Error));
    }
  };
};
