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

interface Props {
  fromLocation: string;
  toLocation: string;
  selectedDate: 'today' | 'tomorrow';
  womenBooking: boolean;
  onChangeFrom: (text: string) => void;
  onChangeTo: (text: string) => void;
  onDateSelect: (date: 'today' | 'tomorrow') => void;
  onWomenBookingToggle: (value: boolean) => void;
  onSearch: () => void;
  onSwap?: () => void;
}

const BusTicketCard: React.FC<Props> = ({
  fromLocation,
  toLocation,
  selectedDate,
  womenBooking,
  onChangeFrom,
  onChangeTo,
  onDateSelect,
  onWomenBookingToggle,
  onSearch,
  onSwap,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Bus Tickets</Text>

      <View style={styles.bookingCard}>
        {/* From Input */}
        <View style={styles.inputRow}>
          <Icons.Bus height={18} width={18} fill="#666" />
          <TextInput
            style={styles.textInput}
            placeholder="From"
            placeholderTextColor="#999"
            value={fromLocation}
            onChangeText={onChangeFrom}
          />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* To Input */}
        <View style={styles.inputRow}>
          <Icons.Bus height={18} width={18} fill="#666" />
          <TextInput
            style={styles.textInput}
            placeholder="To"
            placeholderTextColor="#999"
            value={toLocation}
            onChangeText={onChangeTo}
          />
        </View>

        {/* Swap Button */}
        <TouchableOpacity
          style={styles.swapButton}
          activeOpacity={0.7}
          onPress={onSwap}
        >
          <Icons.Switch height={16} width={16} fill="#FFF" />
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Date Selection */}
        <View style={styles.dateRow}>
          <View style={styles.dateLeft}>
            <Icons.Calender height={18} width={18} fill="#666" />
            <View style={styles.dateInfo}>
              <Text style={styles.dateLabel}>Date of Journey</Text>
              <Text style={styles.dateValue}>Tue 12-Aug</Text>
            </View>
          </View>
          <View style={styles.dateButtons}>
            <TouchableOpacity
              style={[
                styles.dateButton,
                selectedDate === 'today' && styles.activeDateButton,
              ]}
              onPress={() => onDateSelect('today')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dateButtonText,
                  selectedDate === 'today' && styles.activeDateButtonText,
                ]}
              >
                Today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.dateButton,
                selectedDate === 'tomorrow' && styles.activeDateButton,
              ]}
              onPress={() => onDateSelect('tomorrow')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dateButtonText,
                  selectedDate === 'tomorrow' && styles.activeDateButtonText,
                ]}
              >
                Tomorrow
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Women Booking */}
      <View style={styles.womenBookingContainer}>
        <View style={styles.womenBookingLeft}>
          <View style={styles.womenIconContainer}>
            <Icons.WomenIcon height={20} width={20} fill="#FF6B6B" />
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
      <TouchableOpacity
        style={styles.searchButton}
        onPress={onSearch}
        activeOpacity={0.8}
      >
        <Icons.Search height={20} width={20} fill={Colors.white} />
        <Text style={styles.searchButtonText}>Search buses</Text>
      </TouchableOpacity>
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
    backgroundColor: '#FFF',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#E5E5E5',
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
    color: '#000',
    marginLeft: moderateWidth(3),
    paddingVertical: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  swapButton: {
    position: 'absolute',
    top: '25%', // Adjust vertical placement
    right: moderateWidth(3),
    backgroundColor: '#999',
    width: moderateWidth(9),
    height: moderateWidth(9),
    borderRadius: moderateWidth(9) / 2,
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
    color: '#999',
    fontFamily: Fonts.primary,
  },
  dateValue: {
    fontSize: moderateScale(16),
    color: '#000',
    fontFamily: Fonts.primary,
    fontWeight: '600',
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
    backgroundColor: '#F5F5F5',
  },
  activeDateButton: {
    backgroundColor: '#FFE5E5',
  },
  dateButtonText: {
    fontSize: moderateScale(12),
    color: '#666',
    fontFamily: Fonts.primary,
  },
  activeDateButtonText: {
    color: '#FF4B4B',
    fontWeight: '500',
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
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  womenBookingTextContainer: {
    marginLeft: moderateWidth(3),
  },
  womenBookingTitle: {
    fontSize: moderateScale(16),
    color: Colors.redbusDisabled,
    fontFamily: Fonts.primary,
    fontWeight: '500',
  },
  womenBookingSubtitle: {
    fontSize: moderateScale(12),
    color: '#4A90E2',
    marginTop: moderateHeight(0.2),
    fontFamily: Fonts.primary,
  },
  toggleContainer: {
    padding: moderateScale(2),
  },
  toggleTrack: {
    width: moderateScale(44),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(2),
  },
  toggleTrackActive: {
    backgroundColor: '#4CAF50',
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
  searchButton: {
    backgroundColor: '#FF4B4B',
    borderRadius: moderateScale(8),
    paddingVertical: moderateHeight(2.2),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  searchButtonText: {
    color: Colors.white,
    fontSize: moderateScale(16),
    fontFamily: Fonts.primary,
    fontWeight: '600',
    marginLeft: moderateWidth(2),
  },
});
