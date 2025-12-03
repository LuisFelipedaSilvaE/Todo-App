import * as NavigationBar from "expo-navigation-bar";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { Platform, useColorScheme } from "react-native";

const userPreferencesContext = createContext();

export function UserPreferencesProvider({ children }) {
  const colorScheme = useColorScheme();
  const [userPreferences, setUserPreferences] = useState({});
  const [isUserPreferencesLoading, setIsUserPreferencesLoading] =
    useState(true);
  const theme = userPreferences.mode === "dark" ? Colors.dark : Colors.light;

  useEffect(() => {
    const updateAndroidNavigationBar = async () => {
      if (Platform.OS === "android") {
        await NavigationBar.setBackgroundColorAsync(
          userPreferences.mode === "dark" ? "#000000" : "#ffffff"
        );

        await NavigationBar.setButtonStyleAsync(
          userPreferences.mode === "dark" ? "light" : "dark"
        );
      }
    };

    updateAndroidNavigationBar();
  }, [userPreferences.mode]);

  useEffect(() => {
    const loadUserPreferences = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@kaji_user_preferences");
        if (jsonValue !== null) {
          setUserPreferences(JSON.parse(jsonValue));
        } else {
          setUserPreferences({
            mode: colorScheme,
            isDeletionConfirmationEnabled: true,
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsUserPreferencesLoading(false);
      }
    };
    loadUserPreferences();
  }, [colorScheme]);

  useEffect(() => {
    const saveUserPreferences = async () => {
      try {
        if (!isUserPreferencesLoading) {
          const jsonValue = JSON.stringify(userPreferences);
          await AsyncStorage.setItem("@kaji_user_preferences", jsonValue);
        }
      } catch (e) {
        console.error(e);
      }
    };
    saveUserPreferences();
  }, [userPreferences, isUserPreferencesLoading]);

  return (
    <userPreferencesContext.Provider
      value={{
        userPreferences,
        setUserPreferences,
        isUserPreferencesLoading,
        setIsUserPreferencesLoading,
        theme,
      }}
    >
      {children}
    </userPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  return useContext(userPreferencesContext);
}
