import { expensesSlice } from '../slices/expensesSlice';
import { AppDispatch } from '..';
import { Expense } from '~/types/models';
import * as api from '~/services/api';

export const AddExpense = (expense: Expense) => {
  return async (dispatch: AppDispatch) => {
    dispatch(expensesSlice.actions.startLoading());

    try {
      const expenses: Expense[] = await api.getStorage('expenses');
      api.updateStorage('expenses', [...expenses, expense]);
      dispatch(expensesSlice.actions.addExpense(expense));
    } catch (e) {
      dispatch(expensesSlice.actions.hasError(e as Error));
    }
  };
};

export const DeleteExpense = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(expensesSlice.actions.startLoading());

    try {
      const expenses: Expense[] = await api.getStorage('expenses');
      api.updateStorage(
        'expenses',
        expenses.filter(expense => expense.id !== id),
      );
      dispatch(expensesSlice.actions.deleteExpense(id));
    } catch (e) {
      dispatch(expensesSlice.actions.hasError(e as Error));
    }
  };
};

export const GetExpenses = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(expensesSlice.actions.startLoading());

    try {
      const expenses: Expense[] = await api.getStorage('expenses');
      dispatch(expensesSlice.actions.getExpenses(expenses));
    } catch (e) {
      dispatch(expensesSlice.actions.hasError(e as Error));
    }
  };
};
