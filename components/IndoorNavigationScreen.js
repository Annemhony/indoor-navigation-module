import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavBar from './BottomNavBar';

const IndoorNavigationScreen = ({ startingLocation, endingLocation, onNavigateToSearch }) => {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/hallway-1.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Top Search Bar */}
          <View style={styles.searchBarContainer}>
            <Icon name="map-marker-outline" size={24} color="#D32F2F" style={{ marginRight: 8 }} />
            <Text style={styles.searchInputPlaceholder}>Search here</Text>
            <TouchableOpacity><View style={styles.avatarPlaceholder}><Icon name="account" size={18} color="#666" /></View></TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Bottom Information Panel */}
      <View style={styles.bottomPanel}>
        <View style={styles.handleBar} />
        <TouchableOpacity style={styles.closeButton} onPress={onNavigateToSearch}>
            <Icon name="close" size={24} color="#666" />
        </TouchableOpacity>
        <View style={styles.locationInputsContainer}>
          <View style={styles.inputRow}>
            <View style={styles.startDot} />
            <Text style={styles.locationText}>{startingLocation || 'Starting Location'}</Text>
          </View>
          <View style={styles.separatorLine} />
          <View style={styles.inputRow}>
            <View style={styles.endDot} />
            <Text style={styles.locationText}>{endingLocation || 'Ending Location'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, justifyContent: 'space-between' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }, 
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 15,
    marginTop: 50, 
    elevation: 4,
  },
  searchInputPlaceholder: { flex: 1, fontSize: 16, color: '#888' },
  avatarPlaceholder: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center'},
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 150, 
  },
  distanceText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  bottomPanel: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#D32F2F',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  locationInputsContainer: { marginTop: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  locationText: { flex: 1, fontSize: 16, color: '#333' },
  startDot: { width: 9, height: 9, borderRadius: 4.5, backgroundColor: '#D32F2F', marginRight: 15 },
  endDot: { width: 9, height: 9, borderRadius: 4.5, backgroundColor: '#4A90E2', marginRight: 15 },
  separatorLine: { height: 20, width: 1.5, backgroundColor: '#E0E0E0', marginLeft: 4, marginVertical: 4 },
});

export default IndoorNavigationScreen; 
