import { View, StyleSheet, ScrollView } from "react-native";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { LoadingOverlay } from "../../components/ui/LoadingOverlay";
import { Colors, Spacing } from "../../constants/theme";
import { useState } from "react";

export default function TestUI() {
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Buttons Section */}
        <View style={styles.section}>
          <Button onPress={() => {}}>Primary Button</Button>
          <Button variant="secondary" onPress={() => {}}>
            Secondary Button
          </Button>
          <Button variant="danger" onPress={() => {}}>
            Danger Button
          </Button>
          <Button size="sm" onPress={() => {}}>
            Small Button
          </Button>
          <Button size="lg" onPress={() => {}}>
            Large Button
          </Button>
          <Button isLoading onPress={() => {}}>
            Loading Button
          </Button>
          <Button disabled onPress={() => {}}>
            Disabled Button
          </Button>
        </View>

        {/* Inputs Section */}
        <View style={styles.section}>
          <Input label="Regular Input" value={inputValue} onChangeText={setInputValue} />
          <Input label="Password Input" secureTextEntry value={inputValue} onChangeText={setInputValue} />
          <Input
            label="Error Input"
            error="This field is required"
            touched={true}
            value={inputValue}
            onChangeText={setInputValue}
          />
        </View>

        {/* Loading Overlay Test */}
        <Button
          onPress={() => {
            setShowLoadingOverlay(true);
            setTimeout(() => setShowLoadingOverlay(false), 2000);
          }}
        >
          Show Loading Overlay
        </Button>
      </ScrollView>

      {showLoadingOverlay && <LoadingOverlay message="Testing overlay..." />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
  },
  section: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
});
