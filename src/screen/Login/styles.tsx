import { StyleSheet } from 'react-native';
import Colors from '../../constants/color';
import { moderateScale, scale } from '../../constants/responsive';
import Fonts from '../../constants/fontPath';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.redbusBackground,
  },
  sliderContainer: {
    backgroundColor: Colors.white100,
    borderRadius: scale(12),
    margin: moderateScale(16),
    paddingVertical: moderateScale(26),
    paddingHorizontal: moderateScale(8),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    marginBottom: moderateScale(20),
  },
  pageNumberContainer: {
    flex: 1,
  },
  pageNumberPill: {
    backgroundColor: Colors.redbusPrimary,
    borderRadius: scale(20),
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    alignSelf: 'flex-start',
  },
  pageNumberText: {
    color: Colors.white,
    fontSize: scale(14),
    textAlign: 'center',
  },
  currentNumber: {
    fontFamily: Fonts.semiBold,
  },
  totalNumber: {
    fontFamily: Fonts.primary,
    opacity: 0.8,
  },
  dotsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: Colors.redbusAccent,
    marginHorizontal: scale(4),
  },
  activeDot: {
    backgroundColor: Colors.redbusPrimary,
    width: scale(24),
  },
  skipContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  skipButton: {
    fontSize: scale(14),
    color: Colors.redbusSkip,
    fontFamily: Fonts.bold,
    textDecorationLine: 'underline',
  },
  loginHeaderContainer: {
    marginBottom: moderateScale(20),
    backgroundColor: Colors.transparent,
    alignItems: 'flex-start',
  },
  loginHeaderText: {
    fontFamily: Fonts.bold,
    fontSize: scale(16),
    color: Colors.redbusTextPrimary,
  },
});

export default styles;
