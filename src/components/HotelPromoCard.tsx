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
import Components from '.';

interface Props {
  hotelLocation: string;
  checkInDate: string;
  checkOutDate: string;
  checkInDateObject?: Date;
  checkOutDateObject?: Date;
  guests: {
    rooms: number;
    adults: number;
    children: number;
  };
  onLocationChange: (text: string) => void;
  onCheckInDateSelect: () => void;
  onCheckOutDateSelect: () => void;
  onGuestsSelect: () => void; // ✅ updated type
  onSearch: () => void;
}

const HotelPromoCard: React.FC<Props> = ({
  hotelLocation,
  checkInDate,
  checkOutDate,
  checkInDateObject,
  checkOutDateObject,
  guests,
  onLocationChange,
  onCheckInDateSelect,
  onCheckOutDateSelect,
  onGuestsSelect,
  onSearch,
}) => {
  const formatGuestsText = () => {
    return `${guests.rooms} room • ${guests.adults} Adults • ${guests.children} Children`;
  };

  return (
    <View style={styles.container}>
      {/* Hotel Booking Card */}
      <View style={styles.bookingCard}>
        {/* Location Input */}
        <View style={styles.inputRow}>
          <Icons.Search
            height={18}
            width={18}
            fill={hotelLocation ? Colors.redbusPrimary : Colors.redbusGray}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Near me"
            placeholderTextColor={Colors.redbusGray}
            value={hotelLocation}
            onChangeText={onLocationChange}
          />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Date Selection Row */}
        <View style={styles.dateRow}>
          {/* Check In */}
          <TouchableOpacity
            onPress={onCheckInDateSelect}
            style={styles.dateSection}
          >
            <Icons.Calender height={18} width={18} fill={Colors.redbusGray} />
            <View style={styles.dateInfo}>
              <Text style={styles.dateLabel}>Check In</Text>
              <Text style={styles.dateValue}>
                {checkInDateObject
                  ? checkInDateObject.toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      weekday: 'short',
                    })
                  : checkInDate}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Vertical Divider */}
          <View style={styles.verticalDivider} />

          {/* Check Out */}
          <TouchableOpacity
            onPress={onCheckOutDateSelect}
            style={styles.dateSection}
          >
            <Icons.Calender height={18} width={18} fill={Colors.redbusGray} />
            <View style={styles.dateInfo}>
              <Text style={styles.dateLabel}>Check Out</Text>
              <Text style={styles.dateValue}>
                {checkOutDateObject
                  ? checkOutDateObject.toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      weekday: 'short',
                    })
                  : checkOutDate}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Guests Selection */}
        <TouchableOpacity onPress={onGuestsSelect} style={styles.inputRow}>
          <Icons.GoogleLogo height={18} width={18} fill={Colors.redbusGray} />
          <View style={styles.guestsInfo}>
            <Text style={styles.guestsLabel}>No. of rooms & guests</Text>
            <Text style={styles.guestsValue}>{formatGuestsText()}</Text>
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
        title="Search"
        icon={
          <Icons.Search height={moderateScale(24)} width={moderateScale(24)} />
        }
      />

      {/* Promo Card */}
      <View style={styles.promoCard}>
        {/* Header */}
        <View style={styles.promoHeader}>
          <Text style={styles.promoTitle}>Book hotels from ₹399</Text>
          <Text style={styles.promoSubtitle}>with early check in</Text>
        </View>

        {/* Hotel Images */}
        <View style={styles.hotelImagesContainer}>
          <View style={styles.hotelImage}>
            <View style={styles.hotelImagePlaceholder} />
          </View>
          <View style={styles.hotelImage}>
            <View style={styles.hotelImagePlaceholder} />
          </View>
          <View style={styles.hotelImage}>
            <View style={styles.hotelImagePlaceholder} />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.promoFooter}>
          <Text style={styles.promoText}>
            🏨 redBus Hotels Mega Sale: Up to 60% off on 20k+ properties. Ends
            on 16th Aug
          </Text>
          <Text style={styles.sponsoredText}>Sponsored</Text>
        </View>
      </View>
    </View>
  );
};

export default HotelPromoCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateWidth(4),
    paddingTop: moderateHeight(4),
  },
  bookingCard: {
    backgroundColor: Colors.redbusBackground,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.redbusDisabled,
    overflow: 'hidden',
    marginBottom: moderateHeight(2),
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
  verticalDivider: {
    width: 1,
    height: '60%',
    backgroundColor: Colors.redbusDisabled,
    marginHorizontal: moderateWidth(2),
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateHeight(6.5),
    paddingHorizontal: moderateWidth(4),
  },
  dateSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  guestsInfo: {
    marginLeft: moderateWidth(3),
    flex: 1,
  },
  guestsLabel: {
    fontSize: moderateScale(12),
    color: Colors.redbusDisabled,
    fontFamily: Fonts.primary,
  },
  guestsValue: {
    fontSize: moderateScale(16),
    color: Colors.redbusTextPrimary,
    fontFamily: Fonts.primary,
    marginTop: moderateHeight(0.2),
  },
  // Promo Card Styles
  promoCard: {
    backgroundColor: Colors.white,
    marginTop: moderateHeight(2),
    borderRadius: moderateScale(12),
    padding: moderateWidth(4),
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  promoHeader: {
    marginBottom: moderateHeight(2),
  },
  promoTitle: {
    fontSize: scale(18),
    fontFamily: Fonts.bold,
    color: Colors.redbusTextPrimary,
  },
  promoSubtitle: {
    fontSize: scale(14),
    color: Colors.redbusGray,
    fontFamily: Fonts.primary,
    marginTop: moderateHeight(0.5),
  },
  hotelImagesContainer: {
    flexDirection: 'row',
    gap: moderateWidth(2),
    marginBottom: moderateHeight(1.5),
  },
  hotelImage: {
    flex: 1,
    height: moderateHeight(8),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  hotelImagePlaceholder: {
    flex: 1,
    backgroundColor: Colors.redbusAccent,
    borderRadius: moderateScale(8),
  },
  promoFooter: {
    alignItems: 'flex-end',
  },
  promoText: {
    fontSize: scale(12),
    color: Colors.redbusGray,
    textAlign: 'right',
    marginBottom: moderateHeight(0.5),
    fontFamily: Fonts.primary,
  },
  sponsoredText: {
    fontSize: scale(10),
    color: Colors.redbusDisabled,
    fontFamily: Fonts.primary,
  },
});
