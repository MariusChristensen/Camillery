import { StyleSheet, View, TextInput, Text, Animated } from "react-native";
import { Colors, BorderRadius, FontSizes, Spacing } from "../../constants/theme";
import { useState, useRef, useEffect } from "react";

export function Input({ label, error, touched, style, containerStyle, ...props }) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabelPosition = useRef(new Animated.Value(0)).current;
  const animatedLabelSize = useRef(new Animated.Value(FontSizes.md)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedLabelPosition, {
        toValue: isFocused || props.value ? -25 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(animatedLabelSize, {
        toValue: isFocused || props.value ? FontSizes.sm : FontSizes.md,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isFocused, props.value]);

  const handleFocus = () => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.Text
        style={[
          styles.label,
          {
            transform: [{ translateY: animatedLabelPosition }],
            fontSize: animatedLabelSize,
            color: error && touched ? Colors.error : isFocused ? Colors.primary : Colors.gray[600],
          },
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        style={[styles.input, isFocused && styles.focusedInput, error && touched && styles.errorInput, style]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor={Colors.gray[400]}
        {...props}
      />
      {error && touched && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  input: {
    backgroundColor: Colors.gray[100],
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSizes.md,
    borderWidth: 1,
    borderColor: Colors.gray[300],
  },
  focusedInput: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  errorInput: {
    borderColor: Colors.error,
  },
  label: {
    position: "absolute",
    left: Spacing.md,
    top: Spacing.md,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSizes.sm,
    marginTop: Spacing.xs,
    marginLeft: Spacing.sm,
  },
});
