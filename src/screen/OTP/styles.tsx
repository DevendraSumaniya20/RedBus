import { StyleSheet } from 'react-native';
import Colors from '../../constants/color';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
  scale,
} from '../../constants/responsive';
import Fonts from '../../constants/fontPath';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.white },
  container: { flex: 1, backgroundColor: Colors.white },
  closeButton: {
    position: 'absolute',
    top: moderateScale(20),
    right: moderateScale(20),
    width: moderateScale(32),
    height: moderateScale(32),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(86),
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.bold,
    marginBottom: moderateScale(32),
    color: Colors.textPrimary,
    lineHeight: moderateScale(30),
  },
  phoneSection: { marginBottom: moderateScale(40), position: 'relative' },
  phoneNumber: {
    fontSize: scale(16),
    fontFamily: Fonts.primary,
    color: Colors.redbusTextPrimary,
    marginBottom: moderateScale(4),
  },
  mobileLabel: {
    fontSize: scale(14),
    fontFamily: Fonts.primary,
    color: Colors.redbusTextSecondary,
    marginBottom: moderateScale(8),
  },
  editButton: { position: 'absolute', right: 0, top: 0 },
  editText: {
    fontSize: scale(16),
    color: Colors.black,
    fontFamily: Fonts.bold,
    textDecorationLine: 'underline',
  },
  otpLabel: {
    fontSize: scale(12),
    fontFamily: Fonts.primary,
    color: Colors.textSecondary,
    marginBottom: moderateScale(8),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: moderateScale(26),
  },
  input: {
    width: moderateWidth(12),
    height: moderateHeight(6),
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: moderateScale(12),
    fontSize: scale(20),
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    backgroundColor: Colors.white,
  },
  inputActive: { borderColor: Colors.black },
  inputFilled: {
    borderColor: Colors.redbusSecondary,
    backgroundColor: Colors.redbusAccent,
  },
  verifyButton: {
    backgroundColor: Colors.redbusPrimary,
    paddingVertical: moderateScale(16),
    borderRadius: moderateScale(32),
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  verifyButtonDisabled: {
    backgroundColor: Colors.redbusDisabled,
  },
  verifyButtonText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
  verifyButtonTextDisabled: {
    color: Colors.white,
  },

  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  resendText: {
    fontSize: scale(12),
    fontFamily: Fonts.primary,
    color: Colors.redbusTextSecondary,
  },
  timerText: {
    color: Colors.redbusWarning,
    fontFamily: Fonts.bold,
  },
  resendLink: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    textDecorationLine: 'underline',
    fontSize: scale(12),
    marginLeft: moderateScale(4),
  },
});

export default styles;
