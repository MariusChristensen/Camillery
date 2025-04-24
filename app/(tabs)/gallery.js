import { View, Text, StyleSheet, FlatList, Pressable, Image, Dimensions, Alert } from "react-native";
import { Colors, FontSizes, Spacing, Shadows } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

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
  const [images, setImages] = useState(TEMP_IMAGES);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission Required", "Please grant permission to access your photos to upload images.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const selectedImageUri = result.assets[0].uri;

        // Create a unique filename for the image
        const filename = `${Date.now()}.jpg`;
        const imagesDir = `${FileSystem.documentDirectory}images`;
        const destination = `${imagesDir}/${filename}`;

        try {
          // Ensure the images directory exists
          await FileSystem.makeDirectoryAsync(imagesDir, {
            intermediates: true,
          }).catch((e) => {
            // Directory might already exist, that's okay
            if (e.code !== "ERR_DIRECTORY_EXISTS") {
              throw e;
            }
          });

          // Copy the image to permanent storage
          await FileSystem.copyAsync({
            from: selectedImageUri,
            to: destination,
          });

          console.log("Image saved successfully to:", destination);

          const newImage = {
            id: Date.now().toString(),
            url: destination,
            title: "New Upload",
          };

          setImages((prevImages) => [newImage, ...prevImages]);

          // Only navigate after successful save
          router.push({
            pathname: "/image-detail",
            params: {
              imageUrl: destination,
              title: "New Upload",
            },
          });
        } catch (error) {
          console.error("Error saving image:", error);
          Alert.alert("Error", "Failed to save image. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Gallery</Text>
      <Pressable style={styles.uploadButton} onPress={pickImage} android_ripple={{ color: Colors.gray[200] }}>
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
    <Pressable
      style={styles.imageContainer}
      onPress={() => {
        if (item.url) {
          console.log("Navigating to image detail with:", { imageUrl: item.url, title: item.title });
          router.push({
            pathname: "/image-detail",
            params: {
              imageUrl: item.url,
              title: item.title,
            },
          });
        }
      }}
    >
      <Image
        source={{ uri: item.url }}
        style={styles.image}
        onError={(error) => console.error("Error loading image in gallery:", error.nativeEvent.error)}
      />
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
        data={images}
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
