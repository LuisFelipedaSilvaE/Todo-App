import { Text, View, Pressable, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrashIcon from "@/assets/icons/trash-icon.svg";
import PencilIcon from "@/assets/icons/pencil-icon.svg";
import { useTodos } from "@/context/TodoContext";
import TodoDialogComponent from "@/components/TodoDialogComponent";
import { useCallback, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useDialog } from "@/context/DialogContext";
import { Link, useFocusEffect } from "expo-router";
import Animated, {
  FadeInDown,
  FadeOutRight,
  LinearTransition,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  const { todos, removeTodo, isLoading, markAllAsSeen } = useTodos();
  const { setIsDialogVisible, setDialogState } = useDialog();
  const [targetTodo, setTargetTodo] = useState({
    preUpdateTodoTitle: "",
    preUpdateTodoDeadline: "",
    preUpdateTodoCompleted: false,
  });
  const { colorScheme, theme } = useTheme();
  const styles = createStyles(theme, colorScheme);
  const [isDialogVisibleEnabled, setIsDialogVisibleEnabled] = useState(true);

  const animatedSwitchContent = useAnimatedStyle(
    () => ({
      backgroundColor:
        colorScheme === "dark"
          ? withTiming(isDialogVisibleEnabled ? theme.background : "#ffffff", {
              duration: 175,
            })
          : withTiming(isDialogVisibleEnabled ? theme.background : "#000000", {
              duration: 175,
            }),
      transform: [
        {
          translateX: withSpring(isDialogVisibleEnabled ? 30 : 0, {
            stiffness: 1500,
            damping: 65,
            mass: 2.5,
          }),
        },
      ],
    }),
    [isDialogVisibleEnabled, colorScheme]
  );
  const animatedSwitchContainer = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(
        isDialogVisibleEnabled ? "#38aaff" : "transparent",
        {
          duration: 175,
        }
      ),
      borderColor: withTiming(
        isDialogVisibleEnabled
          ? "#38aaff"
          : colorScheme === "dark"
          ? "#7f7f7f"
          : "#313131",
        {
          duration: 175,
        }
      ),
    }),
    [isDialogVisibleEnabled]
  );

  const getDeadlineStatus = (currentDeadline) => {
    const today = new Date();
    const currentDeadlineToDate = new Date(currentDeadline);
    currentDeadlineToDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (today < currentDeadlineToDate) {
      return (
        <Text style={{ color: "#1dc717", fontWeight: "bold" }}>On Track</Text>
      );
    } else if (today.getTime() === currentDeadlineToDate.getTime()) {
      return (
        <Text style={{ color: "#ec9735", fontWeight: "bold" }}>Due Today</Text>
      );
    } else {
      return (
        <Text style={{ color: "#ec3535", fontWeight: "bold" }}>Overdue</Text>
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      const hasUnseen = todos.some((todo) => !todo.seen);
      if (hasUnseen) {
        markAllAsSeen();
      }
    }, [todos, markAllAsSeen])
  );

  const handleUpdate = (todo) => {
    setTargetTodo({
      ...todo,
      preUpdateTodoTitle: todo.title,
      preUpdateTodoDeadline: todo.deadline,
      preUpdateTodoCompleted: todo.completed,
    });
    setDialogState({
      isAnUpdate: true,
      isADeletion: false,
    });
    setIsDialogVisible(true);
  };

  const handleDeletion = (todo) => {
    if (!isDialogVisibleEnabled) {
      removeTodo(todo.id);
      return;
    }

    setTargetTodo({ ...todo });
    setDialogState({
      isAnUpdate: false,
      isADeletion: true,
    });
    setIsDialogVisible(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
      {!isLoading ? (
        <>
          <Animated.FlatList
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              flex: todos.length > 0 ? 0 : 1,
              justifyContent: "center",
              width: "100%",
              gap: 20,
              maxWidth: 1024,
              marginHorizontal: "auto",
              paddingBottom: 20,
            }}
            ListHeaderComponentStyle={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            data={todos}
            showsVerticalScrollIndicator={false}
            itemLayoutAnimation={LinearTransition.springify()}
            renderItem={({ item }) => (
              <Animated.View
                entering={FadeInDown}
                exiting={FadeOutRight}
                style={styles.todoContainer}
              >
                <Text style={styles.todoTitle}>{item.title}</Text>
                <View style={styles.todoContentContainer}>
                  <View style={styles.statusContainer}>
                    <Text style={styles.currentDeadline}>
                      Current Deadline:{" "}
                      <Text
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {new Date(item.deadline).toLocaleDateString()}
                      </Text>
                    </Text>
                    <Text style={styles.currentDeadline}>
                      Deadline Status: {getDeadlineStatus(item.deadline)}
                    </Text>
                    <Text style={styles.statusMessage}>
                      Todo Status:{" "}
                      <Text
                        style={{
                          color: item.completed ? "#1dc717" : "#ec3535",
                          fontWeight: "bold",
                        }}
                      >
                        {item.completed ? "Completed" : "Incompleted"}
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.actionContainer}>
                    <Pressable
                      onPress={() => handleUpdate(item)}
                      style={{
                        ...styles.todoAction,
                        backgroundColor: "#38aaff",
                        shadowColor: "#38aaff",
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.85,
                      }}
                    >
                      <PencilIcon width={25} height={25} fill={"white"} />
                    </Pressable>
                    <Pressable
                      onPress={() => handleDeletion(item)}
                      style={{
                        ...styles.todoAction,
                        backgroundColor: "#ff5050",
                        shadowColor: "#ff5050",
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.85,
                      }}
                    >
                      <TrashIcon width={25} height={25} fill={"white"} />
                    </Pressable>
                  </View>
                </View>
              </Animated.View>
            )}
            ListHeaderComponent={
              todos.length > 0 ? (
                <Text
                  style={{
                    color: theme.text,
                    fontSize: 18,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Keep track of your plans.
                </Text>
              ) : undefined
            }
            ListEmptyComponent={() => (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <Text style={{ color: theme.text, fontSize: 20 }}>
                  No Todos Found
                </Text>
                <Link
                  style={{
                    ...styles.todoAction,
                    backgroundColor: "#38aaff",
                    shadowColor: "#38aaff",
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.85,
                  }}
                  href={"/(tabs)/form"}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Create a new Todo
                  </Text>
                </Link>
              </View>
            )}
          />
          <TodoDialogComponent
            currentTodo={{ todo: targetTodo, setTodo: setTargetTodo }}
          />
        </>
      ) : undefined}
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      {todos.length > 0 ? (
        <Pressable
          onPress={() =>
            setIsDialogVisibleEnabled(
              (prevIsDialogVisibleEnabled) => !prevIsDialogVisibleEnabled
            )
          }
          style={{
            width: "100%",
            flexDirection: "row",
            gap: 12.5,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            backgroundColor: theme.tint,
            borderRadius: 5,
          }}
        >
          <Animated.View
            style={[styles.switchContainer, animatedSwitchContainer]}
          >
            <Animated.View
              style={[styles.switchContent, animatedSwitchContent]}
            ></Animated.View>
          </Animated.View>
          <Text
            style={{
              color: theme.text,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {isDialogVisibleEnabled
              ? "Disable deletion confirmation"
              : "Enable deletion confirmation"}
          </Text>
        </Pressable>
      ) : undefined}
    </SafeAreaView>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      gap: 20,
      backgroundColor: theme.background,
      paddingHorizontal: Platform.OS === "web" ? 25 : 25,
      paddingVertical: Platform.OS === "web" ? 25 : 10,
    },
    todoContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      borderColor: colorScheme === "dark" ? "#4e4e4e" : "#060606",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 5,
    },
    todoTitle: {
      display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
      width: "100%",
      textAlign: "center",
      color: theme.text,
      borderBottomColor: colorScheme === "dark" ? "#4e4e4e" : "#060606",
      borderBottomWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 5,
      fontWeight: "bold",
    },
    statusContainer: {
      justifyContent: "center",
      flex: 1,
      padding: 15,
      gap: 10,
      borderRightColor: colorScheme === "dark" ? "#4e4e4e" : "#060606",
      borderRightWidth: 1,
    },
    statusMessage: {
      color: theme.text,
      fontSize: 18,
    },
    actionContainer: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      flex: 1,
      gap: 5,
      padding: 15,
    },
    todoContentContainer: {
      flex: 1,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    todoAction: {
      borderRadius: 5,
      padding: 7.5,
      elevation: 15,
    },
    currentDeadline: {
      color: theme.text,
      fontSize: 18,
    },
    closeDialog: {
      alignSelf: "flex-end",
      justifyContent: "center",
      alignItems: "center",
      width: 35,
      backgroundColor: "#ff5050",
      padding: 5,
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
      borderRadius: "50%",
    },
  });
}
