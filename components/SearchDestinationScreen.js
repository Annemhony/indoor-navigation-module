// components/SearchDestinationScreen.js
import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavBar from './BottomNavBar';
import PlaceCard from './PlaceCard';

const placesToVisit = [
  {
    id: 'place-library',
    title: 'UNC Library',
    description: 'The University of Nueva Caceres Library offers a wide range of resources and services.',
    imageSource: require('../assets/library.png'),
    category: 'Building',
  },
  {
    id: 'place-sports-palace',
    title: 'UNC Sports Palace',
    description: 'State-of-the-art sports facilities for students and events.',
    imageSource: require('../assets/sports-palace.png'),
    category: 'Building',
  },
];

// MODIFICATION: Added 'onNavigateToIndoor' prop to accept the navigation function
const SearchDestinationScreen = ({ currentActiveScreen, onNavigateToMap, onNavigateToBookmarks, onNavigateToNotifications, bookmarkedItemIds, onToggleBookmark, onNavigateToIndoor }) => {
  // MODIFICATION: Added state to manage the text inputs
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.pullDownBarContainer}><View style={styles.pullDownBar} /></View>
        <View style={styles.searchBarContainer}>
          <Icon name="map-marker-outline" size={24} color="#D32F2F" style={{ marginRight: 8 }} />
          <TextInput style={styles.searchInput} placeholder={"Search destination"} placeholderTextColor="#888" />
          <TouchableOpacity><Icon name="tune-variant" size={24} color="#666" style={{ marginRight: 8 }} /></TouchableOpacity>
          <TouchableOpacity><View style={styles.avatarPlaceholder}><Icon name="account" size={18} color="#666" /></View></TouchableOpacity>
        </View>
        <View style={styles.locationInputsContainer}>
          {/* MODIFICATION: Connected TextInput to state */}
          <View style={styles.inputRow}>
            <View style={styles.startDot} />
            <TextInput 
              style={styles.locationInput} 
              placeholder="Starting Location" 
              placeholderTextColor="#BDBDBD"
              value={startLocation}
              onChangeText={setStartLocation}
            />
          </View>
          <View style={styles.separatorLine} />
          {/* MODIFICATION: Connected TextInput to state */}
          <View style={styles.inputRow}>
            <View style={styles.endDot} />
            <TextInput 
              style={styles.locationInput} 
              placeholder="Ending Location" 
              placeholderTextColor="#BDBDBD"
              value={endLocation}
              onChangeText={setEndLocation}
            />
          </View>
        </View>
      </View>

      {/* Scrollable Section */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <MapView style={styles.smallMap} initialRegion={{ latitude: 13.6237, longitude: 123.1843, latitudeDelta: 0.015, longitudeDelta: 0.015 }} scrollEnabled={false} zoomEnabled={false} pitchEnabled={false} rotateEnabled={false} customMapStyle={Platform.OS === 'android' ? mapStyle : undefined} />
        <View style={styles.timeAndStartContainer}>
          <Text style={styles.estimatedTime}>Estimated Time: 5mins</Text>
          {/* MODIFICATION: Added onPress handler to the button */}
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => onNavigateToIndoor(startLocation, endLocation)}
          >
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.placesHeader}>Places you might want to visit</Text>

        {placesToVisit.map(place => (
          <PlaceCard
            key={place.id}
            imageSource={place.imageSource}
            title={place.title}
            description={place.description}
            isBookmarked={bookmarkedItemIds.has(place.id)}
            onBookmarkPress={() => onToggleBookmark(place)}
          />
        ))}
      </ScrollView>

      {/* Bottom Nav Bar */}
      <BottomNavBar
        activeScreen={currentActiveScreen}
        onCompassPress={() => {
          if (onNavigateToMap) { onNavigateToMap(); }
        }}
        onBookmarksPress={onNavigateToBookmarks}
        onNotificationsPress={onNavigateToNotifications}
      />
    </View>
  );
};


const mapStyle = [ { "featureType": "all", "elementType": "labels.text.fill", "stylers": [ { "color": "#7c93a3" }, { "lightness": "-10" } ] }, { "featureType": "administrative.country", "elementType": "geometry", "stylers": [ { "visibility": "on" } ] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [ { "color": "#a0a4a5" } ] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [ { "color": "#62838e" } ] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [ { "color": "#eff0f1" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [ { "color": "#dde1e3" } ] }, { "featureType": "poi", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#a6cbe3" } ] } ];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  topSection: {
    backgroundColor: '#fff',
    paddingBottom: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pullDownBarContainer: { alignItems: 'center', paddingTop: 8, paddingBottom: 4, },
  pullDownBar: { width: 40, height: 5, backgroundColor: '#D32F2F', borderRadius: 3, },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginTop: 10,
  },
  searchInput: { flex: 1, fontSize: 16, color: '#333', marginLeft: 8 },
  avatarPlaceholder: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center',},
  locationInputsContainer: { marginHorizontal: 30, marginTop: 18, },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F9FA', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 14, },
  locationInput: { flex: 1, fontSize: 15, color: '#333', },
  startDot: { width: 9, height: 9, borderRadius: 4.5, backgroundColor: '#D32F2F', marginRight: 15, },
  endDot: { width: 9, height: 9, borderRadius: 4.5, backgroundColor: '#4A90E2', marginRight: 15, },
  separatorLine: { height: 20, width: 1.5, backgroundColor: '#E0E0E0', marginLeft: 4, marginVertical: 4, },
  scrollContainer: { paddingBottom: 20, },
  smallMap: { height: 180, marginHorizontal: 18, marginTop: 20, borderRadius: 12, },
  timeAndStartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 18, marginTop: 18, padding: 15, backgroundColor: '#fff', borderRadius: 10, },
  estimatedTime: { fontSize: 14, color: '#555', fontWeight: '500', },
  startButton: { backgroundColor: '#D32F2F', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 20, },
  startButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold', },
  placesHeader: { fontSize: 18, fontWeight: '600', color: '#333', marginHorizontal: 18, marginTop: 24, marginBottom: 12, },
});

export default SearchDestinationScreen;