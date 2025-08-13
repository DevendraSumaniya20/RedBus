import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import Components from '../../components';
import Icons from '../../constants/svgPath';
import { moderateScale } from '../../constants/responsive';
import { ImagePath } from '../../constants/imagePath';
import Colors from '../../constants/color';
import DatepickerModel from '../../components/DatepickerModel';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bus' | 'train' | 'hotel'>('bus');

  // Bus states
  const [busFromLocation, setBusFromLocation] = useState('');
  const [busToLocation, setBusToLocation] = useState('');
  const [busDate, setBusDate] = useState<Date>(new Date());
  const [busWomenBooking, setBusWomenBooking] = useState(false);
  const [busShowDatePicker, setBusShowDatePicker] = useState(false);

  // Train states
  const [trainFromLocation, setTrainFromLocation] = useState('');
  const [trainToLocation, setTrainToLocation] = useState('');
  const [trainDate, setTrainDate] = useState<Date>(new Date());
  const [otpBooking, setOtpBooking] = useState(false);
  const [trainShowDatePicker, setTrainShowDatePicker] = useState(false);

  // Handlers for Bus Search
  const handleBusSearch = () => {
    console.log('Searching buses...');
    console.log('From:', busFromLocation);
    console.log('To:', busToLocation);
    console.log('Date:', busDate.toDateString());
    console.log('Women Booking:', busWomenBooking);
  };

  // Handlers for Train Search
  const handleTrainSearch = () => {
    console.log('Searching trains...');
    console.log('From:', trainFromLocation);
    console.log('To:', trainToLocation);
    console.log('Date:', trainDate.toDateString());
    console.log('OTP Booking:', otpBooking);
  };

  // Swap locations for Bus
  const handleSwapBusLocations = () => {
    setBusFromLocation(busToLocation);
    setBusToLocation(busFromLocation);
  };

  // Swap locations for Train
  const handleSwapTrainLocations = () => {
    setTrainFromLocation(trainToLocation);
    setTrainToLocation(trainFromLocation);
  };

  // Date handling for Bus
  const handleBusDateSelect = (date: Date) => {
    setBusDate(date);
    setBusShowDatePicker(false);
  };

  // Date handling for Train
  const handleTrainDateSelect = (date: Date) => {
    setTrainDate(date);
    setTrainShowDatePicker(false);
  };

  // Quick date select for Bus (today/tomorrow)
  const handleQuickDateSelectForBus = (type: 'today' | 'tomorrow') => {
    const newDate = new Date();
    if (type === 'tomorrow') {
      newDate.setDate(newDate.getDate() + 1);
    }
    setBusDate(newDate);
  };

  // Quick date select for Train (tomorrow/day after)
  const handleQuickDateSelectForTrain = (type: 'tomorrow' | 'day after') => {
    const newDate = new Date();
    if (type === 'tomorrow') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (type === 'day after') {
      newDate.setDate(newDate.getDate() + 2);
    }
    setTrainDate(newDate);
  };

  const getDisplayDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year:
          date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Segmented Control */}
      <View style={styles.tabContainer}>
        <Components.TabButton
          label="Bus Tickets"
          customIcon={
            <Image
              source={ImagePath.redbusLogo}
              style={{
                height: moderateScale(46),
                width: moderateScale(46),
                tintColor:
                  activeTab === 'bus'
                    ? Colors.redbusPrimary
                    : Colors.redbusDisabled,
              }}
            />
          }
          active={activeTab === 'bus'}
          onPress={() => setActiveTab('bus')}
        />

        <Components.TabButton
          label="Train Tickets"
          customIcon={
            <Icons.Train
              fill={
                activeTab === 'train'
                  ? Colors.redbusPrimary
                  : Colors.redbusDisabled
              }
              height={moderateScale(46)}
              width={moderateScale(46)}
            />
          }
          active={activeTab === 'train'}
          onPress={() => setActiveTab('train')}
        />

        <Components.TabButton
          label="Hotels"
          customIcon={
            <Icons.Hotel
              fill={
                activeTab === 'hotel'
                  ? Colors.redbusPrimary
                  : Colors.redbusDisabled
              }
              height={moderateScale(46)}
              width={moderateScale(46)}
            />
          }
          active={activeTab === 'hotel'}
          onPress={() => setActiveTab('hotel')}
        />
      </View>

      {/* Content Switcher */}
      {activeTab === 'bus' && (
        <Components.BusTicketCard
          fromLocation={busFromLocation}
          toLocation={busToLocation}
          selectedDate={getDisplayDate(busDate)}
          selectedDateObject={busDate}
          womenBooking={busWomenBooking}
          onChangeFrom={setBusFromLocation}
          onChangeTo={setBusToLocation}
          onDateSelect={() => setBusShowDatePicker(true)}
          onQuickDateSelect={handleQuickDateSelectForBus}
          onWomenBookingToggle={setBusWomenBooking}
          onSearch={handleBusSearch}
          onSwap={handleSwapBusLocations}
        />
      )}

      {activeTab === 'train' && (
        <Components.TrainTicketCard
          fromLocation={trainFromLocation}
          toLocation={trainToLocation}
          selectedDate={getDisplayDate(trainDate)}
          selectedDateObject={trainDate}
          otpBooking={otpBooking}
          onChangeFrom={setTrainFromLocation}
          onChangeTo={setTrainToLocation}
          onDateSelect={() => setTrainShowDatePicker(true)}
          onQuickDateSelect={handleQuickDateSelectForTrain}
          onotpBookingToggle={setOtpBooking}
          onSearch={handleTrainSearch}
          onSwap={handleSwapTrainLocations}
        />
      )}

      {activeTab === 'hotel' && <Components.HotelPromoCard />}

      {/* Bus Date Picker */}
      <DatepickerModel
        visible={busShowDatePicker}
        onClose={() => setBusShowDatePicker(false)}
        onDateSelect={handleBusDateSelect}
        initialDate={busDate}
      />

      {/* Train Date Picker */}
      <DatepickerModel
        visible={trainShowDatePicker}
        onClose={() => setTrainShowDatePicker(false)}
        onDateSelect={handleTrainDateSelect}
        initialDate={trainDate}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.redbusBackground,
  },
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
});
