import React from "react";
import { 
    Text as RNText, 
    StyleSheet, 
    TextStyle } from "react-native";

interface TextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

const Text: React.FC<TextProps> = ({ children, style }) => (
    <RNText style={[styles.text, style]}>{children}</RNText>
);


export default Text;

const styles = StyleSheet.create({
    text: {
      fontSize: 16,
      color: "#000",
    },
  });