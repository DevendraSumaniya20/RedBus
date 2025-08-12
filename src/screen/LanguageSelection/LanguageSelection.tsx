import React, { useRef, useState, useMemo } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import Components from '../../components';
import Typography from '../../constants/typography';
import Colors from '../../constants/color';
import {
  moderateHeight,
  moderateWidth,
  scale,
} from '../../constants/responsive';
import Icons from '../../constants/svgPath';
import { ImagePath } from '../../constants/imagePath';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import navigationStrings from '../../constants/navigationString';
import { AuthStackParamList } from '../../navigation/AuthNavigation';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../redux/hooks';
import { setLanguage } from '../../redux/slices/languageSlice';
import styles from './styles';

type LanguageSelectionNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  typeof navigationStrings.LanguageSelection
>;

interface Props {
  navigation: LanguageSelectionNavigationProp;
}

const LanguageSelection: React.FC<Props> = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const [selectedCountry, setSelectedCountry] = useState({
    flag: '🇮🇳',
    name: t('India'),
  });

  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['100%'], []);

  // Country list now dynamic from translations
  const countryList = [
    { flag: '🇮🇳', name: t('India') },
    { flag: '🇺🇸', name: t('UnitedStates') },
    { flag: '🇨🇦', name: t('Canada') },
    { flag: '🇬🇧', name: t('UnitedKingdom') },
    { flag: '🇦🇺', name: t('Australia') },
    { flag: '🇩🇪', name: t('Germany') },
    { flag: '🇫🇷', name: t('France') },
    { flag: '🇯🇵', name: t('Japan') },
    { flag: '🇧🇷', name: t('Brazil') },
    { flag: '🇿🇦', name: t('SouthAfrica') },
  ];

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

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode);
    dispatch(setLanguage(languageCode));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.logoContainer}>
              <Image
                source={ImagePath.redbusLogo}
                style={{
                  width: moderateWidth(30),
                  height: moderateHeight(20),
                  resizeMode: 'contain',
                }}
              />
            </View>

            {/* Country Picker */}
            <Text style={[Typography.heading3, styles.sectionTitle]}>
              {t('Country')}
            </Text>
            <TouchableOpacity onPress={handleOpenBottomSheet}>
              <Components.CountryPickerCard
                country={selectedCountry}
                onPress={handleOpenBottomSheet}
              />
            </TouchableOpacity>

            {/* Language Section */}
            <Text style={[Typography.heading3, styles.sectionTitle]}>
              {t('ChooseLanguage')}
            </Text>
            <Components.CustomLanguageSelection
              selectedLanguage={selectedLanguage}
              onLanguageSelect={handleLanguageSelect}
            />
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Components.ActionButton
              title={t('GetStarted')}
              onPress={() =>
                navigation.navigate(navigationStrings.Login, {
                  country: selectedCountry,
                  language: selectedLanguage,
                })
              }
              disabled={false}
            />
          </View>
        </KeyboardAvoidingView>

        {/* Bottom Sheet for Country List */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          backgroundStyle={styles.bottomSheetBackground}
        >
          <Text style={styles.sheetHeader}>{t('SelectCountry')}</Text>
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
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default LanguageSelection;
