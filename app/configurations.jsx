import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import MoonStarsIcon from "@/assets/icons/moon-stars-icon.svg";
import SunIcon from "@/assets/icons/sun-icon.svg";
import { useUserPreferences } from "@/context/UserPreferencesContext";

export default function Configurations() {
  const {
    userPreferences: { mode, isDeletionConfirmationEnabled },
    setUserPreferences,
    theme,
  } = useUserPreferences();
  const styles = createStyles(theme, mode);

  const animatedSwitchContent = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(
        isDeletionConfirmationEnabled
          ? theme.background
          : mode === "dark"
          ? "#ffffff"
          : "#000000",
        {
          duration: 300,
        }
      ),
      transform: [
        {
          translateX: withSpring(isDeletionConfirmationEnabled ? 30 : 0, {
            duration: 300,
            stiffness: 1500,
            damping: 200,
            mass: 2.5,
          }),
        },
      ],
    }),
    [isDeletionConfirmationEnabled, mode]
  );
  const animatedSwitchContainer = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(
        isDeletionConfirmationEnabled ? "#38aaff" : "#38aaff00",
        {
          duration: 300,
        }
      ),
      borderColor: withTiming(
        isDeletionConfirmationEnabled
          ? "#38aaff"
          : mode === "dark"
          ? "#7f7f7f"
          : "#313131",
        {
          duration: 300,
        }
      ),
    }),
    [isDeletionConfirmationEnabled, mode]
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <Pressable
        onPress={() =>
          setUserPreferences((prevUserPreferences) => ({
            ...prevUserPreferences,
            isDeletionConfirmationEnabled: !isDeletionConfirmationEnabled,
          }))
        }
        style={styles.contentContainer}
      >
        <Animated.View
          style={[styles.switchContainer, animatedSwitchContainer]}
        >
          <Animated.View
            style={[styles.switchContent, animatedSwitchContent]}
          ></Animated.View>
        </Animated.View>
        <Text style={styles.text}>
          {isDeletionConfirmationEnabled
            ? "Deletion confirmation: Enabled"
            : "Deletion confirmation: Disabled"}
        </Text>
      </Pressable>
      <Pressable
        onPress={() =>
          setUserPreferences((prevUserPreferences) => ({
            ...prevUserPreferences,
            mode: mode === "dark" ? "light" : "dark",
          }))
        }
        style={styles.contentContainer}
      >
        <View style={styles.themeIcon}>
          {mode === "dark" ? (
            <MoonStarsIcon width={25} height={25} fill={"#000000"} />
          ) : (
            <SunIcon width={25} height={25} fill={"#ffffff"} />
          )}
        </View>
        <Text style={styles.text}>Theme: {mode}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

function createStyles(theme, mode) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 12.5,
      gap: 17.5,
    },
    contentContainer: {
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
      borderRadius: 10,
    },
    text: {
      color: theme.text,
      fontSize: 18,
    },
    themeIcon: {
      borderWidth: 1,
      borderColor: mode === "dark" ? "#ffffff" : "#000000",
      backgroundColor: mode === "dark" ? "#ffffff" : "#000000",
      borderStyle: "solid",
      borderRadius: 6.25,
      padding: 5,
    },
  });
}
