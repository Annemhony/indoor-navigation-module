// components/SavedScreen.js
import React, { useState, useMemo } from 'react';
// MODIFICATION: Import 'Alert'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import BottomNavBar from './BottomNavBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// --- MASTER DATA SOURCE ---
const jhRooms = Array.from({ length: 37 }, (_, i) => {
  const roomNumber = i + 1;
  let floor = 'General';
  if (roomNumber >= 1 && roomNumber <= 10) floor = '1st Floor';
  else if (roomNumber >= 11 && roomNumber <= 20) floor = '2nd Floor';
  else if (roomNumber >= 21 && roomNumber <= 30) floor = '3rd Floor';
  return { id: `jh${roomNumber}`, name: `JH ${roomNumber}`, category: 'Rooms', floor: floor, description: `Located in JH Building, ${floor}` };
});

const ALL_LOCATIONS = {
  'place-library': { id: 'place-library', title: 'UNC Library', description: 'The University of Nueva Caceres Library...', imageSource: require('../assets/library.png'), category: 'Building' },
  'place-sports-palace': { id: 'place-sports-palace', title: 'UNC Sports Palace', description: 'State-of-the-art sports facilities...', imageSource: require('../assets/sports-palace.png'), category: 'Building' },
  'unc': { id: 'unc', title: 'University of Nueva Caceres', category: 'Building', description: 'Main university campus.' },
  'jh': { id: 'jh', title: 'JH Building', category: 'Building', description: '', rooms: jhRooms },
  'ams': { id: 'ams', title: 'AMS Building', category: 'Building', description: 'College of Arts and Sciences' },
  'en': { id: 'en', title: 'EN Building', category: 'Building', description: 'College of Engineering' },
  'dhs': { id: 'dhs', title: 'DHS Building', category: 'Building', description: 'Department of High School' },
};
const ALL_ITEMS_ARRAY = Object.values(ALL_LOCATIONS).flatMap(item => item.rooms ? [item, ...item.rooms] : [item]);


// --- COMPONENTS ---
// MODIFICATION: Changed prop name to 'onUnbookmarkPress' for clarity
const SavedItemCard = ({ item, onUnbookmarkPress }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.title || item.name}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
      </View>
      {/* MODIFICATION: The onPress handler uses the new prop name */}
      <TouchableOpacity onPress={onUnbookmarkPress}>
        <Icon name={"bookmark"} size={24} color={"#D32F2F"} />
      </TouchableOpacity>
    </View>
  );
};


