import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Languages, Currencies } from '~/services/constants';
import { User } from '~/types/models';

interface UserState {
  isLoading: boolean;
  error: string;
  user: User | undefined;
}

const initialState: UserState = {
  isLoading: false,
  error: '',
  user: undefined,
};

export const userSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true;
    },
    setLanguage(state, action: PayloadAction<Languages>) {
      state.isLoading = false;
      if (state.user) {
        state.user.lang = action.payload;
      }
    },
    setCurrency(state, action: PayloadAction<Currencies>) {
      state.isLoading = false;
      if (state.user) {
        state.user.currency = action.payload;
      }
    },
    setIsPayment(state, action: PayloadAction<boolean>) {
      state.isLoading = false;
      if (state.user) {
        state.user.isPayment = action.payload;
      }
    },
    getUser(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.user = action.payload;
    },
    hasError: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export default userSlice.reducer;
