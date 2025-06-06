// components/PlaceCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// MODIFICATION: Added isBookmarked and onBookmarkPress to props
const PlaceCard = ({ imageSource, title, description, isBookmarked, onBookmarkPress }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={imageSource} style={styles.cardImage} />

      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText} numberOfLines={2}>
            {description}
          </Text>
        </View>
        {/* MODIFICATION: Dynamic icon based on isBookmarked and onPress handler */}
        <TouchableOpacity style={styles.bookmarkButton} onPress={onBookmarkPress}>
          <Icon
            name={isBookmarked ? "bookmark" : "bookmark-outline"} // Changes icon based on state
            size={24}
            color={isBookmarked ? "#D32F2F" : "#BDBDBD"} // Red if bookmarked, grey if not
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 18,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 15,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  descriptionText: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  bookmarkButton: {
    paddingTop: 2,
  },
});

export default PlaceCard;