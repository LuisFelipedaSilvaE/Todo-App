import { useDialog } from "@/context/DialogContext";
import { useTheme } from "@/context/ThemeContext";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Configurations() {
  const { theme, colorScheme } = useTheme();
  const { isDialogVisibleEnabled, setIsDialogVisibleEnabled } = useDialog();
  const styles = createStyles(theme, colorScheme);

  const animatedSwitchContent = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(
        isDialogVisibleEnabled
          ? theme.background
          : colorScheme === "dark"
          ? "#ffffff"
          : "#000000",
        {
          duration: 300,
        }
      ),
      transform: [
        {
          translateX: withSpring(isDialogVisibleEnabled ? 30 : 0, {
            duration: 300,
            stiffness: 1500,
            damping: 200,
            mass: 2.5,
          }),
        },
      ],
    }),
    [isDialogVisibleEnabled, colorScheme]
  );
  const animatedSwitchContainer = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(
        isDialogVisibleEnabled ? "#38aaff" : "transparent",
        {
          duration: 300,
        }
      ),
      borderColor: withTiming(
        isDialogVisibleEnabled
          ? "#38aaff"
          : colorScheme === "dark"
          ? "#7f7f7f"
          : "#313131",
        {
          duration: 300,
        }
      ),
    }),
    [isDialogVisibleEnabled]
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <Pressable
        onPress={() =>
          setIsDialogVisibleEnabled(
            (prevIsDialogVisibleEnabled) => !prevIsDialogVisibleEnabled
          )
        }
        style={styles.switchMainContainer}
      >
        <Animated.View
          style={[styles.switchContainer, animatedSwitchContainer]}
        >
          <Animated.View
            style={[styles.switchContent, animatedSwitchContent]}
          ></Animated.View>
        </Animated.View>
        <Text
          style={{
            color: theme.text,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {isDialogVisibleEnabled
            ? "Deletion confirmation: Enabled"
            : "Deletion confirmation: Disabled"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 12.5,
    },
    switchMainContainer: {
      flexDirection: "row",
      gap: 12.5,
      alignItems: "center",
      borderRadius: 5,
    },
    switchContainer: {
      justifyContent: "center",
      width: 57.5,
      height: 25,
      borderRadius: 20,
      paddingVertical: 12.5,
      paddingHorizontal: 2.5,
      borderWidth: 1,
      borderStyle: "solid",
    },
    switchContent: {
      width: 20,
      height: 20,
      borderRadius: "50%",
    },
  });
}
