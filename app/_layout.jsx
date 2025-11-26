import { DialogProvider } from "@/context/DialogContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { TodoProvider } from "@/context/TodoContext";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <DialogProvider>
        <ThemeProvider>
          <TodoProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </TodoProvider>
        </ThemeProvider>
      </DialogProvider>
    </SafeAreaProvider>
  );
}
