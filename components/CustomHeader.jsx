import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GearIcon from "@/assets/icons/gear-icon.svg";
import ArrowLeftIcon from "@/assets/icons/arrow-left-icon.svg";
import { Link, useRouter } from "expo-router";
import { useUserPreferences } from "@/context/UserPreferencesContext";

export default function CustomHeader({
  title,
  showBackButton,
  showConfigurationButton,
}) {
  const {
    userPreferences: { mode },
    theme,
  } = useUserPreferences();
  const styles = createStyles(theme, mode);
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        justifyContent: showConfigurationButton ? "space-between" : undefined,
        gap: showBackButton ? 15 : 0,
      }}
      edges={["top"]}
    >
      {showBackButton ? (
        <Pressable onPress={() => router.back()}>
          <ArrowLeftIcon
            width={25}
            height={25}
            fill={mode === "dark" ? "#ffffff" : "#000000"}
          />
        </Pressable>
      ) : undefined}

      <Text
        style={{
          ...styles.title,
          fontWeight: title === "Kaji" ? "900" : "light",
        }}
      >
        {title}
      </Text>
      <View>
        {showConfigurationButton ? (
          <Link href={"/configurations"}>
            <GearIcon
              width={25}
              height={25}
              fill={mode === "dark" ? "#ffffff" : "#000000"}
            />
          </Link>
        ) : undefined}
      </View>
    </SafeAreaView>
  );
}

function createStyles(theme, mode) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.background,
      padding: 12.5,
      borderWidth: 0,
    },
    title: {
      fontSize: 25,
      color: theme.text,
    },
  });
}
