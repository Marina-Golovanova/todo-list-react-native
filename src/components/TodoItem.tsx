import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { ITodo } from "../../App";
import deleteIcon from "../../assets/delete.png";

export type ITodoItemProps = {
  todo: ITodo;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, value: string) => void;
};

export const TodoItem: React.FC<ITodoItemProps> = (props) => {
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  return (
    <View>
      <View style={styles.todoLayout} onTouchEndCapture={() => {}}>
        <View
          style={[styles.circle, props.todo.isDone && styles.circleDone]}
          onTouchEnd={() => props.onComplete(props.todo.id)}
        />
        <TouchableOpacity
          style={styles.text}
          onLongPress={() => setIsEditModalOpen(true)}
          delayLongPress={1000}
        >
          <Text style={props.todo.isDone && styles.todoDone}>
            {props.todo.title}
          </Text>
        </TouchableOpacity>

        <View
          style={[styles.circle, styles.additionalOptions]}
          onTouchEnd={() => props.onDelete(props.todo.id)}
        >
          <Image source={deleteIcon} />
        </View>
      </View>

      <Modal visible={isEditModalOpen} onRequestClose={() => console.log(1)}>
        <View style={styles.modal}>
          <View style={styles.todoAdditionalOptionsLayout}>
            <TextInput
              style={styles.input}
              value={props.todo.title}
              onChangeText={(value) => props.onEdit(props.todo.id, value)}
            />

            <Button title="confirm" onPress={() => setIsEditModalOpen(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  todoLayout: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  text: {
    maxWidth: "70%",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#fff",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  circleDone: {
    backgroundColor: "green",
    borderColor: "green",
  },
  todoDone: {
    textDecorationLine: "line-through",
    color: "green",
  },
  additionalOptions: {
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  ellipsis: {
    width: "100%",
    height: "100%",
  },
  modal: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  todoAdditionalOptionsLayout: {
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
  },
  input: {
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
  },
});
