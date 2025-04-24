import { View, Text, StyleSheet } from "react-native";
import { Colors, FontSizes, Spacing } from "../../constants/theme";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Camillery!</Text>
      <Text style={styles.subtitle}>Your new app is ready to go</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.gray[600],
  },
});
