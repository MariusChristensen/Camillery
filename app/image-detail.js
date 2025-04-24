import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Alert } from "react-native";
import { Colors, FontSizes, Spacing, Shadows } from "../constants/theme";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

export default function ImageDetail() {
  const { imageUrl, title } = useLocalSearchParams();
  const [imageError, setImageError] = useState(false);

  console.log("Image Detail received params:", { imageUrl, title });

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
        onError={(error) => {
          console.error("Error loading image in detail view:", error.nativeEvent.error);
          setImageError(true);
        }}
      />
      {imageError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load image</Text>
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.metadataContainer}>
          <Text style={styles.metadata}>Uploaded by: User Name</Text>
          <Text style={styles.metadata}>Date: {new Date().toLocaleDateString()}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: width,
    height: height * 0.6,
    backgroundColor: Colors.gray[100],
  },
  errorContainer: {
    padding: Spacing.md,
    backgroundColor: Colors.gray[100],
    alignItems: "center",
  },
  errorText: {
    color: Colors.gray[600],
    fontSize: FontSizes.md,
  },
  infoContainer: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  metadataContainer: {
    gap: Spacing.sm,
  },
  metadata: {
    fontSize: FontSizes.sm,
    color: Colors.gray[600],
  },
});
