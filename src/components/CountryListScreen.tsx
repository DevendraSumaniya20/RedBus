import React, { useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Fonts from '../constants/fontPath';
import { moderateWidth, scale } from '../constants/responsive';
import Colors from '../constants/color';
import Icons from '../constants/svgPath';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Components from './index';
import i18n from '../translate';

// Static flags + translation keys
const countryFlags: Record<string, string> = {
  India: '🇮🇳',
  UnitedStates: '🇺🇸',
  Canada: '🇨🇦',
  UnitedKingdom: '🇬🇧',
  Australia: '🇦🇺',
  Germany: '🇩🇪',
  France: '🇫🇷',
  Japan: '🇯🇵',
  Brazil: '🇧🇷',
  SouthAfrica: '🇿🇦',
};

// Generate country list dynamically from translations
const getCountryList = () => {
  return Object.entries(countryFlags).map(([key, flag]) => ({
    flag,
    name: i18n.t(key), // Localized country name
  }));
};

const CountryListScreen = () => {
  const countryList = useMemo(() => getCountryList(), []);
  const [selectedCountry, setSelectedCountry] = useState(countryList[0]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['100%'], []);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handleCountrySelect = (country: { flag: string; name: string }) => {
    setSelectedCountry(country);
    handleCloseBottomSheet();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Selected Country */}
        <TouchableOpacity onPress={handleOpenBottomSheet}>
          <Components.CountryPickerCard
            country={selectedCountry}
            onPress={handleOpenBottomSheet}
          />
        </TouchableOpacity>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          backgroundStyle={styles.bottomSheetBackground}
        >
          <Text style={styles.header}>{i18n.t('SelectCountry')}</Text>

          <BottomSheetFlatList
            data={countryList}
            keyExtractor={item => item.name}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = item.name === selectedCountry.name;

              return (
                <Components.CountryPickerCard
                  country={item}
                  onPress={() => handleCountrySelect(item)}
                  icon={
                    isSelected ? (
                      <Icons.RadioButtonOn
                        height={scale(20)}
                        width={scale(20)}
                        fill={Colors.redbusPrimary}
                      />
                    ) : (
                      <Icons.RadioButtonOff
                        height={scale(20)}
                        width={scale(20)}
                      />
                    )
                  }
                />
              );
            }}
          />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default CountryListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: moderateWidth(4) },
  header: {
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
  bottomSheetBackground: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
  },
});
