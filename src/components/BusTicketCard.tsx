import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
  scale,
} from '../constants/responsive';
import Colors from '../constants/color';
import Fonts from '../constants/fontPath';
import Icons from '../constants/svgPath';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import Components from '.';

interface Props {
  fromLocation: string;
  toLocation: string;
  selectedDate: string;
  selectedDateObject?: Date;
  womenBooking: boolean;
  onChangeFrom: (text: string) => void;
  onChangeTo: (text: string) => void;
  onDateSelect: () => void; // Opens custom date picker
  onQuickDateSelect: (type: 'today' | 'tomorrow') => void; // Quick select today/tomorrow
  onWomenBookingToggle: (value: boolean) => void;
  onSearch: () => void;
  onSwap?: () => void;
}

const BusTicketCard: React.FC<Props> = ({
  fromLocation,
  toLocation,
  selectedDate,
  selectedDateObject,
  womenBooking,
  onChangeFrom,
  onChangeTo,
  onDateSelect,
  onQuickDateSelect,
  onWomenBookingToggle,
  onSearch,
  onSwap,
}) => {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const handleSwap = () => {
    rotation.value = withSequence(
      withTiming(180, { duration: 250 }),
      withTiming(0, { duration: 0 }),
    );

    if (onSwap) {
      onSwap();
    }
  };

  // Check if selected date is today or tomorrow
  const isToday = () => {
    if (!selectedDateObject) return false;
    const today = new Date();
    return selectedDateObject.toDateString() === today.toDateString();
  };

  const isTomorrow = () => {
    if (!selectedDateObject) return false;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return selectedDateObject.toDateString() === tomorrow.toDateString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Bus Tickets</Text>

      <View style={styles.bookingCard}>
        {/* From Input */}
        <View style={styles.inputRow}>
          <Icons.Bus
            height={18}
            width={18}
            fill={fromLocation ? Colors.redbusPrimary : Colors.redbusGray}
          />
          <TextInput
            style={styles.textInput}
            placeholder="From"
            placeholderTextColor={Colors.redbusGray}
            value={fromLocation}
            onChangeText={onChangeFrom}
          />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* To Input */}
        <View style={styles.inputRow}>
          <Icons.Bus
            height={18}
            width={18}
            fill={toLocation ? Colors.redbusPrimary : Colors.redbusGray}
          />
          <TextInput
            style={styles.textInput}
            placeholder="To"
            placeholderTextColor={Colors.redbusGray}
            value={toLocation}
            onChangeText={onChangeTo}
          />
        </View>

        {/* Swap Button */}
        <TouchableOpacity
          style={styles.swapButton}
          activeOpacity={0.7}
          onPress={handleSwap}
        >
          <Animated.View style={animatedStyle}>
            <Icons.Switch
              height={16}
              width={16}
              fill={Colors.white}
              stroke={Colors.white}
            />
          </Animated.View>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Date Selection */}
        <TouchableOpacity style={styles.dateRow} onPress={onDateSelect}>
          <View style={styles.dateLeft}>
            <Icons.Calender height={20} width={20} fill={Colors.redbusGray} />
            <View style={styles.dateInfo}>
              <Text style={styles.dateLabel}>Date of Journey</Text>
              <Text style={styles.dateValue}>
                {selectedDateObject
                  ? selectedDateObject.toLocaleDateString('en-US', {
                      weekday: 'short',
                      day: '2-digit',
                      month: 'short',
                    })
                  : 'Select Date'}
              </Text>
            </View>
          </View>
          <View style={styles.dateButtons}>
            <TouchableOpacity
              style={[styles.dateButton, isToday() && styles.activeDateButton]}
              onPress={() => onQuickDateSelect('today')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dateButtonText,
                  isToday() && styles.activeDateButtonText,
                ]}
              >
                Today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.dateButton,
                isTomorrow() && styles.activeDateButton,
              ]}
              onPress={() => onQuickDateSelect('tomorrow')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dateButtonText,
                  isTomorrow() && styles.activeDateButtonText,
                ]}
              >
                Tomorrow
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>

      {/* Women Booking */}
      <View style={styles.womenBookingContainer}>
        <View style={styles.womenBookingLeft}>
          <View style={styles.womenIconContainer}>
            <Icons.WomenIcon
              height={moderateScale(30)}
              width={moderateScale(30)}
              fill={Colors.redbusPrimary}
            />
          </View>
          <View style={styles.womenBookingTextContainer}>
            <Text style={styles.womenBookingTitle}>Booking for women</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.womenBookingSubtitle}>Know more</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onWomenBookingToggle(!womenBooking)}
          activeOpacity={0.7}
          style={styles.toggleContainer}
        >
          <View
            style={[
              styles.toggleTrack,
              womenBooking && styles.toggleTrackActive,
            ]}
          >
            <View
              style={[
                styles.toggleThumb,
                womenBooking && styles.toggleThumbActive,
              ]}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Button */}
      <Components.ActionButton
        buttonStyle={{
          backgroundColor: Colors.redbusPrimary,
          borderColor: Colors.redbusSurface,
        }}
        textStyle={{
          fontSize: scale(14),
          fontFamily: Fonts.bold,
          color: Colors.white,
        }}
        variant="social"
        onPress={onSearch}
        title="Search Buses"
        icon={
          <Icons.Search height={moderateScale(24)} width={moderateScale(24)} />
        }
      />
    </View>
  );
};

