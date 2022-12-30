import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../../types/models';

interface ArticlesState {
  isLoading: boolean;
  error: string;
  aticles: Article[];
}

const initialState: ArticlesState = {
  isLoading: false,
  error: '',
  aticles: [],
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true;
    },
    getArticles(state, action: PayloadAction<Article[]>) {
      state.isLoading = false;
      state.aticles = action.payload;
    },
    addArticle(state, action: PayloadAction<Article>) {
      state.isLoading = false;
      state.aticles = [...state.aticles, action.payload];
    },
    deleteArticle(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.aticles = state.aticles.filter(
        aticle => aticle.id !== action.payload,
      );
    },
    hasError: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export default articlesSlice.reducer;
