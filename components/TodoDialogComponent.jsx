import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";
import FormComponent from "./FormComponent";
import { useDialog } from "@/context/DialogContext";
import XIcon from "@/assets/icons/x-icon.svg";
import TrashIcon from "@/assets/icons/trash-icon.svg";
import { useTodos } from "@/context/TodoContext";

export default function TodoDialogComponent({ currentTodo }) {
  const { removeTodo } = useTodos();
  const { isDialogVisible, setIsDialogVisible, dialogState } = useDialog();
  const { colorScheme, theme } = useTheme();
  const styles = createStyles(theme, colorScheme);
  const { todo: targetTodo } = currentTodo;

  const handleTodoDeletion = () => {
    removeTodo(targetTodo.id);
    setIsDialogVisible(false);
  };

  return (
    <Modal
      visible={isDialogVisible}
      animationType="fade"
      onRequestClose={() => setIsDialogVisible(false)}
    >
      <View style={styles.closeDialogContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: 25,
            paddingHorizontal: 10,
            color: theme.text,
            textAlign: "center",
            flex: 1,
          }}
        >
          {dialogState.isAnUpdate ? "Editing: " : undefined}
          <Text style={{ fontWeight: "bold" }}>
            {dialogState.isAnUpdate
              ? targetTodo.preUpdateTodoTitle
              : targetTodo.title}
          </Text>
        </Text>
        <Pressable
          style={styles.closeDialog}
          onPress={() => setIsDialogVisible(false)}
        >
          <XIcon width={25} height={25} fill={"white"} />
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mainContent}>
          {dialogState.isAnUpdate ? (
            <FormComponent isAnUpdate={true} todo={currentTodo} />
          ) : undefined}
          {dialogState.isADeletion ? (
            <>
              <Text style={styles.deleteStateTitle}>
                Are you sure you want to delete {targetTodo.title}?
              </Text>
              <View style={styles.actionContainer}>
                <Pressable
                  onPress={handleTodoDeletion}
                  style={{
                    ...styles.todoAction,
                    backgroundColor: "#ff5050",
                    shadowColor: "#ff5050",
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.85,
                  }}
                >
                  <View style={styles.deleteStateButtonTextContainer}>
                    <Text style={styles.deleteStateButtonText}>
                      Yes, Delete{" "}
                    </Text>
                    <TrashIcon width={25} height={25} fill={"white"} />
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => setIsDialogVisible(false)}
                  style={{
                    ...styles.todoAction,
                    backgroundColor: "#aa65ff",
                    shadowColor: "#aa65ff",
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.85,
                  }}
                >
                  <View style={styles.deleteStateButtonTextContainer}>
                    <Text style={styles.deleteStateButtonText}>No, Cancel</Text>
                    <XIcon width={25} height={25} fill={"white"} />
                  </View>
                </Pressable>
              </View>
            </>
          ) : undefined}
        </View>
      </ScrollView>
    </Modal>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    closeDialogContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colorScheme === "dark" ? "#313131" : "#eaeaea",
    },
    closeDialog: {
      alignSelf: "flex-end",
      justifyContent: "center",
      alignItems: "center",
      width: 35,
      backgroundColor: "#ff5050",
      padding: 5,
    },
    mainContent: {
      width: "100%",
      flex: 1,
      gap: 20,
      padding: 15,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    deleteStateTitle: {
      fontSize: 20,
      color: theme.text,
      textAlign: "center",
    },
    actionContainer: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      width: "100%",
      gap: 40,
    },
    todoAction: {
      borderRadius: 5,
      paddingVertical: 7.5,
      paddingHorizontal: 10,
      elevation: 15,
    },
    deleteStateButtonTextContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    deleteStateButtonText: {
      fontSize: 18,
      color: theme.text,
    },
  });
}
