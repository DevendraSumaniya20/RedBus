import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ListRenderItem,
} from 'react-native';
import Fonts from '../constants/fontPath';
import Colors from '../constants/color';
import { moderateHeight, moderateWidth, scale } from '../constants/responsive';
import Icons from '../constants/svgPath';
import { t } from 'i18next';

interface Language {
  code: string;
  label: string;
}

interface Props {
  selectedLanguage: string; // language code like 'en'
  onLanguageSelect: (languageCode: string) => void;
}
const languageList: Language[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी (Hindi)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
];

interface Props {
  selectedLanguage: string; // language code like 'en'
  onLanguageSelect: (languageCode: string) => void;
}

const CustomLanguageSelection: React.FC<Props> = ({
  selectedLanguage,
  onLanguageSelect,
}) => {
  const renderItem: ListRenderItem<Language> = ({ item }) => {
    const isSelected = item.code === selectedLanguage;

    return (
      <TouchableOpacity
        style={[styles.languageOption, isSelected && styles.selectedOption]}
        onPress={() => onLanguageSelect(item.code)}
        activeOpacity={0.7}
      >
        <Text style={[styles.languageText, isSelected && styles.selectedText]}>
          {item.label}
        </Text>
        {isSelected ? (
          <Icons.RadioButtonOn
            height={scale(20)}
            width={scale(20)}
            fill={Colors.redbusPrimary}
          />
        ) : (
          <Icons.RadioButtonOff height={scale(20)} width={scale(20)} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={languageList}
        keyExtractor={item => item.code}
        renderItem={renderItem}
        scrollEnabled={false}
      />
      <Text style={styles.noteText}>{t('ChangeLanguageNote')}</Text>
    </View>
  );
};

export default CustomLanguageSelection;

const styles = StyleSheet.create({
  container: {
    marginTop: scale(12),
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.redbusBorder,
    borderRadius: scale(12),
    paddingVertical: moderateHeight(1.4),
    paddingHorizontal: moderateWidth(12),
    marginVertical: scale(4),
  },
  selectedOption: {
    borderColor: Colors.redbusPrimary,
    backgroundColor: Colors.redbusBackground,
  },
  languageText: {
    fontSize: scale(16),
    fontFamily: Fonts.primary,
    color: Colors.redbusTextPrimary,
  },
  selectedText: {
    fontWeight: '700',
    color: Colors.redbusPrimary,
  },
  noteText: {
    marginTop: scale(8),
    fontSize: scale(12),
    color: Colors.redbusTextSecondary,
    fontFamily: Fonts.primary,
    textAlign: 'center',
  },
});
