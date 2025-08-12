import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icons from '../constants/svgPath';
import Fonts from '../constants/fontPath';
import { moderateHeight, moderateWidth, scale } from '../constants/responsive';
import Colors from '../constants/color';

interface Country {
  flag: string;
  name: string;
}

interface CountryPickerCardProps {
  country: Country;
  onPress?: () => void;
  icon?: React.ReactNode;
}

const CountryPickerCard: React.FC<CountryPickerCardProps> = ({
  country,
  onPress,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.flagEmoji}>{country.flag}</Text>
        <Text style={styles.countryName}>{country.name}</Text>
      </View>
      {icon ??
        (Icons?.ArrowRight && (
          <Icons.ArrowRight height={scale(20)} width={scale(20)} />
        ))}
    </TouchableOpacity>
  );
};

export default CountryPickerCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.redbusBackground,
    borderRadius: scale(14),
    padding: moderateWidth(2),
    marginVertical: scale(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagEmoji: {
    fontSize: scale(24),
    marginRight: moderateWidth(4),
  },
  countryName: {
    fontSize: scale(16),
    fontFamily: Fonts.primary,
    color: Colors.redbusTextPrimary,
  },
});
