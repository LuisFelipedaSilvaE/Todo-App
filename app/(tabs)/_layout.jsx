import { Tabs } from "expo-router";
import FolderIcon from "@/assets/icons/folder-icon.svg";
import OpenFolderIcon from "@/assets/icons/open-folder-icon.svg";
import ClipBoardPlusIcon from "@/assets/icons/clipboard-plus-icon.svg";
import ClipBoardPlusFillIcon from "@/assets/icons/clipboard-plus-fill-icon.svg";
import { useTodos } from "@/context/TodoContext";
import { useTheme } from "@/context/ThemeContext";
import CustomHeader from "@/components/CustomHeader";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const { todos } = useTodos();
  const { theme } = useTheme();
  const newItemsCount = todos.filter((todo) => !todo.seen).length;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.background,
            borderTopWidth: 0,
          },
          tabBarInactiveBackgroundColor: theme.background,
          tabBarActiveBackgroundColor: theme.tint,
          tabBarInactiveTintColor: theme.tabIconDefault,
          tabBarActiveTintColor: theme.tabIconSelected,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            header: () => <CustomHeader title={"Kaji"} />,
            title: "Todos",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <OpenFolderIcon width={20} height={20} fill={color} />
              ) : (
                <FolderIcon width={20} height={20} fill={color} />
              ),
            tabBarBadge: newItemsCount === 0 ? null : newItemsCount,
            tabBarBadgeStyle: {
              fontSize: 12,
              backgroundColor: "#ec3535",
              lineHeight: 21,
            },
          }}
        />
        <Tabs.Screen
          name="form"
          options={{
            header: () => <CustomHeader title={"Form"} />,
            title: "Form",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <ClipBoardPlusFillIcon width={20} height={20} fill={color} />
              ) : (
                <ClipBoardPlusIcon width={20} height={20} fill={color} />
              ),
          }}
        />
        <Tabs.Screen
          name="configurations"
          options={{
            header: () => <CustomHeader title={"Configurations"} />,
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
      </Tabs>
      <StatusBar style={"auto"} />
    </>
  );
}
