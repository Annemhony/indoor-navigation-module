// components/NotificationScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavBar from './BottomNavBar';

const NotificationCard = ({ item, isExpanded, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Icon name="information-outline" size={24} color="#D32F2F" />
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>
      {isExpanded && (
        <View style={styles.cardBody}>
          <Text style={styles.cardText}>{item.details}</Text>
          {item.buttonText && (
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>{item.buttonText}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const NotificationScreen = ({ onNavigateToMap, onNavigateToBookmarks }) => {
  const [expandedId, setExpandedId] = useState(null);

  const notifications = {
    today: [
      {
        id: '1',
        title: 'Announcement: Room AMS 104 Under Renovation',
        date: '07 - June - 2025',
        details: 'Dear All,\n\nWe would like to inform you that room AMS 104 is currently undergoing renovation. We appreciate your understanding and patience during this time as we work to improve our facilities.\n\nFor your convenience, a temporary alternate route has been predetermined to ensure minimal disruption. Please follow the signs to navigate around the renovation area.\n\nThank you for your cooperation!',
        buttonText: 'Alternate Route'
      }
    ],
    earlier: [
      {
        id: '2',
        title: 'Announcement: Room JH 26 Change Location',
        date: '25 - February - 2025',
        details: 'Details for Room JH 26 location change will be provided here.'
      }
    ]
  };

  const handlePress = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Announcements</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity><Icon name="magnify" size={24} color="#333" /></TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15 }}><View style={styles.avatarPlaceholder}><Icon name="account" size={18} color="#666" /></View></TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Today</Text>
        {notifications.today.map(item => (
          <NotificationCard
            key={item.id}
            item={item}
            isExpanded={expandedId === item.id}
            onPress={() => handlePress(item.id)}
          />
        ))}

        <Text style={styles.sectionTitle}>Earlier this year</Text>
        {notifications.earlier.map(item => (
          <NotificationCard
            key={item.id}
            item={item}
            isExpanded={expandedId === item.id}
            onPress={() => handlePress(item.id)}
          />
        ))}
      </ScrollView>

      <BottomNavBar
        activeScreen="notifications"
        onCompassPress={onNavigateToMap}
        onBookmarksPress={onNavigateToBookmarks}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F6F8' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, backgroundColor: '#FFF' },
    headerTitle: { fontSize: 24, fontWeight: 'bold' },
    headerIcons: { flexDirection: 'row', alignItems: 'center' },
    avatarPlaceholder: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' },
    scrollContainer: { paddingHorizontal: 16, paddingTop: 20 },
    sectionTitle: { fontSize: 16, fontWeight: '500', color: '#666', marginBottom: 10 },
    cardContainer: { backgroundColor: '#FFF', borderRadius: 8, marginBottom: 15, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, borderWidth: 1, borderColor: '#D32F2F' },
    cardHeader: { flexDirection: 'row', alignItems: 'center', padding: 15 },
    cardTitle: { flex: 1, fontSize: 16, fontWeight: '600', marginLeft: 10 },
    cardDate: { fontSize: 12, color: '#666' },
    cardBody: { paddingHorizontal: 15, paddingBottom: 15, borderTopWidth: 1, borderTopColor: '#EEE' },
    cardText: { fontSize: 14, color: '#333', lineHeight: 20 },
    actionButton: { backgroundColor: '#D32F2F', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 20, alignSelf: 'center', marginTop: 15 },
    actionButtonText: { color: '#FFF', fontWeight: 'bold' }
});

export default NotificationScreen;

