import moment from 'moment';
import { Periods } from '~/services/constants';
import {
  Date,
  Expense,
  Income,
  Moneybox,
  RangeDate,
} from '~/types/models';

export const formatRangeDate = (
  togglePeriod: Periods,
  rangeDate: RangeDate,
  event: string,
) => {
  if (togglePeriod === Periods.Week) {
    if (event === 'back') {
      return {
        from: rangeDate.from.add(-7, 'd'),
        to: rangeDate.to.add(-7, 'd'),
      };
    }

    if (event === 'next') {
      return {
        from: rangeDate.from.add(+7, 'd'),
        to: rangeDate.to.add(+7, 'd'),
      };
    }
  }

  return rangeDate;
};

export const formatDate = (
  togglePeriod: Periods,
  date: Date,
  event: string,
) => {
  if (togglePeriod === Periods.Day) {
    if (event === 'back') {
      return {
        ...date,
        day: date.day.add(-1, 'd'),
      };
    }

    if (event === 'next') {
      return {
        ...date,
        day: date.day.add(1, 'd'),
      };
    }
  }

  if (togglePeriod === Periods.Month) {
    if (event === 'back') {
      return {
        ...date,
        month: date.month.add(-1, 'M'),
      };
    }

    if (event === 'next') {
      console.log(0);
      return {
        ...date,
        month: date.month.add(1, 'M'),
      };
    }
  }

  if (togglePeriod === Periods.Year) {
    if (event === 'back') {
      return {
        ...date,
        year: date.year.add(-1, 'y'),
      };
    }

    if (event === 'next') {
      console.log(0);
      return {
        ...date,
        year: date.year.add(1, 'y'),
      };
    }
  }

  return date;
};

export const filteredTransactionsByPeriod = <
  T extends { date: string },
>(
  period: Periods,
  transactions: T[],
  rangeDate: RangeDate,
  date: Date,
): T[] => {
  if (period === Periods.Week) {
    return transactions.filter(transaction =>
      moment(transaction.date).isBetween(
        moment(rangeDate.from),
        moment(rangeDate.to),
        'days',
        '[]',
      ),
    );
  }

  if (period === Periods.Day) {
    return transactions.filter(
      transaction =>
        moment(transaction.date).format('MM/DD/YYYY') ===
        moment(date.day).format('MM/DD/YYYY'),
    );
  }

  if (period === Periods.Month) {
    return transactions.filter(
      transaction =>
        moment(transaction.date).format('MM') ===
        moment(date.month).format('MM'),
    );
  }

  if (period === Periods.Year) {
    return transactions.filter(
      transaction =>
        moment(transaction.date).format('YYYY') ===
        moment(date.year).format('YYYY'),
    );
  }

  return [];
};

export const calculateTotal = <T extends { sum: number }>(
  transactions: T[],
): number => {
  return transactions.reduce(
    (accumulator: number, transaction: T) => {
      return accumulator + Number(transaction.sum);
    },
    0,
  );
};

export const calculateMoneybox = (transactions: any): any => {
  return transactions.reduce(
    (accumulator: number, transaction: any) =>
      (transaction.title === 'Пополнение' &&
        accumulator + Number(transaction.sum)) ||
      (transaction.title === 'Снятие' &&
        accumulator - Number(transaction.sum)),
    0,
  );
};
