import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar = ({ placeholder, style, onFilterPress, value, onChangeText, editable }) => {
  return (
    <View style={[styles.searchBarContainer, style]}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        style={styles.searchInput}
        placeholder={placeholder || "Search here"}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />

      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Icon name="tune-variant" size={24} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileAvatarContainer}>
        <Image
          source={require('../assets/profile-avatar.png')}
          style={styles.profileAvatar}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 15,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    padding: 4,
    marginLeft: 8,
  },
  profileAvatarContainer: {
    marginLeft: 8,
  },
  profileAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default SearchBar;
