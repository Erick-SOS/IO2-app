import React from "react";
import { StyleSheet, View } from "react-native";


interface FormHeaderProps {
  children: React.ReactNode;
}

const FormHeader: React.FC<FormHeaderProps> = ({ children }) => (
    <View style={styles.header}>{children}</View>
);

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
});

export default FormHeader;