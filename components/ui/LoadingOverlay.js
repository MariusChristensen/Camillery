import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { Colors, FontSizes } from "../../constants/theme";

export function LoadingOverlay({ message = "Loading..." }) {
  return (
    <View style={styles.container}>
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  loadingBox: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    gap: 12,
  },
  message: {
    color: Colors.gray[700],
    fontSize: FontSizes.md,
    marginTop: 8,
  },
});
