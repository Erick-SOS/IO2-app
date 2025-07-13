import React from "react";
import { View, StyleSheet } from "react-native";

interface FormFooterProps {
  children: React.ReactNode;
}

const FormFooter: React.FC<FormFooterProps> = ({ children }) => (
    <View style={styles.footer}>{children}</View>
);


const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#F8F8F8",
  },
});

export default FormFooter;