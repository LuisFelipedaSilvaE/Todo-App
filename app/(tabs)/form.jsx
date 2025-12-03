import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormComponent from "@/components/FormComponent";
import { useUserPreferences } from "@/context/UserPreferencesContext";

export default function Form({ isAnUpdate }) {
  const { theme } = useUserPreferences();

  const [todo, setTodo] = useState({
    title: "",
    deadline: "",
    completed: false,
    seen: false,
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
      edges={["left", "right"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={50}
        style={{
          flex: 1,
          gap: 17.5,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: Platform.OS === "web" ? 25 : 25,
          paddingVertical: Platform.OS === "web" ? 25 : 10,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            color: theme.text,
            textAlign: "center",
            width: "100%",
          }}
        >
          Plan your goals.
        </Text>
        <FormComponent
          isAnUpdate={false}
          todo={{ todo, setTodo }}
          setTodo={setTodo}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
