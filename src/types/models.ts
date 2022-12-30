import moment from 'moment';
import {
  ArticleTypes,
  Currencies,
  Languages,
} from '~/services/constants';

export interface IPost {
  id: string;
  text: string;
}

export type Expense = {
  id: string;
  date: string;
  color: string;
  icon: string;
  sum: number;
  articleType: string;
  title: string;
};

export type Income = {
  id: string;
  date: string;
  color: string;
  icon: string;
  sum: number;
  articleType: string;
  title: string;
};

export type Moneybox = {
  id: string;
  date: string;
  color: string;
  icon: string;
  sum: number;
  articleType: string;
  title: string;
};

export type Article = {
  id: string;
  title: string;
  nameIcon: string;
  color: string;
  articleType: string;
};

export type User = {
  lang: Languages;
  currency: Currencies;
  isPayment: boolean;
};

export type RangeDate = {
  from: moment.Moment;
  to: moment.Moment;
};

export type Date = {
  day: moment.Moment;
  month: moment.Moment;
  year: moment.Moment;
};
