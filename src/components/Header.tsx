import React from "react";
import { View, StyleSheet, Text } from "react-native";

export type IHeaderProps = {
  title: string;
};

export const Header: React.FC<IHeaderProps> = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f2f2f2",
    padding: 15,
  },
  headerTitle: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 20,
  },
});
