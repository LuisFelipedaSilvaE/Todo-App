import CustomHeader from "@/components/CustomHeader";
import { DialogProvider } from "@/context/DialogContext";
import { TodoProvider } from "@/context/TodoContext";
import { UserPreferencesProvider } from "@/context/UserPreferencesContext";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <DialogProvider>
        <UserPreferencesProvider>
          <TodoProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="configurations"
                options={{
                  freezeOnBlur: true,
                  header: () => (
                    <CustomHeader
                      title={"Configurations"}
                      showBackButton={true}
                      showConfigurationButton={false}
                    />
                  ),
                }}
              />
            </Stack>
          </TodoProvider>
        </UserPreferencesProvider>
      </DialogProvider>
    </SafeAreaProvider>
  );
}
