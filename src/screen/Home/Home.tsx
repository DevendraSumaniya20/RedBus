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

  // Hotel states
  const [hotelLocation, setHotelLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [hotelGuests, setHotelGuests] = useState({
    rooms: 1,
    adults: 2,
    children: 0,
  });

  // Handlers
  const handleBusSearch = () => {
    console.log('Searching buses...', {
      busFromLocation,
      busToLocation,
      busDate,
      busWomenBooking,
    });
  };

  const handleTrainSearch = () => {
    console.log('Searching trains...', {
      trainFromLocation,
      trainToLocation,
      trainDate,
      otpBooking,
    });
  };

  const handleHotelSearch = () => {
    console.log('Searching hotels...', {
      hotelLocation,
      checkInDate,
      checkOutDate,
      hotelGuests,
    });
  };

  const handleSwapBusLocations = () => {
    setBusFromLocation(busToLocation);
    setBusToLocation(busFromLocation);
  };

  const handleSwapTrainLocations = () => {
    setTrainFromLocation(trainToLocation);
    setTrainToLocation(trainFromLocation);
  };

  const handleBusDateSelect = (date: Date) => {
    setBusDate(date);
    setBusShowDatePicker(false);
  };

  const handleTrainDateSelect = (date: Date) => {
    setTrainDate(date);
    setTrainShowDatePicker(false);
  };

  const handleQuickDateSelectForBus = (type: 'today' | 'tomorrow') => {
    const newDate = new Date();
    if (type === 'tomorrow') newDate.setDate(newDate.getDate() + 1);
    setBusDate(newDate);
  };

  const handleQuickDateSelectForTrain = (type: 'tomorrow' | 'day after') => {
    const newDate = new Date();
    if (type === 'tomorrow') newDate.setDate(newDate.getDate() + 1);
    if (type === 'day after') newDate.setDate(newDate.getDate() + 2);
    setTrainDate(newDate);
  };

  const handleCheckInDatePress = () => setShowCheckInPicker(true);
  const handleCheckOutDatePress = () => setShowCheckOutPicker(true);

  const handleCheckInDateSelect = (date: Date) => {
    setCheckInDate(date);
    setShowCheckInPicker(false);
  };

  const handleCheckOutDateSelect = (date: Date) => {
    setCheckOutDate(date);
    setShowCheckOutPicker(false);
  };

  const handleGuestsSelect = (guests: {
    rooms: number;
    adults: number;
    children: number;
  }) => {
    setHotelGuests(guests);
  };

  const getDisplayDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });
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

      {activeTab === 'hotel' && (
        <Components.HotelPromoCard
          hotelLocation={hotelLocation}
          checkInDate={getDisplayDate(checkInDate)}
          checkOutDate={getDisplayDate(checkOutDate)}
          checkInDateObject={checkInDate}
          checkOutDateObject={checkOutDate}
          guests={hotelGuests}
          onLocationChange={setHotelLocation}
          onCheckInDateSelect={handleCheckInDatePress}
          onCheckOutDateSelect={handleCheckOutDatePress}
          onGuestsSelect={handleGuestsSelect}
          onSearch={handleHotelSearch}
        />
      )}

      {/* Date Pickers */}
      <DatepickerModel
        visible={busShowDatePicker}
        onClose={() => setBusShowDatePicker(false)}
        onDateSelect={handleBusDateSelect}
        initialDate={busDate}
      />
      <DatepickerModel
        visible={trainShowDatePicker}
        onClose={() => setTrainShowDatePicker(false)}
        onDateSelect={handleTrainDateSelect}
        initialDate={trainDate}
      />
      <DatepickerModel
        visible={showCheckInPicker}
        onClose={() => setShowCheckInPicker(false)}
        onDateSelect={handleCheckInDateSelect}
        initialDate={checkInDate}
      />
      <DatepickerModel
        visible={showCheckOutPicker}
        onClose={() => setShowCheckOutPicker(false)}
        onDateSelect={handleCheckOutDateSelect}
        initialDate={checkOutDate}
      />
    </SafeAreaView>
  );
};

export default Home;

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
});
