import { View, Text, StyleSheet, FlatList, Pressable, Image, Dimensions } from "react-native";
import { Colors, FontSizes, Spacing, Shadows } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

// Temporary data for testing
const TEMP_IMAGES = [
  { id: "1", url: "https://picsum.photos/500/500?random=1", title: "Nature 1" },
  { id: "2", url: "https://picsum.photos/500/500?random=2", title: "Nature 2" },
  { id: "3", url: "https://picsum.photos/500/500?random=3", title: "Nature 3" },
  { id: "4", url: "https://picsum.photos/500/500?random=4", title: "Nature 4" },
];

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 2;
const GRID_SPACING = Spacing.sm;
const ITEM_WIDTH = (width - Spacing.lg * 2 - GRID_SPACING * (COLUMN_COUNT - 1)) / COLUMN_COUNT;

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Gallery</Text>
      <Pressable style={styles.uploadButton} onPress={() => {}}>
        <Ionicons name="add-circle" size={24} color={Colors.secondary} />
        <Text style={styles.uploadText}>Upload</Text>
      </Pressable>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categories}>
      {["All", "Nature", "Architecture", "People"].map((category) => (
        <Pressable
          key={category}
          style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
            {category}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <Pressable style={styles.imageContainer} onPress={() => {}}>
      <Image source={{ uri: item.url }} style={styles.image} />
      <View style={styles.imageTitleContainer}>
        <Text style={styles.imageTitle}>{item.title}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderCategories()}
      <FlatList
        data={TEMP_IMAGES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: "bold",
    color: Colors.primary,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    padding: Spacing.sm,
    borderRadius: 8,
    backgroundColor: Colors.gray[100],
  },
  uploadText: {
    color: Colors.secondary,
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  categories: {
    flexDirection: "row",
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  categoryButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
    backgroundColor: Colors.gray[100],
  },
  selectedCategory: {
    backgroundColor: Colors.secondary,
  },
  categoryText: {
    color: Colors.gray[600],
    fontSize: FontSizes.sm,
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: Colors.white,
  },
  grid: {
    padding: Spacing.lg,
    gap: GRID_SPACING,
  },
  imageContainer: {
    width: ITEM_WIDTH,
    marginBottom: GRID_SPACING,
    marginRight: GRID_SPACING,
    borderRadius: 8,
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },
  image: {
    width: "100%",
    height: ITEM_WIDTH,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  imageTitleContainer: {
    padding: Spacing.sm,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: Colors.white,
  },
  imageTitle: {
    fontSize: FontSizes.sm,
    color: Colors.gray[700],
    fontWeight: "500",
  },
});
