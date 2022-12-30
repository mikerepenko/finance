import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Moneybox } from '../../types/models';

interface IncomesState {
  isLoading: boolean;
  error: string;
  moneybox: Moneybox[];
}

const initialState: IncomesState = {
  isLoading: false,
  error: '',
  moneybox: [],
};

export const moneyboxSlice = createSlice({
  name: 'moneybox',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true;
    },
    getMoneybox(state, action: PayloadAction<Moneybox[]>) {
      state.isLoading = false;
      state.moneybox = action.payload;
    },
    addMoneybox(state, action: PayloadAction<Moneybox>) {
      state.isLoading = false;
      state.moneybox = [...state.moneybox, action.payload];
    },
    deleteMoneybox(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.moneybox = state.moneybox.filter(
        m => m.id !== action.payload,
      );
    },
    hasError: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export default moneyboxSlice.reducer;
