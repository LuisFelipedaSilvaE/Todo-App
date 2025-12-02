import { useTheme } from "@/context/ThemeContext";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GearIcon from "@/assets/icons/gear-icon.svg";
import ArrowLeftIcon from "@/assets/icons/arrow-left-icon.svg";
import { Link } from "expo-router";

export default function CustomHeader({ title }) {
  const { theme, colorScheme } = useTheme();
  const styles = createStyles(theme, colorScheme);
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        justifyContent: title !== "Configurations" ? "space-between" : "",
        gap: title !== "Configurations" ? 0 : 15,
      }}
      edges={["top"]}
    >
      {title === "Configurations" ? (
        <Link href={"/(tabs)"}>
          <ArrowLeftIcon
            width={30}
            height={30}
            fill={colorScheme === "dark" ? "#ffffff" : "#000000 "}
          />
        </Link>
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
        {title !== "Configurations" ? (
          <Link href={"/(tabs)/configurations"}>
            <GearIcon
              width={25}
              height={25}
              fill={colorScheme === "dark" ? "#ffffff" : "#000000 "}
            />
          </Link>
        ) : undefined}
      </View>
    </SafeAreaView>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.background,
      padding: 12.5,
    },
    title: {
      fontSize: 25,
      color: theme.text,
    },
  });
}
