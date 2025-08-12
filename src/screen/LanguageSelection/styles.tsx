import { StyleSheet } from 'react-native';
import Colors from '../../constants/color';
import { moderateScale, scale } from '../../constants/responsive';
import Fonts from '../../constants/fontPath';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(16),
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    marginTop: scale(24),
    marginBottom: scale(12),
    fontWeight: 'bold',
    fontSize: scale(18),
  },
  buttonContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(16),
    backgroundColor: Colors.background,
  },
  bottomSheetBackground: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
  },
  sheetHeader: {
    fontSize: scale(20),
    fontFamily: Fonts.semiBold,
    marginVertical: scale(12),
    color: Colors.redbusTextPrimary,
    paddingHorizontal: scale(16),
  },
  listContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(40),
  },
});

export default styles;
