// components/MapScreen.js
import React, { useState, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from './SearchBar';
import BottomNavBar from './BottomNavBar';

const jhRooms = [];
for (let i = 1; i <= 37; i++) {
  // MODIFICATION: Added category to jhRooms
  jhRooms.push({ id: `jh${i}`, name: `JH ${i}`, category: 'Rooms' });
}

const locations = [
  { id: 'unc', title: 'University of Nueva Caceres', coords: { latitude: 13.625061876399252, longitude: 123.18268645544201 }, iconType: 'school', color: '#4CAF50', category: 'Building' }, // MODIFICATION: Added category
  { id: 'new', title: 'New Building', coords: { latitude: 13.624293303076922, longitude: 123.18242258718435 }, iconType: 'location-pin', color: '#F44336', category: 'Building' }, // MODIFICATION: Added category
  { id: 'jh', title: 'JH Building', coords: { latitude: 13.62554569647968, longitude: 123.18219399760679 }, iconType: 'location-pin', color: '#F44336', rooms: jhRooms, category: 'Building' }, // MODIFICATION: Added category
  { id: 'ams', title: 'AMS Building', coords: { latitude: 13.62526344250962, longitude: 123.18347069626839 }, iconType: 'location-pin', color: '#F44336', category: 'Building' }, // MODIFICATION: Added category
  { id: 'en', title: 'EN Building', coords: { latitude: 13.624632416827735, longitude: 123.18147455725087 }, iconType: 'location-pin', color: '#F44336', category: 'Building' }, // MODIFICATION: Added category
  { id: 'dhs', title: 'DHS Building', coords: { latitude: 13.624235542676756, longitude: 123.18343412111322 }, iconType: 'location-pin', color: '#F44336', category: 'Building' }, // MODIFICATION: Added category
];

// MODIFICATION: Added onNavigateToBookmarks to props
const MapScreen = ({ currentActiveScreen, onNavigateToSearch, onNavigateToBookmarks, onNavigateToNotifications  }) => {
  const mapRef = useRef(null);
  const [buildingQuery, setBuildingQuery] = useState('');
  const [roomQuery, setRoomQuery] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);

  const {
    selectedBuilding,
    filteredRooms,
    filteredLocations,
    filterableBuildings
  } = useMemo(() => {
    const selectedBuilding = locations.find(loc => loc.title === buildingQuery);
    const filteredRooms = selectedBuilding?.rooms?.filter(room =>
      room.name.toLowerCase().includes(roomQuery.toLowerCase())
    ) || [];
    const filteredLocations = buildingQuery
      ? locations.filter(loc => loc.title === buildingQuery)
      : locations;
    const filterableBuildings = locations.filter(location => location.id !== 'unc');
    return { selectedBuilding, filteredRooms, filteredLocations, filterableBuildings };
  }, [buildingQuery, roomQuery]);

  const handleBuildingSelect = (buildingTitle) => {
    setBuildingQuery(prevQuery => prevQuery === buildingTitle ? '' : buildingTitle);
    setRoomQuery('');
    setFilterVisible(false);
  };

  const handleRoomSelect = (roomName) => {
    setRoomQuery(roomName);
    console.log(`Selected Room: ${roomName} in ${buildingQuery}`);
  };
  
  const toggleFilter = () => {
    setFilterVisible(!isFilterVisible);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{ latitude: 13.6237, longitude: 123.1843, latitudeDelta: 0.005, longitudeDelta: 0.005 }}
        mapType="standard"
        customMapStyle={Platform.OS === 'android' ? mapStyle : undefined}
        onPress={() => setFilterVisible(false)}
      >
        {filteredLocations.map(loc => (
          <Marker
            key={loc.id}
            coordinate={loc.coords}
            title={loc.title}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            {loc.id === 'unc' ? (
              <View style={styles.customBuildingMarker}>
                <Icon name={'school'} size={28} color="#fff" style={styles.buildingIcon} />
                <Text style={styles.markerText}>{loc.title}</Text>
              </View>
            ) : (
              <Icon name="location-pin" size={35} color={loc.color} />
            )}
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchBarAbsolute}>
        <SearchBar
          placeholder={selectedBuilding ? `Search room in ${selectedBuilding.title}...` : 'Select a building via filter'}
          onFilterPress={toggleFilter}
          value={roomQuery}
          onChangeText={setRoomQuery}
          editable={!!selectedBuilding}
        />
      </View>

      {isFilterVisible && (
        <View style={styles.popoverContainer}>
          <View style={styles.popoverTriangle} />
          <FlatList
            style={styles.popoverList}
            data={filterableBuildings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.popoverItem}
                onPress={() => handleBuildingSelect(item.title)}
              >
                {buildingQuery === item.title && (
                  <View style={styles.itemColorBar} />
                )}
                <Icon name={item.iconType} size={24} color="#555" style={styles.itemIcon} />
                <Text style={styles.itemText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {selectedBuilding && roomQuery.length > 0 && (
         <View style={[styles.popoverContainer, {top: 115}]}>
            <FlatList
              style={styles.popoverList}
              data={filteredRooms}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.popoverItem} onPress={() => handleRoomSelect(item.name)}>
                  <Icon name="meeting-room" size={24} color="#555" style={styles.itemIcon}/>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={styles.noResultsText}>No matching rooms found.</Text>}
            />
         </View>
      )}

      {/* MODIFICATION: Pass the new onNavigateToBookmarks prop */}
      <BottomNavBar
        activeScreen={currentActiveScreen}
        onCompassPress={onNavigateToSearch}
        onBookmarksPress={onNavigateToBookmarks} 
        onNotificationsPress={onNavigateToNotifications}
      />
    </View>
  );
};

const mapStyle = [ { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#7c93a3" }, { "lightness": "-10" }] }, { "featureType": "administrative.country", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [{ "color": "#a0a4a5" }] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [{ "color": "#62838e" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "color": "#eff0f1" }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#dde1e3" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#a6cbe3" }] } ];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  map: { flex: 1 },
  searchBarAbsolute: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1
  },
  customBuildingMarker: { backgroundColor: 'rgba(0, 80, 120, 0.8)', paddingVertical: 5, paddingHorizontal: 8, borderRadius: 15, alignItems: 'center', justifyContent: 'center', borderColor: '#fff', borderWidth: 1, flexDirection: 'row' },
  buildingIcon: { marginRight: 4 },
  markerText: { color: '#fff', fontWeight: 'bold', fontSize: 10 },
  popoverContainer: {
    position: 'absolute',
    top: 110,
    left: 20,
    right: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    zIndex: 1,
  },
  popoverTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFF',
    alignSelf: 'flex-start',
    marginLeft: 45,
  },
  popoverList: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginTop: -1,
    maxHeight: 250,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  popoverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemColorBar: {
    width: 5,
    height: '100%',
    marginRight: 15,
    borderRadius: 3,
    backgroundColor: '#D32F2F', 
  },
  itemIcon: {
    marginRight: 15,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  noResultsText: {
    padding: 20,
    textAlign: 'center',
    color: '#666',
  },
});

export default MapScreen;