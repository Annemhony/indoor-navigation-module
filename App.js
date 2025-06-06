// App.js
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Platform, Alert } from 'react-native';
import MapScreen from './components/MapScreen';
import SearchDestinationScreen from './components/SearchDestinationScreen';
import SavedScreen from './components/SavedScreen';
import NotificationScreen from './components/NotificationScreen';
import IndoorNavigationScreen from './components/IndoorNavigationScreen'; // MODIFICATION: Import the new screen

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('map');
  const [bookmarkedItemIds, setBookmarkedItemIds] = useState(new Set());
  // MODIFICATION: New state to hold data for the indoor route
  const [indoorRoute, setIndoorRoute] = useState({ start: '', end: '' });

  const navigateTo = (screenName) => setCurrentScreen(screenName);

  // MODIFICATION: New function to handle navigating to the indoor screen
  const navigateToIndoor = (startLocation, endLocation) => {
    setIndoorRoute({ start: startLocation, end: endLocation });
    setCurrentScreen('indoor');
  };

  const toggleBookmark = (item) => {
    setBookmarkedItemIds(prevIds => {
      const newIds = new Set(prevIds);
      if (newIds.has(item.id)) {
        newIds.delete(item.id);
      } else {
        newIds.add(item.id);
        Alert.alert("Location Saved", `${item.title || item.name} has been added to your saved locations.`);
      }
      console.log('Updated Bookmarked IDs:', Array.from(newIds));
      return newIds;
    });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'search':
        return (
          <SearchDestinationScreen
            currentActiveScreen={currentScreen}
            onNavigateToMap={() => navigateTo('map')}
            onNavigateToBookmarks={() => navigateTo('bookmarks')}
            onNavigateToNotifications={() => navigateTo('notifications')}
            bookmarkedItemIds={bookmarkedItemIds}
            onToggleBookmark={toggleBookmark}
            // MODIFICATION: Pass the new navigation function
            onNavigateToIndoor={navigateToIndoor}
          />
        );
      case 'bookmarks':
        return (
          <SavedScreen
            currentActiveScreen={currentScreen}
            onNavigateToMap={() => navigateTo('map')}
            onNavigateToBookmarks={() => navigateTo('bookmarks')}
            onNavigateToNotifications={() => navigateTo('notifications')}
            bookmarkedItemIds={bookmarkedItemIds}
            onToggleBookmark={toggleBookmark}
          />
        );
      case 'notifications':
        return (
          <NotificationScreen
            currentActiveScreen={currentScreen}
            onNavigateToMap={() => navigateTo('map')}
            onNavigateToBookmarks={() => navigateTo('bookmarks')}
            onNavigateToNotifications={() => navigateTo('notifications')}
          />
        );
      // MODIFICATION: Add case for the new indoor navigation screen
      case 'indoor':
        return (
          <IndoorNavigationScreen
            startingLocation={indoorRoute.start}
            endingLocation={indoorRoute.end}
            // This button will take the user from the indoor view back to the search screen
            onNavigateToSearch={() => navigateTo('search')}
          />
        );
      case 'map':
      default:
        return (
          <MapScreen
            currentActiveScreen={currentScreen}
            onNavigateToSearch={() => navigateTo('search')}
            onNavigateToBookmarks={() => navigateTo('bookmarks')}
            onNavigateToNotifications={() => navigateTo('notifications')}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? '#FFFFFF' : '#F4F6F8',
  },
});