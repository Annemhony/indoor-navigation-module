// components/BottomNavBar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomNavBar = ({
  activeScreen,
  onCompassPress,
  onBookmarksPress,
  onListPress,
  onNotificationsPress
}) => {
  const iconSize = 28;
  const activeColor = '#D32F2F'; // Red for active state
  const inactiveColor = '#757575'; // Grey for inactive state

  // The compass icon is active when the user is in the search flow.
  const isCompassActive = activeScreen === 'search';
  const isBookmarksActive = activeScreen === 'bookmarks';
  const isListActive = activeScreen === 'list';
  const isNotificationsActive = activeScreen === 'notifications';

  return (
    <View style={styles.navBar}>
      {/* Compass Icon */}
      <TouchableOpacity style={styles.navItem} onPress={onCompassPress}>
        <View style={[styles.iconWrapper, isCompassActive && styles.activeIconBackground]}>
          <Icon
            name={isCompassActive ? "compass" : "compass-outline"}
            size={iconSize}
            color={isCompassActive ? activeColor : inactiveColor}
          />
        </View>
      </TouchableOpacity>

      {/* Bookmarks Icon */}
      <TouchableOpacity style={styles.navItem} onPress={onBookmarksPress}>
        <View style={[styles.iconWrapper, isBookmarksActive && styles.activeIconBackground]}>
          <Icon
            name={isBookmarksActive ? "bookmark" : "bookmark-outline"}
            size={iconSize}
            color={isBookmarksActive ? activeColor : inactiveColor}
          />
        </View>
      </TouchableOpacity>

      {/* List Icon */}
      <TouchableOpacity style={styles.navItem} onPress={onListPress}>
        <View style={[styles.iconWrapper, isListActive && styles.activeIconBackground]}>
          <Icon
            name={"format-list-bulleted"}
            size={iconSize}
            color={isListActive ? activeColor : inactiveColor}
          />
        </View>
      </TouchableOpacity>

      {/* Notifications Icon */}
      <TouchableOpacity style={styles.navItem} onPress={onNotificationsPress}>
        <View style={[styles.iconWrapper, isNotificationsActive && styles.activeIconBackground]}>
          <Icon
            name={isNotificationsActive ? "bell" : "bell-outline"}
            size={iconSize}
            color={isNotificationsActive ? activeColor : inactiveColor}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  activeIconBackground: {
    backgroundColor: '#FFEBEE',
  },
});

export default BottomNavBar;