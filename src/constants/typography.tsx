import { StyleSheet } from 'react-native';
import Fonts from './fontPath';
import { scale, verticalScale } from './responsive';

const Typography = StyleSheet.create({
  // HEADINGS
  heading1: {
    fontFamily: Fonts.bold,
    fontSize: scale(32),
    lineHeight: verticalScale(40),
  },
  heading2: {
    fontFamily: Fonts.semiBold,
    fontSize: scale(28),
    lineHeight: verticalScale(36),
  },
  heading3: {
    fontFamily: Fonts.bold,
    fontSize: scale(24),
    lineHeight: verticalScale(32),
  },

  // BODY
  bodyLarge: {
    fontFamily: Fonts.primary,
    fontSize: scale(18),
    lineHeight: verticalScale(28),
  },
  body: {
    fontFamily: Fonts.primary,
    fontSize: scale(16),
    lineHeight: verticalScale(24),
  },
  bodySmall: {
    fontFamily: Fonts.secondary,
    fontSize: scale(14),
    lineHeight: verticalScale(20),
  },

  // CAPTIONS & LABELS
  caption: {
    fontFamily: Fonts.secondary,
    fontSize: scale(12),
    lineHeight: verticalScale(16),
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: scale(13),
    lineHeight: verticalScale(18),
  },

  // SPECIAL STYLES
  italicText: {
    fontFamily: Fonts.primaryItalic,
    fontSize: scale(16),
    fontStyle: 'italic',
  },
  boldItalicText: {
    fontFamily: Fonts.boldItalic,
    fontSize: scale(16),
  },
});

export default Typography;
