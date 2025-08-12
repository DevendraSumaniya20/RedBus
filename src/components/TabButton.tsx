import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from '../constants/responsive';
import Colors from '../constants/color';
import Fonts from '../constants/fontPath';

interface TabButtonProps {
  label: string;
  customIcon?: React.ReactNode;
  active: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  label,
  customIcon,
  active,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.tab, active && styles.activeTab]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {customIcon && <View style={styles.iconWrapper}>{customIcon}</View>}
      <Text style={[styles.tabText, active && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateHeight(1),
    borderBottomWidth: moderateScale(1.5),
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.redbusPrimary,
  },
  iconWrapper: {
    marginBottom: moderateWidth(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontFamily: Fonts.bold,
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  activeText: {
    color: Colors.redbusPrimary,
  },
});
