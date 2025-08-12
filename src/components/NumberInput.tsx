import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
} from 'react-native';
import Colors from '../constants/color';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from '../constants/responsive';
import Fonts from '../constants/fontPath';
import i18n from '../translate';

type CountryCode = {
  code: string;
  name: string;
};

type NumberInputProps = {
  countryCode: string;
  mobileNumber: string;
  onChangeCountryCode: (code: string) => void;
  onChangeMobileNumber: (number: string) => void;
};

const countryCodes: CountryCode[] = [
  { code: '+91', name: 'India' },
  { code: '+1', name: 'USA' },
  { code: '+44', name: 'UK' },
  { code: '+61', name: 'Australia' },
  { code: '+81', name: 'Japan' },
];

const NumberInput: React.FC<NumberInputProps> = ({
  countryCode,
  mobileNumber,
  onChangeCountryCode,
  onChangeMobileNumber,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectCountry = (code: string) => {
    onChangeCountryCode(code);
    setModalVisible(false);
  };

  const handleNumberChange = (text: string) => {
    const cleanNumber = text.replace(/[^0-9]/g, '');
    onChangeMobileNumber(cleanNumber);
  };

  return (
    <>
      {/* Input container */}
      <View style={styles.wrapper}>
        {/* Country Code */}
        <TouchableOpacity
          style={styles.codeContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.label}>{i18n.t('CountryCodeLabel')}</Text>
          <Text style={styles.value}>{countryCode} ▼</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.separator} />

        {/* Mobile Number */}
        <View style={styles.mobileContainer}>
          <Text style={styles.label}>{i18n.t('MobileNumberLabel')}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder={i18n.t('MobileNumberPlaceholder')}
            placeholderTextColor={Colors.redbusTextSecondary}
            value={mobileNumber}
            onChangeText={handleNumberChange}
            maxLength={10}
          />
        </View>
      </View>

      {/* Modal for country code selection */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FlatList
              data={countryCodes}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => handleSelectCountry(item.code)}
                >
                  <Text style={styles.countryText}>
                    {item.name} ({item.code})
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>{i18n.t('Close')}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default NumberInput;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: Colors.black,
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    backgroundColor: Colors.white,
    height: moderateScale(62),
  },
  codeContainer: {
    width: moderateScale(76),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
    alignItems: 'center',
  },
  mobileContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
  },
  label: {
    fontFamily: Fonts.secondary,
    color: Colors.redbusTextSecondary,
  },
  value: {
    fontFamily: Fonts.extraBold,
    marginTop: moderateHeight(0.5),
  },
  input: {
    fontFamily: Fonts.bold,
    marginTop: moderateHeight(0.5),
    padding: moderateScale(0),
  },
  separator: {
    width: moderateScale(1),
    backgroundColor: Colors.black,
    marginVertical: moderateHeight(0.1),
  },
  modalBackground: {
    flex: 1,
    backgroundColor: Colors.black80,
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.redbusBackground,
    marginHorizontal: moderateWidth(8),
    borderRadius: moderateScale(16),
    maxHeight: '60%',
  },
  countryItem: {
    paddingVertical: moderateHeight(1.5),
    paddingHorizontal: moderateWidth(4),
    borderBottomColor: Colors.redbusBorder,
    borderBottomWidth: 1,
  },
  countryText: {
    fontFamily: Fonts.semiBold,
    color: Colors.black100,
  },
  closeButton: {
    padding: moderateScale(12),
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.bold,
    color: Colors.redbusPrimary,
  },
});
