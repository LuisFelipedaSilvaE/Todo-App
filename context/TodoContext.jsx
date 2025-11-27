import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoContext = createContext({});

export function TodoProvider({ children }) {
  // const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@todo_app_todos");
        if (jsonValue !== null) {
          setTodos(JSON.parse(jsonValue));
        } else {
          setTodos([]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        if (!isLoading) {
          const jsonValue = JSON.stringify(todos);
          await AsyncStorage.setItem("@todo_app_todos", jsonValue);
        }
      } catch (e) {
        console.error(e);
      }
    };
    saveTodos();
  }, [todos, isLoading]);

  function createTodo(todo) {
    const newId = todos.length > 0 ? todos[0].id + 1 : 1;
    const newTodo = { id: newId, ...todo };
    setTodos([newTodo, ...todos]);
  }

  function removeTodo(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function updateTodo(id, todoToUpdate) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        return todo.id === id ? { ...todoToUpdate } : todo;
      });
    });
  }

  function markAllAsSeen() {
    setTodos((prevTodos) => prevTodos.map((todo) => ({ ...todo, seen: true })));
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        isLoading,
        createTodo,
        removeTodo,
        updateTodo,
        markAllAsSeen,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