const SavedScreen = ({ currentActiveScreen, onNavigateToMap, onNavigateToBookmarks, onNavigateToNotifications, bookmarkedItemIds, onToggleBookmark }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [showFloorFilter, setShowFloorFilter] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const displayedItems = useMemo(() => {
    let items;
    if (activeFilter) {
      items = ALL_ITEMS_ARRAY.filter(item => item.category === activeFilter);
      if (activeFilter === 'Rooms' && selectedFloor) {
        items = ALL_ITEMS_ARRAY.filter(item => item.floor === selectedFloor);
      }
    } else {
      items = Array.from(bookmarkedItemIds).map(id => ALL_ITEMS_ARRAY.find(item => item.id === id)).filter(Boolean);
    }
    if (searchQuery) {
      items = items.filter(item => (item.title || item.name).toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return items;
  }, [bookmarkedItemIds, activeFilter, selectedFloor, searchQuery]);

  const filterOptions = ['Building', 'Rooms', 'Offices', 'Food Stalls'];
  const floorOptions = ['1st Floor', '2nd Floor', '3rd Floor'];

  const handleFilterPress = (filterName) => {
    setSearchQuery('');
    if (filterName === 'Rooms') {
      setShowFloorFilter(prev => !prev);
      setActiveFilter(activeFilter === 'Rooms' && showFloorFilter ? null : 'Rooms');
    } else {
      setShowFloorFilter(false);
      setSelectedFloor(null);
      setActiveFilter(activeFilter === filterName ? null : filterName);
    }
  };

  const handleFloorSelect = (floor) => {
    setSelectedFloor(prev => prev === floor ? null : floor);
    setShowFloorFilter(false);
  };
  
  // MODIFICATION: Added this function to show the confirmation alert
  const handleUnbookmarkConfirm = (item) => {
    Alert.alert(
      "Remove Saved Location",
      `Are you sure you want to remove ${item.title || item.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", onPress: () => onToggleBookmark(item), style: "destructive" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Icon name="map-marker-radius" size={26} color="#D32F2F" style={styles.headerIcon} />
        <TextInput style={styles.headerSearchInput} placeholder="Search in Saved Locations" placeholderTextColor="#999" value={searchQuery} onChangeText={setSearchQuery} />
        <TouchableOpacity><Icon name="magnify" size={24} color="#666" style={{ marginRight: 10 }} /></TouchableOpacity>
        <TouchableOpacity><View style={styles.headerAvatarPlaceholder}><Icon name="account" size={18} color="#666" /></View></TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterButtonsContainer}>
        {filterOptions.map((filter) => (
          <TouchableOpacity key={filter} style={[styles.filterButton, activeFilter === filter && styles.filterButtonActive]} onPress={() => handleFilterPress(filter)}>
            <Text style={[styles.filterButtonText, activeFilter === filter && styles.filterButtonTextActive]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {showFloorFilter && (
        <View style={styles.floorFilterPopoverContainer}>
          <View style={styles.popoverTriangle} />
          <View style={styles.popoverList}>
            {floorOptions.map((floor) => (
              <TouchableOpacity key={floor} style={styles.popoverItem} onPress={() => handleFloorSelect(floor)}>
                {selectedFloor === floor && (<View style={styles.itemColorBar} />)}
                <Text style={[styles.itemText, selectedFloor === floor && styles.itemTextActive]}>{floor}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <ScrollView style={styles.savedItemsScroll}>
        {displayedItems.length > 0 ? (
          displayedItems.map(item => (
            <SavedItemCard
              key={item.id}
              item={item}
              // MODIFICATION: Pass the new confirmation handler to the card
              onUnbookmarkPress={() => handleUnbookmarkConfirm(item)}
            />
          ))
        ) : (
          <Text style={styles.noSavedItemsText}>
            {activeFilter || selectedFloor || searchQuery ? "No matching locations found." : "No saved locations yet."}
          </Text>
        )}
      </ScrollView>

      <BottomNavBar
        activeScreen="bookmarks"
        onCompassPress={onNavigateToMap}
        onBookmarksPress={() => {}}
        onNotificationsPress={onNavigateToNotifications}
      />
    </View>
  );
};

// Paste your full styles object here
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F8' },
  headerSection: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingTop: 45, paddingBottom: 10, backgroundColor: '#FFF' },
  headerIcon: { marginRight: 8 },
  headerSearchInput: { flex: 1, fontSize: 18, fontWeight: 'bold', color: '#333' },
  headerAvatarPlaceholder: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' },
  filterButtonsContainer: { paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  filterButton: { backgroundColor: '#F0F0F0', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 15, marginRight: 10, },
  filterButtonActive: { backgroundColor: '#D32F2F' },
  filterButtonText: { color: '#333', fontWeight: '500' },
  filterButtonTextActive: { color: '#FFFFFF' },
  floorFilterPopoverContainer: { position: 'absolute', top: 160, left: 100, alignItems: 'flex-start', zIndex: 10, },
  popoverTriangle: { width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderLeftWidth: 10, borderRightWidth: 10, borderBottomWidth: 10, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#FFF', marginLeft: 10, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, },
  popoverList: { width: 150, backgroundColor: '#FFF', borderRadius: 12, marginTop: -1, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 4, },
  popoverItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  itemColorBar: { width: 4, height: '100%', position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: '#D32F2F', },
  itemText: { fontSize: 16, color: '#333', marginLeft: 10 },
  itemTextActive: { fontWeight: 'bold', color: '#D32F2F' },
  savedItemsScroll: { flex: 1, paddingTop: 10, backgroundColor: '#F4F6F8' },
  cardContainer: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, marginHorizontal: 18, marginBottom: 12, flexDirection: 'row', alignItems: 'center', borderStyle: 'dotted', borderColor: '#CCC', borderWidth: 1.5, },
  imagePlaceholder: { width: 70, height: 70, borderRadius: 8, marginRight: 15, backgroundColor: '#E9E9E9' },
  textContainer: { flex: 1, marginRight: 10 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  cardDescription: { fontSize: 14, color: '#757575', marginTop: 4 },
  noSavedItemsText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#757575' },
});

export default SavedScreen;