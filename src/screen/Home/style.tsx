import { StyleSheet } from 'react-native';
import Colors from '../../constants/color';
import { moderateScale, scale } from '../../constants/responsive';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.redbusBackground },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.redbusBorder,
    backgroundColor: Colors.redbusBackground,
    marginTop: moderateScale(32),
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(8),
    marginBottom: moderateScale(18),
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
});

export default styles;
