import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icons from '../constants/svgPath';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
  scale,
} from '../constants/responsive';
import Colors from '../constants/color';
import Fonts from '../constants/fontPath';

interface DatepickerModelProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  initialDate?: Date;
  monthsAhead?: number;
}

interface CalendarDay {
  key: string;
  dateNum: number;
  fullDate: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
  isWeekend: boolean;
}

const { width } = Dimensions.get('window');
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const isSameDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const weekend = (d: Date) => {
  const dow = d.getDay();
  return dow === 0 || dow === 6;
};

// Fixed function to properly align Monday as first day
const getMondayFirstIndex = (jsDow: number) => {
  // JavaScript Date.getDay() returns: 0=Sunday, 1=Monday, 2=Tuesday, etc.
  // We want: 0=Monday, 1=Tuesday, 2=Wednesday, ..., 6=Sunday
  return jsDow === 0 ? 6 : jsDow - 1;
};

const buildMonthGrid = (
  year: number,
  monthIndex: number,
  today: Date,
): CalendarDay[] => {
  const first = new Date(year, monthIndex, 1);
  const last = new Date(year, monthIndex + 1, 0);

  // Get the day of week for the first day of the month
  const firstDayOfWeek = getMondayFirstIndex(first.getDay());
  const daysInMonth = last.getDate();

  const cells: CalendarDay[] = [];

  // Add previous month's trailing days to fill the first week
  const prevMonth = new Date(year, monthIndex - 1, 0);
  const prevMonthDays = prevMonth.getDate();

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    const d = new Date(year, monthIndex - 1, day);
    cells.push({
      key: `prev-${year}-${monthIndex - 1}-${day}`,
      dateNum: day,
      fullDate: d,
      isCurrentMonth: false,
      isToday: false,
      isPast: d.getTime() < today.getTime(),
      isWeekend: weekend(d),
    });
  }

  // Add current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, monthIndex, day);
    cells.push({
      key: `curr-${d.toISOString()}`,
      dateNum: day,
      fullDate: d,
      isCurrentMonth: true,
      isToday: isSameDate(d, today),
      isPast: d.getTime() < today.getTime(),
      isWeekend: weekend(d),
    });
  }

  // Add next month's days to complete the grid
  const totalCells = cells.length;
  const remainingCells = totalCells % 7;
  const cellsNeeded = remainingCells === 0 ? 0 : 7 - remainingCells;

  for (let day = 1; day <= cellsNeeded; day++) {
    const d = new Date(year, monthIndex + 1, day);
    cells.push({
      key: `next-${year}-${monthIndex + 1}-${day}`,
      dateNum: day,
      fullDate: d,
      isCurrentMonth: false,
      isToday: false,
      isPast: d.getTime() < today.getTime(),
      isWeekend: weekend(d),
    });
  }

  return cells;
};

