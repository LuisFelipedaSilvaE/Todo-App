import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <ThemeContext.Provider value={{ colorScheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
