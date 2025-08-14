import React, { useRef, useState, useMemo, useCallback } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Components from '../../components';
import Icons from '../../constants/svgPath';
import {
  moderateScale,
  moderateWidth,
  scale,
} from '../../constants/responsive';
import { ImagePath } from '../../constants/imagePath';
import Colors from '../../constants/color';
import DatepickerModel from '../../components/DatepickerModel';
import { FlashList } from '@shopify/flash-list';
import styles from './style';
import DummyData from '../../config';
import Fonts from '../../constants/fontPath';

const { width: screenWidth } = Dimensions.get('window');

// Types
type TabType = 'bus' | 'train' | 'hotel';
type CategoryType = 'All' | 'Bus' | 'Train' | 'Hotel';

interface BaseSearchData {
  fromLocation: string;
  toLocation: string;
  date: Date;
}

interface BusSearchData extends BaseSearchData {
  womenBooking: boolean;
}

interface TrainSearchData extends BaseSearchData {
  otpBooking: boolean;
}

interface HotelSearchData {
  location: string;
  checkInDate: Date;
  checkOutDate: Date;
  guests: {
    rooms: number;
    adults: number;
    children: number;
  };
}

interface DatePickerState {
  visible: boolean;
  type: 'bus' | 'train' | 'checkIn' | 'checkOut';
}

// Custom hooks for state management
const useSearchStates = () => {
  const [busData, setBusData] = useState<BusSearchData>({
    fromLocation: '',
    toLocation: '',
    date: new Date(),
    womenBooking: false,
  });

  const [trainData, setTrainData] = useState<TrainSearchData>({
    fromLocation: '',
    toLocation: '',
    date: new Date(),
    otpBooking: false,
  });

  const [hotelData, setHotelData] = useState<HotelSearchData>({
    location: '',
    checkInDate: new Date(),
    checkOutDate: (() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    })(),
    guests: {
      rooms: 1,
      adults: 2,
      children: 0,
    },
  });

  return {
    busData,
    setBusData,
    trainData,
    setTrainData,
    hotelData,
    setHotelData,
  };
};

const useDatePicker = () => {
  const [datePickerState, setDatePickerState] = useState<DatePickerState>({
    visible: false,
    type: 'bus',
  });

  const showDatePicker = useCallback((type: DatePickerState['type']) => {
    setDatePickerState({ visible: true, type });
  }, []);

  const hideDatePicker = useCallback(() => {
    setDatePickerState(prev => ({ ...prev, visible: false }));
  }, []);

  return {
    datePickerState,
    showDatePicker,
    hideDatePicker,
  };
};

// Constants
const TAB_CONFIG = [
  {
    id: 'bus' as const,
    label: 'Bus Tickets',
    icon: ({ active }: { active: boolean }) => (
      <Image
        source={ImagePath.redbusLogo}
        style={{
          height: moderateScale(46),
          width: moderateScale(46),
          tintColor: active ? Colors.redbusPrimary : Colors.redbusDisabled,
        }}
      />
    ),
  },
  {
    id: 'train' as const,
    label: 'Train Tickets',
    icon: ({ active }: { active: boolean }) => (
      <Icons.Train
        fill={active ? Colors.redbusPrimary : Colors.redbusDisabled}
        height={moderateScale(46)}
        width={moderateScale(46)}
      />
    ),
  },
  {
    id: 'hotel' as const,
    label: 'Hotels',
    icon: ({ active }: { active: boolean }) => (
      <Icons.Hotel
        fill={active ? Colors.redbusPrimary : Colors.redbusDisabled}
        height={moderateScale(46)}
        width={moderateScale(46)}
      />
    ),
  },
];

const CATEGORIES: CategoryType[] = ['All', 'Bus', 'Train', 'Hotel'];

