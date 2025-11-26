import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormComponent from "@/components/FormComponent";
import { useTheme } from "@/context/ThemeContext";

export default function Form({ isAnUpdate }) {
  const { theme } = useTheme();

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
      edges={["top", "left", "right"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={0}
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
