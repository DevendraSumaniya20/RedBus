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
  otpBooking: boolean;
  onChangeFrom: (text: string) => void;
  onChangeTo: (text: string) => void;
  onDateSelect: () => void; // Opens custom date picker
  onQuickDateSelect: (type: 'tomorrow' | 'day after') => void; // Quick select tomorrow/day after
  onotpBookingToggle: (value: boolean) => void;
  onSearch: () => void;
  onSwap?: () => void;
}

const TrainTicketCard: React.FC<Props> = ({
  fromLocation,
  toLocation,
  selectedDate,
  selectedDateObject,
  otpBooking,
  onChangeFrom,
  onChangeTo,
  onDateSelect,
  onQuickDateSelect,
  onotpBookingToggle,
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

  // Check if selected date is tomorrow or day after tomorrow
  const isTomorrow = () => {
    if (!selectedDateObject) return false;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return selectedDateObject.toDateString() === tomorrow.toDateString();
  };

  const isDayAfter = () => {
    if (!selectedDateObject) return false;
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    return selectedDateObject.toDateString() === dayAfter.toDateString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Book train Tickets</Text>

      <View style={styles.bookingCard}>
        {/* From Input */}
        <View style={styles.inputRow}>
          <Icons.Train2
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
          <Icons.Train2
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
        <View style={styles.dateRow}>
          <View style={styles.dateLeft}>
            <Icons.Calender height={20} width={20} fill={Colors.redbusGray} />
            <TouchableOpacity onPress={onDateSelect} style={styles.dateInfo}>
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
            </TouchableOpacity>
          </View>
          <View style={styles.dateButtons}>
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
            <TouchableOpacity
              style={[
                styles.dateButton,
                isDayAfter() && styles.activeDateButton,
              ]}
              onPress={() => onQuickDateSelect('day after')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dateButtonText,
                  isDayAfter() && styles.activeDateButtonText,
                ]}
              >
                Day After
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* OTP Booking */}
      <View style={styles.TrainOTPContainer}>
        <View style={styles.TrainOTPBookingLeft}>
          <View style={styles.TrainOTPIconContainer}>
            <Icons.Shield
              height={moderateScale(30)}
              width={moderateScale(30)}
              fill={Colors.redbusSecondary}
            />
          </View>
          <View style={styles.TrainOTPBookingTextContainer}>
            <Text style={styles.TrainOTPBookingTitle}>
              OTP for Free Cancellation
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.TrainOTPBookingSubtitle}>
                instant full fare refund
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onotpBookingToggle(!otpBooking)}
          activeOpacity={0.7}
          style={styles.toggleContainer}
        >
          <View
            style={[styles.toggleTrack, otpBooking && styles.toggleTrackActive]}
          >
            <View
              style={[
                styles.toggleThumb,
                otpBooking && styles.toggleThumbActive,
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
        title="Search trains"
        icon={
          <Icons.Search height={moderateScale(24)} width={moderateScale(24)} />
        }
      />
    </View>
  );
};

export default TrainTicketCard;

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
  TrainOTPContainer: {
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
  TrainOTPBookingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  TrainOTPIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  TrainOTPBookingTextContainer: {
    marginLeft: moderateWidth(2),
  },
  TrainOTPBookingTitle: {
    fontSize: scale(14),
    color: Colors.redbusTextPrimary,
    fontFamily: Fonts.primary,
  },
  TrainOTPBookingSubtitle: {
    fontSize: scale(10),
    color: Colors.redbusGray,
    marginTop: moderateHeight(0.2),
    fontFamily: Fonts.secondary,
    // textDecorationLine: 'underline',
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
    backgroundColor: Colors.redbusPrimary,
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
