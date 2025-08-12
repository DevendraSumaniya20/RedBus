import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HotelPromoCard: React.FC = () => {
  return (
    <View style={styles.promoCard}>
      {/* Header */}
      <View style={styles.promoHeader}>
        <Text style={styles.promoTitle}>Book hotels from ₹399</Text>
        <Text style={styles.promoSubtitle}>with early check in</Text>
      </View>

      {/* Hotel Images */}
      <View style={styles.hotelImagesContainer}>
        <View style={styles.hotelImage}>
          <View style={styles.hotelImagePlaceholder} />
        </View>
        <View style={styles.hotelImage}>
          <View style={styles.hotelImagePlaceholder} />
        </View>
        <View style={styles.hotelImage}>
          <View style={styles.hotelImagePlaceholder} />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.promoFooter}>
        <Text style={styles.promoText}>
          🏨 redBus Hotels Mega Sale: Up to 60% off on 20k+ properties. Ends on
          16th Aug
        </Text>
        <Text style={styles.sponsoredText}>Sponsored</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  promoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  promoHeader: { marginBottom: 16 },
  promoTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  promoSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  hotelImagesContainer: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  hotelImage: { flex: 1, height: 80, borderRadius: 8, overflow: 'hidden' },
  hotelImagePlaceholder: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  promoFooter: { alignItems: 'flex-end' },
  promoText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginBottom: 4,
  },
  sponsoredText: { fontSize: 10, color: '#999' },
});

export default HotelPromoCard;
