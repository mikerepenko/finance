import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Income } from '../../types/models';

interface IncomesState {
  isLoading: boolean;
  error: string;
  incomes: Income[];
}

const initialState: IncomesState = {
  isLoading: false,
  error: '',
  incomes: [],
};

export const incomesSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true;
    },
    getIncomes(state, action: PayloadAction<Income[]>) {
      state.isLoading = false;
      state.incomes = action.payload;
    },
    addIncome(state, action: PayloadAction<Income>) {
      state.isLoading = false;
      state.incomes = [...state.incomes, action.payload];
    },
    deleteIncome(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.incomes = state.incomes.filter(
        income => income.id !== action.payload,
      );
    },
    hasError: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export default incomesSlice.reducer;
