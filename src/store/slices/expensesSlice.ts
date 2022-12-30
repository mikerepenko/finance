import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../../types/models';

interface ExpensesState {
  isLoading: boolean;
  error: string;
  expenses: Expense[];
}

const initialState: ExpensesState = {
  isLoading: false,
  error: '',
  expenses: [],
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true;
    },
    getExpenses(state, action: PayloadAction<Expense[]>) {
      state.isLoading = false;
      state.expenses = action.payload;
    },
    addExpense(state, action: PayloadAction<Expense>) {
      state.isLoading = false;
      state.expenses = [...state.expenses, action.payload];
    },
    deleteExpense(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.expenses = state.expenses.filter(
        expense => expense.id !== action.payload,
      );
    },
    hasError: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export default expensesSlice.reducer;
