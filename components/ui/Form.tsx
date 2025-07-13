import React from "react";
import { Surface } from "react-native-paper";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";

interface FormProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Form: React.FC<FormProps> = ({ children, style }) => (
  <Surface style={[styles.container, style]}>
    {children}
  </Surface>
);

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
    elevation: 4,
    borderRadius: 8,
  },
});
