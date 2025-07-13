import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import Text from "./Text";

interface TitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const Title: React.FC<TitleProps> = ({ children, style }) => (
  <Text style={StyleSheet.flatten([styles.title, style])}>{children}</Text>
);

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    
  },
});