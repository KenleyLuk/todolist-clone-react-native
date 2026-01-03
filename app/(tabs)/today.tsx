import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Animated as RNAnimated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  label: string;
  color?: string;
}

export default function TodayScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      text: "Buy groceries",
      completed: false,
      date: "2026-01-01",
      label: "Shopping",
    },
    {
      id: "2",
      text: "Finish the project",
      completed: false,
      date: "2026-01-01",
      label: "Work",
    },
    {
      id: "3",
      text: "Read the book",
      completed: false,
      date: "2026-01-03",
      label: "Reading",
    },
    {
      id: "4",
      text: "Exercise",
      completed: false,
      date: "2026-01-04",
      label: "Health",
    },
    {
      id: "5",
      text: "Call the doctor",
      completed: false,
      date: "2026-01-05",
      label: "Medical",
    },
  ]);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderRightActions = (
    task: Task,
    progress: RNAnimated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    return (
      <View style={styles.rightActionContainer}>
        <RNAnimated.View
          style={[
            styles.rightAction,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTask(task.id)}
          >
            <Ionicons name="trash-outline" size={24} color="#FFF" />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </RNAnimated.View>
      </View>
    );
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.date]) {
      acc[task.date] = [];
    }
    acc[task.date].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="red" />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.title}>Today</Text>
      </View>

      {/* Task List */}
      <ScrollView style={styles.taskList}>
        {Object.entries(groupedTasks).map(([date, dateTasks]) => (
          <View key={date} style={styles.dateGroup}>
            <Text style={styles.subtitle}>{date}</Text>
            {dateTasks.map((task) => (
              <Swipeable
                key={task.id}
                renderRightActions={(progress) =>
                  renderRightActions(task, progress)
                }
              >
                <TouchableOpacity
                  key={task.id}
                  style={styles.taskItem}
                  onPress={() => toggleTask(task.id)}
                >
                  <View style={styles.taskItemContent}>
                    <View style={styles.taskItemContentLeft}>
                      <View
                        style={[
                          styles.checkbox,
                          task.completed && styles.checkboxCompleted,
                          task.color && {
                            borderColor: task.color,
                            backgroundColor: task.color,
                          },
                        ]}
                      >
                        {task.completed && (
                          <Ionicons name="checkmark" size={16} color="#FFF" />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.taskText,
                          task.completed && styles.taskTextCompleted,
                        ]}
                      >
                        {task.text}
                      </Text>
                    </View>

                    <Text style={styles.taskLabel}>{task.label}</Text>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  addButton: {},
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  taskList: {
    // paddingHorizontal: 20,
  },
  dateGroup: {},
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "yellow",
    borderTopWidth: 1,
    borderColor: "#C5C5C5",
    paddingBottom: 10,
  },
  taskItemContent: {
    width: "100%",
    paddingEnd: 20,
    paddingTop: 10,
  },
  taskItemContentLeft: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginStart: 20,
  },
  checkboxCompleted: {
    borderColor: "#000",
    backgroundColor: "#000",
  },
  taskText: {
    color: "#000",
    fontSize: 16,
    marginStart: 10,
  },
  taskTextCompleted: {},
  taskLabel: {
    textAlign: "right",
    color: "#666666",
    fontSize: 12,
  },
  rightActionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
  },
  rightAction: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
  },
  deleteButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 20,
    width: "100%",
  },
  deleteText: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
});