export default BusTicketCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateWidth(4),
    paddingTop: moderateHeight(4),
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    marginBottom: moderateHeight(2),
    marginLeft: moderateWidth(1),
    fontSize: scale(18),
  },
  bookingCard: {
    backgroundColor: Colors.redbusBackground,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.redbusDisabled,
    overflow: 'hidden',
    marginBottom: moderateHeight(2),
    position: 'relative',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateHeight(6.5),
    paddingHorizontal: moderateWidth(4),
  },
  textInput: {
    flex: 1,
    fontSize: moderateScale(16),
    fontFamily: Fonts.primary,
    color: Colors.redbusTextPrimary,
    marginLeft: moderateWidth(3),
    paddingVertical: 0,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.redbusDisabled,
  },
  swapButton: {
    position: 'absolute',
    top: '19%',
    right: moderateWidth(3),
    backgroundColor: Colors.redbusSwitch,
    width: moderateWidth(12),
    height: moderateWidth(12),
    borderRadius: moderateWidth(14) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 3,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateWidth(4),
    height: moderateHeight(6.5),
  },
  dateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateInfo: {
    marginLeft: moderateWidth(3),
  },
  dateLabel: {
    fontSize: moderateScale(12),
    color: Colors.redbusDisabled,
    fontFamily: Fonts.primary,
  },
  dateValue: {
    fontSize: moderateScale(16),
    color: Colors.redbusTextPrimary,
    fontFamily: Fonts.primary,
    marginTop: moderateHeight(0.2),
  },
  dateButtons: {
    flexDirection: 'row',
    gap: moderateWidth(1.5),
  },
  dateButton: {
    paddingHorizontal: moderateWidth(4),
    paddingVertical: moderateHeight(0.8),
    borderRadius: moderateScale(16),
    backgroundColor: Colors.redbusAccent,
  },
  activeDateButton: {
    backgroundColor: Colors.redbusSecondary,
  },
  dateButtonText: {
    fontSize: moderateScale(12),
    color: Colors.redbusTextPrimary,
    fontFamily: Fonts.bold,
  },
  activeDateButtonText: {
    color: Colors.white,
  },
  womenBookingContainer: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateWidth(4),
    paddingVertical: moderateHeight(2.5),
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: moderateHeight(2),
  },
  womenBookingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  womenIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  womenBookingTextContainer: {
    marginLeft: moderateWidth(2),
  },
  womenBookingTitle: {
    fontSize: scale(16),
    color: Colors.redbusTextPrimary,
    fontFamily: Fonts.primary,
  },
  womenBookingSubtitle: {
    fontSize: scale(12),
    color: Colors.redbusKnowMore,
    marginTop: moderateHeight(0.2),
    fontFamily: Fonts.bold,
    textDecorationLine: 'underline',
  },
  toggleContainer: {
    padding: moderateScale(2),
  },
  toggleTrack: {
    width: moderateScale(44),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.redbusBorder,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(2),
  },
  toggleTrackActive: {
    backgroundColor: Colors.success,
  },
  toggleThumb: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
});
