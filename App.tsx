import React from "react";
import "react-native-get-random-values";
import { ClickOutsideProvider } from "react-native-click-outside";
import { v4 as uuidv4 } from "uuid";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Dimensions,
} from "react-native";
import { Header } from "./src/components/Header";
import { TodoItem } from "./src/components/TodoItem";

export type ITodo = {
  id: string;
  title: string;
  isDone: boolean;
};

export default function App() {
  const [todoItem, setTodoItem] = React.useState("");
  const [todoList, setTodoList] = React.useState<ITodo[]>([]);

  const addTodoList = () => {
    const todo = {
      id: uuidv4(),
      title: todoItem,
      isDone: false,
    };
    setTodoList([...todoList, todo]);
    setTodoItem("");
  };

  const screenHeight = Dimensions.get("window").height;

  const handleComplete = (todoId) => {
    setTodoList((arr) =>
      arr
        .map((it) => (it.id === todoId ? { ...it, isDone: !it.isDone } : it))
        .sort((a, b) => Number(a.isDone) - Number(b.isDone))
    );
  };

  const handleDelete = (todoId) => {
    setTodoList((arr) => arr.filter((it) => it.id !== todoId));
  };

  const handleEdit = (todoId: string, newTitle: string) => {
    setTodoList((arr) =>
      arr.map((it) => (it.id === todoId ? { ...it, title: newTitle } : it))
    );
  };

  return (
    <ClickOutsideProvider>
      <View>
        <Header title="Todo List" />

        <View style={styles.container}>
          <View>
            <TextInput
              placeholder="Add to do"
              style={styles.textInput}
              value={todoItem}
              onChangeText={setTodoItem}
            />
            <Button
              title="Add new item"
              onPress={addTodoList}
              disabled={!todoItem.length}
            />
          </View>

          <FlatList
            style={{ height: screenHeight - 250 }}
            data={todoList}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onComplete={handleComplete}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )}
            keyExtractor={(_, idx) => String(idx)}
          />
        </View>
      </View>
    </ClickOutsideProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  textInput: {
    padding: 10,
    borderColor: "#000",
    marginBottom: 10,
    borderWidth: 1,
  },
  todoItem: {
    backgroundColor: "#f2f2f2",
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
});
