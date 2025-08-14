import { Variant } from '../components/OfferCard';

export interface OfferData {
  id: string;
  titleText: string;
  description: string;
  image: string | null;
  couponCode: string;
  validDate: string; // Could be ISO or display format
  variant: Variant;
}

const OFFERS_DATA: OfferData[] = [
  {
    id: '1',
    titleText: 'Bus Deals',
    description: 'Save 20% on buses',
    image: null,
    couponCode: 'BUS20',
    validDate: '2025-08-21',
    variant: 'Bus',
  },
  {
    id: '2',
    titleText: 'Holiday Offer',
    description: 'Up to 30% off',
    image: null,
    couponCode: 'HOLI30',
    validDate: '2025-09-01',
    variant: 'Hotel',
  },
  {
    id: '3',
    titleText: 'Travel Fest',
    description: 'Buy 1 Get 1',
    image: null,
    couponCode: 'TRAVELB1G1',
    validDate: '2025-08-25',
    variant: 'Train',
  },
  {
    id: '4',
    titleText: 'Weekend Trips',
    description: 'Flat ₹500 off',
    image: null,
    couponCode: 'WEEKEND500',
    validDate: '2025-08-31',
    variant: 'Bus',
  },
  {
    id: '5',
    titleText: 'Goa Special',
    description: 'Discounted trips',
    image: null,
    couponCode: 'GOA50',
    validDate: '2025-09-05',
    variant: 'Hotel',
  },
  {
    id: '6',
    titleText: 'Summer Sale',
    description: 'Cool offers ahead',
    image: null,
    couponCode: 'SUMMER15',
    validDate: '2025-09-10',
    variant: 'Bus',
  },
  {
    id: '7',
    titleText: 'Monsoon Rides',
    description: 'Free snacks onboard',
    image: null,
    couponCode: 'MONSOONFREE',
    validDate: '2025-08-28',
    variant: 'Train',
  },
  {
    id: '8',
    titleText: 'Festive Rides',
    description: 'Celebrate on the go',
    image: null,
    couponCode: 'FESTIVE25',
    validDate: '2025-09-15',
    variant: 'Bus',
  },
];

export default OFFERS_DATA;
