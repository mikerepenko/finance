import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { formatDate, formatRangeDate } from '~/services/utils';
import Period from '~/components/Period';
import { GREEN, RED, WHITE, YELLOW } from '~/services/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Date, RangeDate } from '~/types/models';
import { ArticleTypes, Periods } from '~/services/constants';
import { NavigationProps } from '~/components/Navigation';
import { SHADOW } from '~/services/styles';

type CalendarProps = {
  date: Date;
  setDate: React.Dispatch<Date>;
  rangeDate: RangeDate;
  setRangeDate: React.Dispatch<RangeDate>;
  period: Periods;
  setPeriod: React.Dispatch<Periods>;
  articleType: ArticleTypes;
  total: number;
};

function Range({
  date,
  setDate,
  rangeDate,
  setRangeDate,
  period,
  setPeriod,
  articleType,
  total,
}: CalendarProps) {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    if (period === Periods.Week) {
      setRangeDate({
        from: moment().startOf('isoWeek'),
        to: moment().endOf('isoWeek'),
      });
    }

    if (period === Periods.Other) {
      setRangeDate({
        from: moment(),
        to: moment(),
      });
    }

    setDate({
      day: moment(),
      month: moment(),
      year: moment(),
    });
  }, [period]);

  const handleChangeDate = (event: string) => {
    setRangeDate(formatRangeDate(period, rangeDate, event));
    setDate(formatDate(period, date, event));
  };

  return (
    <View style={styles.container}>
      <Period
        period={period}
        setPeriod={setPeriod}
        handleChangeDate={handleChangeDate}
        date={date}
        rangeDate={rangeDate}
        setRangeDate={setRangeDate}
      />

      <View style={styles.circleContainer}>
        <Text style={styles.circleText}>{total}₽</Text>

        {articleType !== ArticleTypes.Moneybox && (
          <View style={styles.plusContainer}>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={() =>
                navigation.navigate('ArticlesScreen', {
                  articleType: articleType,
                })
              }>
              <Icon name="plus" color={WHITE} size={15} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

export default Range;

const styles: any = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  circleText: {
    fontSize: 20,
    marginTop: 10,
  },
  plusContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
  },
  plusButton: {
    backgroundColor: YELLOW,
    padding: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
});
