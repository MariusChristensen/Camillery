import { StyleSheet, Pressable, Text, ActivityIndicator } from "react-native";
import { Colors, FontSizes } from "../../constants/theme";

export function Button({
  children,
  onPress,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  style,
}) {
  const getBackgroundColor = () => {
    if (disabled) return Colors.gray[300];
    switch (variant) {
      case "primary":
        return Colors.primary;
      case "secondary":
        return Colors.white;
      case "danger":
        return Colors.error;
      default:
        return Colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return Colors.gray[500];
    switch (variant) {
      case "primary":
        return Colors.white;
      case "secondary":
        return Colors.primary;
      case "danger":
        return Colors.white;
      default:
        return Colors.white;
    }
  };

  const getPadding = () => {
    switch (size) {
      case "sm":
        return 8;
      case "lg":
        return 16;
      default:
        return 12;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          padding: getPadding(),
          opacity: pressed ? 0.8 : 1,
        },
        variant === "secondary" && styles.secondaryButton,
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>{children}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  text: {
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
});
