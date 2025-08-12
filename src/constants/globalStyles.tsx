import { StyleSheet } from 'react-native';
import Colors from './color'; // your existing color constants
import Typography from './typography'; // the typography we just built
import {
  moderateScale,
  moderateWidth,
  scale,
  verticalScale,
} from './responsive';

const GlobalStyles = StyleSheet.create({
  // TEXT STYLES
  heading1: Typography.heading1,
  heading2: Typography.heading2,
  heading3: Typography.heading3,
  body: Typography.body,
  bodySmall: Typography.bodySmall,
  caption: Typography.caption,
  label: Typography.label,

  // COLORS
  textPrimary: {
    color: Colors.textPrimary,
  },
  textSecondary: {
    color: Colors.textSecondary,
  },
  background: {
    backgroundColor: Colors.background,
  },

  // LAYOUT
  container: {
    flex: 1,
    backgroundColor: Colors.redbusBackground,
  },
  subContainer: {
    flex: 1,
    padding: moderateScale(8),
    backgroundColor: Colors.redbusBackground,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },

  // SPACING UTILITIES
  mt8: {
    marginTop: verticalScale(8),
  },
  mt16: {
    marginTop: verticalScale(16),
  },
  mb8: {
    marginBottom: verticalScale(8),
  },
  mb16: {
    marginBottom: verticalScale(16),
  },
  ml8: {
    marginLeft: scale(8),
  },
  ml16: {
    marginLeft: scale(16),
  },
  mr8: {
    marginRight: scale(8),
  },
  mr16: {
    marginRight: scale(16),
  },
  p8: {
    padding: scale(8),
  },
  p16: {
    padding: scale(16),
  },
});

export default GlobalStyles;
