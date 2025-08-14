import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
  scale,
} from '../constants/responsive';
import Colors from '../constants/color';
import Icons from '../constants/svgPath';

export type Variant = 'Bus' | 'Train' | 'Hotel' | 'Default';

export interface OfferCardProps {
  variant: Variant;
  description: string;
  validDate: string; // ISO date or display string
  couponCode: string;
}

const RANDOM_COLORS = [
  '#FDE2E4',
  '#E2F0CB',
  '#CDE7F0',
  '#FFF5BA',
  '#FFD6A5',
  '#E5E0FF',
  '#D0F4DE',
];

const TEXT_COLOR = '#1F1F1F';

const OfferCard: React.FC<OfferCardProps> = ({
  variant,
  description,
  validDate,
  couponCode,
}) => {
  // Pick a random color only on mount
  const backgroundColor = useMemo(
    () => RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)],
    [],
  );

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Text style={styles.variantText}>{variant}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.validDate}>Valid Date: {validDate}</Text>

      <TouchableOpacity style={styles.couponButton} activeOpacity={0.8}>
        <Icons.ArrowLeft
          width={moderateScale(20)}
          height={moderateScale(20)}
          fill="#fff"
        />
        <Text style={styles.couponText}>{couponCode}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: moderateScale(12),
    padding: moderateScale(14),
    marginBottom: moderateScale(12),
    height: moderateHeight(20),
    width: moderateWidth(90),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    justifyContent: 'space-between',
  },
  variantText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: TEXT_COLOR,
    marginBottom: moderateScale(6),
  },
  description: {
    fontSize: scale(13),
    color: TEXT_COLOR,
    marginBottom: moderateScale(8),
  },
  validDate: {
    fontSize: scale(12),
    color: '#555',
    marginBottom: moderateScale(10),
  },
  couponButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.redbusTextPrimary,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(8),
    alignSelf: 'flex-start',
  },
  couponText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: moderateScale(6),
    fontSize: scale(13),
  },
});
