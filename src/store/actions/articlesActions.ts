import { articlesSlice } from '../slices/articlesSlice';
import { AppDispatch } from '..';
import { Article } from '~/types/models';
import * as api from '~/services/api';

export const AddArticle = (article: Article) => {
  return async (dispatch: AppDispatch) => {
    dispatch(articlesSlice.actions.startLoading());

    try {
      const articles: Article[] = await api.getStorage('articles');
      api.updateStorage('articles', [...articles, article]);
      dispatch(articlesSlice.actions.addArticle(article));
    } catch (e) {
      dispatch(articlesSlice.actions.hasError(e as Error));
    }
  };
};

export const DeleteArticle = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(articlesSlice.actions.startLoading());

    try {
      const articles: Article[] = await api.getStorage('articles');
      api.updateStorage(
        'articles',
        articles.filter(article => article.id !== id),
      );
      dispatch(articlesSlice.actions.deleteArticle(id));
    } catch (e) {
      dispatch(articlesSlice.actions.hasError(e as Error));
    }
  };
};

export const GetArticles = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(articlesSlice.actions.startLoading());

    try {
      const articles: Article[] = await api.getStorage('articles');
      dispatch(articlesSlice.actions.getArticles(articles));
    } catch (e) {
      dispatch(articlesSlice.actions.hasError(e as Error));
    }
  };
};
