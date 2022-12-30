import { combineReducers, configureStore } from '@reduxjs/toolkit';
import expensesReducer from './slices/expensesSlice';
import incomesReducer from './slices/incomesSlice';
import moneyboxReducer from './slices/moneyboxSlice';
import articlesReducer from './slices/articlesSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  expenses: expensesReducer,
  incomes: incomesReducer,
  moneybox: moneyboxReducer,
  articles: articlesReducer,
  user: userReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
