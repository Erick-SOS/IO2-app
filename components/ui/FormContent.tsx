import React from "react";
import { View, StyleSheet } from "react-native";

interface FormContentProps {
  children: React.ReactNode;
}

const FormContent: React.FC<FormContentProps> = ({ children }) => (
    <View style={styles.content}>{children}</View>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export default FormContent;