// Calculate card width and spacing for proper pagination
const CARD_MARGIN = moderateScale(12);
const CARD_WIDTH = screenWidth - CARD_MARGIN * 2; // Full width minus margins

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('bus');
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');

  const flashListRef = useRef<FlashList<any>>(null);

  const {
    busData,
    setBusData,
    trainData,
    setTrainData,
    hotelData,
    setHotelData,
  } = useSearchStates();
  const { datePickerState, showDatePicker, hideDatePicker } = useDatePicker();

  // Utility functions
  const getDisplayDate = useCallback((date: Date): string => {
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
  }, []);

  // Generic handlers
  const handleSearch = useCallback(
    (type: TabType) => {
      const searchData = {
        bus: busData,
        train: trainData,
        hotel: hotelData,
      }[type];

      console.log(`Searching ${type}...`, searchData);
    },
    [busData, trainData, hotelData],
  );

  const handleSwapLocations = useCallback(
    (type: 'bus' | 'train') => {
      if (type === 'bus') {
        setBusData(prev => ({
          ...prev,
          fromLocation: prev.toLocation,
          toLocation: prev.fromLocation,
        }));
      } else {
        setTrainData(prev => ({
          ...prev,
          fromLocation: prev.toLocation,
          toLocation: prev.fromLocation,
        }));
      }
    },
    [setBusData, setTrainData],
  );

  const handleDateSelect = useCallback(
    (date: Date) => {
      const { type } = datePickerState;

      switch (type) {
        case 'bus':
          setBusData(prev => ({ ...prev, date }));
          break;
        case 'train':
          setTrainData(prev => ({ ...prev, date }));
          break;
        case 'checkIn':
          setHotelData(prev => ({ ...prev, checkInDate: date }));
          break;
        case 'checkOut':
          setHotelData(prev => ({ ...prev, checkOutDate: date }));
          break;
      }
      hideDatePicker();
    },
    [
      datePickerState.type,
      setBusData,
      setTrainData,
      setHotelData,
      hideDatePicker,
    ],
  );

  const handleQuickDateSelect = useCallback(
    (type: TabType, option: string) => {
      const newDate = new Date();

      if (option === 'tomorrow') newDate.setDate(newDate.getDate() + 1);
      if (option === 'day after') newDate.setDate(newDate.getDate() + 2);

      if (type === 'bus') {
        setBusData(prev => ({ ...prev, date: newDate }));
      } else if (type === 'train') {
        setTrainData(prev => ({ ...prev, date: newDate }));
      }
    },
    [setBusData, setTrainData],
  );

  // Enhanced FlashList handlers for proper pagination
  const viewabilityConfig = useMemo(
    () => ({
      viewAreaCoveragePercentThreshold: 50,
      minimumViewTime: 100,
    }),
    [],
  );

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveOfferIndex(viewableItems[0].index);
    }
  }).current;

  // Handle scroll end to snap to nearest card
  const onMomentumScrollEnd = useCallback((event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / CARD_WIDTH);
    setActiveOfferIndex(index);
  }, []);

  // Dot press handler for direct navigation
  const handleDotPress = useCallback((index: number) => {
    setActiveOfferIndex(index);
    flashListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, []);

  // Render helpers
  const renderTabButton = useCallback(
    (tab: (typeof TAB_CONFIG)[0]) => (
      <Components.TabButton
        key={tab.id}
        label={tab.label}
        customIcon={<tab.icon active={activeTab === tab.id} />}
        active={activeTab === tab.id}
        onPress={() => setActiveTab(tab.id)}
      />
    ),
    [activeTab],
  );

  const renderCategoryButton = useCallback(
    (category: CategoryType) => {
      const isActive = selectedCategory === category;
      return (
        <TouchableOpacity
          key={category}
          onPress={() => setSelectedCategory(category)}
          style={{
            borderWidth: 1,
            borderColor: isActive
              ? Colors.redbusBackground
              : Colors.redbusDisabled,
            borderRadius: moderateScale(8),
            paddingVertical: moderateScale(4),
            paddingHorizontal: moderateScale(8),
            width: moderateWidth(16),
            backgroundColor: isActive
              ? Colors.redbusAccent
              : Colors.redbusBackground,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: scale(14),
              color: isActive
                ? Colors.redbusTextPrimary
                : Colors.redbusTextSecondary,
              fontFamily: isActive ? Fonts.bold : Fonts.primary,
              textAlign: 'center',
            }}
          >
            {category}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedCategory],
  );

  const renderOfferCard = useCallback(
    ({ item }: { item: (typeof DummyData.OFFERS_DATA)[number] }) => (
      <View
        style={{
          width: CARD_WIDTH,
          marginHorizontal: CARD_MARGIN,
        }}
      >
        <Components.OfferCard
          variant={item.variant}
          description={item.description}
          validDate={item.validDate}
          couponCode={item.couponCode}
        />
      </View>
    ),
    [],
  );

  const renderDots = useCallback(
    () => (
      <View style={styles.dotsContainer}>
        {DummyData.OFFERS_DATA.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDotPress(index)}
            style={[
              styles.dot,
              index === activeOfferIndex && styles.activeDot,
              {
                // Enhanced dot styling for better UX
                padding: moderateScale(4), // Increase touch area
              },
            ]}
          />
        ))}
      </View>
    ),
    [activeOfferIndex, handleDotPress],
  );

  const getCurrentDateForPicker = useCallback(() => {
    switch (datePickerState.type) {
      case 'bus':
        return busData.date;
      case 'train':
        return trainData.date;
      case 'checkIn':
        return hotelData.checkInDate;
      case 'checkOut':
        return hotelData.checkOutDate;
      default:
        return new Date();
    }
  }, [
    datePickerState.type,
    busData.date,
    trainData.date,
    hotelData.checkInDate,
    hotelData.checkOutDate,
  ]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Segmented Control */}
      <View style={styles.tabContainer}>{TAB_CONFIG.map(renderTabButton)}</View>

      {/* Content Switcher */}
      {activeTab === 'bus' && (
        <>
          <Components.BusTicketCard
            fromLocation={busData.fromLocation}
            toLocation={busData.toLocation}
            selectedDate={getDisplayDate(busData.date)}
            selectedDateObject={busData.date}
            womenBooking={busData.womenBooking}
            onChangeFrom={value =>
              setBusData(prev => ({ ...prev, fromLocation: value }))
            }
            onChangeTo={value =>
              setBusData(prev => ({ ...prev, toLocation: value }))
            }
            onDateSelect={() => showDatePicker('bus')}
            onQuickDateSelect={option => handleQuickDateSelect('bus', option)}
            onWomenBookingToggle={value =>
              setBusData(prev => ({ ...prev, womenBooking: value }))
            }
            onSearch={() => handleSearch('bus')}
            onSwap={() => handleSwapLocations('bus')}
          />

          {/* Categories */}
          <View
            style={{
              flexDirection: 'row',
              gap: moderateScale(8),
              marginBottom: moderateScale(12),
              paddingHorizontal: moderateScale(12),
            }}
          >
            {CATEGORIES.map(renderCategoryButton)}
          </View>

          {/* Enhanced Offers with Proper Pagination */}
          <FlashList
            ref={flashListRef}
            data={DummyData.OFFERS_DATA}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            renderItem={renderOfferCard}
            onMomentumScrollEnd={onMomentumScrollEnd}
            snapToInterval={CARD_WIDTH + CARD_MARGIN * 2} // Full card width including margins
            snapToAlignment="start" // Snap to start of each card
            decelerationRate="fast" // Quick snapping
            pagingEnabled={false} // Disable default paging for custom snap behavior
            getItemLayout={(data: any, index: number) => ({
              length: CARD_WIDTH + CARD_MARGIN * 2,
              offset: (CARD_WIDTH + CARD_MARGIN * 2) * index,
              index,
            })}
            estimatedItemSize={CARD_WIDTH + CARD_MARGIN * 2}
          />
          {renderDots()}
        </>
      )}

      {activeTab === 'train' && (
        <Components.TrainTicketCard
          fromLocation={trainData.fromLocation}
          toLocation={trainData.toLocation}
          selectedDate={getDisplayDate(trainData.date)}
          selectedDateObject={trainData.date}
          otpBooking={trainData.otpBooking}
          onChangeFrom={value =>
            setTrainData(prev => ({ ...prev, fromLocation: value }))
          }
          onChangeTo={value =>
            setTrainData(prev => ({ ...prev, toLocation: value }))
          }
          onDateSelect={() => showDatePicker('train')}
          onQuickDateSelect={option => handleQuickDateSelect('train', option)}
          onotpBookingToggle={value =>
            setTrainData(prev => ({ ...prev, otpBooking: value }))
          }
          onSearch={() => handleSearch('train')}
          onSwap={() => handleSwapLocations('train')}
        />
      )}

      {activeTab === 'hotel' && (
        <Components.HotelPromoCard
          hotelLocation={hotelData.location}
          checkInDate={getDisplayDate(hotelData.checkInDate)}
          checkOutDate={getDisplayDate(hotelData.checkOutDate)}
          checkInDateObject={hotelData.checkInDate}
          checkOutDateObject={hotelData.checkOutDate}
          guests={hotelData.guests}
          onLocationChange={value =>
            setHotelData(prev => ({ ...prev, location: value }))
          }
          onCheckInDateSelect={() => showDatePicker('checkIn')}
          onCheckOutDateSelect={() => showDatePicker('checkOut')}
          onGuestsSelect={guests => setHotelData(prev => ({ ...prev, guests }))}
          onSearch={() => handleSearch('hotel')}
        />
      )}

      {/* Single Date Picker */}
      <DatepickerModel
        visible={datePickerState.visible}
        onClose={hideDatePicker}
        onDateSelect={handleDateSelect}
        initialDate={getCurrentDateForPicker()}
      />
    </ScrollView>
  );
};

export default Home;
