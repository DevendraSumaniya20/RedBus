import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import Components from '../../components';
import Icons from '../../constants/svgPath';
import { moderateScale } from '../../constants/responsive';
import { ImagePath } from '../../constants/imagePath';
import Colors from '../../constants/color';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bus' | 'train' | 'hotel'>('bus');

  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow'>(
    'today',
  );
  const [womenBooking, setWomenBooking] = useState(false);

  const handleBusSearch = () => {
    console.log('Searching buses...');
    console.log('From:', fromLocation);
    console.log('To:', toLocation);
    console.log('Date:', selectedDate);
    console.log('Women Booking:', womenBooking);

    // Add your search logic here
    // Navigate to bus results screen or make API call
  };

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
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
          fromLocation={fromLocation}
          toLocation={toLocation}
          selectedDate={selectedDate}
          womenBooking={womenBooking}
          onChangeFrom={setFromLocation}
          onChangeTo={setToLocation}
          onDateSelect={setSelectedDate}
          onWomenBookingToggle={setWomenBooking}
          onSearch={handleBusSearch}
          onSwap={handleSwapLocations}
        />
      )}

      {activeTab === 'train' && <Components.TrainTicketCard />}
      {activeTab === 'hotel' && <Components.HotelPromoCard />}
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
