import { useState } from "react";
import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTodos } from "@/context/TodoContext";
import { useTheme } from "@/context/ThemeContext";
import { useDialog } from "@/context/DialogContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import CalendarPlusIcon from "@/assets/icons/calendar-plus-icon.svg";
import CaretIcon from "@/assets/icons/caret-down-icon.svg";
import Animated, {
  FlipInXUp,
  LinearTransition,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedCaretIcon = Animated.createAnimatedComponent(CaretIcon);

export default function FormComponent({ isAnUpdate, todo: { todo, setTodo } }) {
  const { createTodo, updateTodo } = useTodos();
  const { colorScheme, theme } = useTheme();
  const { setIsDialogVisible } = useDialog();
  const [date, setDate] = useState(new Date());
  const [isFormOpen, setIsFormOpen] = useState(!isAnUpdate);
  const [showPicker, setShowPicker] = useState(false);
  const styles = createStyles(theme, colorScheme);
  const isValid =
    todo.title.trim() !== "" && todo.deadline.toString().trim() !== "";
  const isInvalidUpdate =
    todo.preUpdateTodoTitle === todo.title &&
    todo.preUpdateTodoDeadline === todo.deadline &&
    todo.preUpdateTodoCompleted === todo.completed;

  const animatedStyles = useAnimatedStyle(
    () => ({
      opacity: withTiming(isValid ? 1 : 0.25, {
        duration: 500,
      }),
      transform: [
        {
          scale: withSpring(isValid ? 1.15 : 1, {
            duration: 500,
            stiffness: 1000,
            damping: 140,
            mass: 5,
          }),
        },
      ],
    }),
    [isValid]
  );

  const animatedCaretStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotate: withSpring(isFormOpen ? "180deg" : "0deg", { duration: 500 }),
        },
      ],
    }),
    [isFormOpen]
  );

  function toggleDatePicker() {
    Keyboard.dismiss();
    setShowPicker((prevShowPicker) => !prevShowPicker);
  }

  const handleSubmit = () => {
    if (isValid) {
      createTodo({ ...todo, deadline: date.toISOString() });
      setTodo({
        title: "",
        deadline: "",
        completed: false,
      });
    }
  };

  const handleUpdate = () => {
    if (isValid) {
      if (isInvalidUpdate) {
        setIsDialogVisible(false);
        return;
      }

      updateTodo(todo.id, { ...todo });
      setTodo({
        title: "",
        deadline: "",
        completed: false,
      });
      setIsDialogVisible(false);
    }
  };

  function onChangeHandler({ type: eventType }, selectedDate) {
    if (eventType === "set") {
      setDate(selectedDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setTodo((prevTodo) => ({
          ...prevTodo,
          deadline: selectedDate.toISOString(),
        }));
      }
    } else {
      toggleDatePicker();
    }
  }

  return (
    <>
      <View
        style={{
          ...styles.formContainer,
          justifyContent: isAnUpdate ? "center" : "",
          flex: isAnUpdate ? 1 : 0,
        }}
      >
        {isAnUpdate ? (
          <View style={styles.inputRadioMainContainer}>
            <Text style={{ fontSize: 20, color: theme.text }}>
              Mark{" "}
              <Text
                style={{ fontWeight: "bold" }}
              >{`\'${todo.preUpdateTodoTitle}\'`}</Text>{" "}
              as:
            </Text>
            <Pressable
              onPress={() =>
                setTodo((prevTodo) => ({ ...prevTodo, completed: true }))
              }
              style={styles.inputRadioContainer}
            >
              <View style={styles.inputRadio}>
                <View
                  style={{
                    ...styles.inputRadioInnerContent,
                    backgroundColor: todo.completed ? "#38aaff" : "transparent",
                  }}
                ></View>
              </View>
              <Text style={{ fontSize: 18, color: theme.text }}>Completed</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                setTodo((prevTodo) => ({ ...prevTodo, completed: false }))
              }
              style={styles.inputRadioContainer}
            >
              <View style={styles.inputRadio}>
                <View
                  style={{
                    ...styles.inputRadioInnerContent,
                    backgroundColor: !todo.completed
                      ? "#38aaff"
                      : "transparent",
                  }}
                ></View>
              </View>
              <Text style={{ fontSize: 18, color: theme.text }}>
                Incompleted
              </Text>
            </Pressable>
          </View>
        ) : undefined}
        <Animated.View
          layout={LinearTransition.springify().duration(500)}
          collapsable={false}
          style={{
            ...styles.accordion,
            borderWidth: isAnUpdate ? 1 : 0,
          }}
        >
          {isAnUpdate ? (
            <Pressable
              onPress={() => setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen)}
              style={{
                ...styles.accordionToggler,
                borderBottomWidth: isFormOpen ? 1 : 0,
              }}
            >
              <AnimatedCaretIcon
                width={25}
                height={25}
                style={[animatedCaretStyles]}
                fill={colorScheme === "dark" ? "#4e4e4e" : "#060606"}
              />
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 18,
                  color: theme.text,
                }}
              >
                Edit Details
              </Text>
            </Pressable>
          ) : undefined}
          {isFormOpen ? (
            <Animated.View
              entering={isAnUpdate ? FlipInXUp.duration(500) : undefined}
              style={{
                ...styles.todoMainDataContainer,
                paddingHorizontal: isAnUpdate ? 30 : 0,
                paddingVertical: isAnUpdate ? 15 : 0,
              }}
            >
              <View style={styles.inputGroup}>
                <Text style={styles.inputGroupLabel}>Todo Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Add a new Todo title"
                  placeholderTextColor="gray"
                  value={todo.title}
                  onChangeText={(text) =>
                    setTodo((prevTodo) => ({ ...prevTodo, title: text }))
                  }
                />
              </View>
              {/* {!showPicker ? ( */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputGroupLabel}>Todo Deadline</Text>
                <View style={styles.deadlineContainer}>
                  <Pressable style={{ flex: 1 }} onPress={toggleDatePicker}>
                    <TextInput
                      style={{ ...styles.input, flex: 1 }}
                      placeholder="dd/mm/YYYY"
                      placeholderTextColor="gray"
                      value={
                        todo.deadline !== ""
                          ? new Date(todo.deadline).toLocaleDateString()
                          : todo.deadline
                      }
                      onChangeText={(text) =>
                        setTodo((prevTodo) => ({
                          ...prevTodo,
                          deadline: text,
                        }))
                      }
                      // editable={false}
                    />
                  </Pressable>
                  <Pressable
                    style={{
                      ...styles.addButton,
                      backgroundColor: "#aa65ff",
                      shadowColor: "#aa65ff",
                      shadowOffset: { width: 2, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.85,
                    }}
                    onPress={toggleDatePicker}
                  >
                    <CalendarPlusIcon width={25} height={25} fill={"white"} />
                  </Pressable>
                </View>
              </View>
              {/* ) : undefined} */}
              {showPicker ? (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChangeHandler}
                  minimumDate={new Date()}
                />
              ) : undefined}
            </Animated.View>
          ) : undefined}
        </Animated.View>
        <AnimatedPressable
          onPress={isAnUpdate ? handleUpdate : handleSubmit}
          disabled={!isValid}
          style={[
            {
              ...styles.addButton,
              minWidth: 75,
              backgroundColor: colorScheme === "dark" ? "#4e4e4e" : "#060606",
              shadowColor: colorScheme === "dark" ? "#4e4e4e" : "#060606",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.85,
            },
            animatedStyles,
          ]}
        >
          <Text style={styles.formButtonText}>
            {isAnUpdate ? "Update" : "Add"}
          </Text>
        </AnimatedPressable>
      </View>
    </>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    formContainer: {
      width: "100%",
      gap: 25,
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    todoMainDataContainer: {
      width: "100%",
      gap: 7.5,
      justifyContent: "center",
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    deadlineContainer: {
      flexDirection: "row",
      gap: 10,
    },
    input: {
      width: "100%",
      borderColor: colorScheme === "dark" ? "#4e4e4e" : "#060606",
      borderStyle: "solid",
      fontSize: 18,
      borderWidth: 1,
      borderRadius: 5,
      color: theme.text,
      padding: 10,
      minWidth: 0,
    },
    addButton: {
      padding: 10,
      borderRadius: 5,
      alignSelf: "center",
      elevation: 10,
    },
    formButtonText: {
      color: "white",
      fontSize: 18,
      textAlign: "center",
    },
    inputRadioMainContainer: {
      gap: 12.5,
      alignItems: "flex-start",
    },
    inputRadioContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 7.5,
      marginLeft: 10,
    },
    inputRadio: {
      width: 20,
      height: 20,
      padding: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      backgroundColor: "transparent",
      borderColor: colorScheme === "dark" ? "#7f7f7f" : "#313131",
      borderWidth: 1,
      borderStyle: "solid",
    },
    inputRadioInnerContent: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      overflow: "hidden",
    },
    accordionToggler: {
      width: "100%",
      flexDirection: "row",
      gap: 7.5,
      paddingVertical: 2.5,
      paddingHorizontal: 7.5,
      justifyContent: "space-between",
      alignItems: "center",
      borderColor: colorScheme === "dark" ? "#4e4e4e" : "#060606",
      borderStyle: "solid",
    },
    accordion: {
      borderColor: colorScheme === "dark" ? "#4e4e4e" : "#060606",
      borderStyle: "solid",
      borderRadius: 5,
      overflow: "hidden",
    },
    inputGroup: {
      gap: 5,
    },
    inputGroupLabel: {
      color: theme.text,
    },
  });
}