const DatepickerModel: React.FC<DatepickerModelProps> = ({
  visible,
  onClose,
  onDateSelect,
  initialDate = new Date(),
  monthsAhead = 12,
}) => {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [selected, setSelected] = useState<Date>(startOfDay(initialDate));

  const monthsData = useMemo(() => {
    const out: { id: string; title: string; days: CalendarDay[] }[] = [];
    for (let i = 0; i < monthsAhead; i++) {
      const m = new Date(today.getFullYear(), today.getMonth() + i, 1);
      out.push({
        id: `${m.getFullYear()}-${m.getMonth()}`,
        title: `${monthNames[m.getMonth()]} ${m.getFullYear()}`,
        days: buildMonthGrid(m.getFullYear(), m.getMonth(), today),
      });
    }
    return out;
  }, [monthsAhead, today]);

  const onPick = (d: Date, isPast: boolean) => {
    if (isPast) return;
    setSelected(d);
    onDateSelect(d);
  };

  const dayNamesRow = (
    <View style={styles.dayHeaders}>
      {dayNames.map(n => (
        <View key={n} style={styles.dayHeaderCell}>
          <Text
            style={[
              styles.dayHeaderText,
              (n === 'Sat' || n === 'Sun') && styles.weekendText,
            ]}
          >
            {n}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderMonth = ({ item }: { item: (typeof monthsData)[number] }) => (
    <View style={styles.monthWrap}>
      <Text style={styles.monthTitle}>{item.title}</Text>
      <FlatList
        data={item.days}
        keyExtractor={d => d.key}
        numColumns={7}
        scrollEnabled={false}
        renderItem={({ item: d }) => {
          const isSelected = isSameDate(d.fullDate, selected);
          const disabled = d.isPast && d.isCurrentMonth;
          const isPlaceholder = !d.isCurrentMonth;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={disabled}
              onPress={() => onPick(d.fullDate, d.isPast && d.isCurrentMonth)}
              style={[
                styles.dayCell,
                isSelected && styles.dayCellSelected,
                d.isToday && !isSelected && styles.dayCellToday,
                disabled && styles.dayCellDisabled,
                isPlaceholder && styles.placeholderCell,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  d.isWeekend && styles.weekendText,
                  isSelected && styles.selectedText,
                  d.isToday && !isSelected && styles.todayText,
                  disabled && styles.disabledText,
                  isPlaceholder && styles.placeholderText,
                ]}
              >
                {d.dateNum}
              </Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.gridPad}
      />
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Date</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Icons.Cross
                height={moderateScale(30)}
                width={moderateScale(30)}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={monthsData}
            renderItem={renderMonth}
            keyExtractor={m => m.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={dayNamesRow}
            stickyHeaderIndices={[0]}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DatepickerModel;

const GUTTER = 24;
const CELL = (width - GUTTER * 2) / 7;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.black10,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.redbusBackground,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    maxHeight: '80%',
    paddingTop: moderateScale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: GUTTER,
    marginBottom: moderateHeight(1),
  },
  title: {
    fontSize: scale(18),
    color: Colors.redbusTextPrimary,
    fontFamily: Fonts.bold,
  },
  closeBtn: {
    width: moderateWidth(2),
    height: moderateHeight(2),
    borderRadius: moderateScale(16),
    backgroundColor: Colors.redbusBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthWrap: {
    marginBottom: moderateScale(16),
    backgroundColor: Colors.redbusBackground,
  },
  monthTitle: {
    fontSize: scale(16),
    paddingHorizontal: GUTTER,
    fontFamily: Fonts.primary,
    color: Colors.redbusTextPrimary,
    marginVertical: moderateHeight(2),
  },
  dayHeaders: {
    flexDirection: 'row',
    paddingHorizontal: GUTTER,
    marginVertical: moderateScale(4),
    borderBottomColor: Colors.redbusDisabled,
    borderBottomWidth: 1,
    backgroundColor: Colors.redbusBackground,
  },
  dayHeaderCell: {
    width: CELL,
    alignItems: 'center',
  },
  dayHeaderText: {
    fontSize: scale(10),
    marginVertical: moderateHeight(1),
    fontFamily: Fonts.secondary,
    color: Colors.redbusTextPrimary,
  },
  gridPad: {
    paddingHorizontal: GUTTER,
  },
  dayCell: {
    width: CELL,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CELL / 2,
    margin: moderateScale(1),
  },
  dayCellSelected: {
    backgroundColor: Colors.redbusTextPrimary,
  },
  dayCellToday: {
    backgroundColor: Colors.redbusBackground,
    borderWidth: 2,
    borderColor: Colors.redbusTextPrimary,
  },
  dayCellDisabled: {
    opacity: 0.4,
  },
  placeholderCell: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: scale(12),
    color: Colors.redbusTextPrimary,
    textAlign: 'center',
    fontFamily: Fonts.primary,
  },
  placeholderText: {
    color: Colors.redbusDisabled,
    opacity: 0.5,
  },
  weekendText: {
    color: Colors.redbusSecondary,
  },
  selectedText: {
    color: Colors.redbusBackground,
    fontFamily: Fonts.bold,
  },
  todayText: {
    fontFamily: Fonts.bold,
    color: Colors.redbusTextPrimary,
  },
  disabledText: {
    color: Colors.redbusDisabled,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.redbusDisabled,
  },
});
