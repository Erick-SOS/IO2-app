import React from "react";
import { StyleSheet, StyleProp, TextStyle } from "react-native";
import { Button as PaperButton } from "react-native-paper";

interface ButtonProps {
  label: string;
  onPress: () => void;
  mode?: "text" | "outlined" | "contained";
  style?: StyleProp<any>;          // para estilo del botón (contorno, fondo, etc)
  labelStyle?: StyleProp<TextStyle>; // para estilo del texto del botón
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  mode = "contained",
  style,
  labelStyle,
}) => (
  <PaperButton
    mode={mode}
    onPress={onPress}
    style={[styles.button, style]}
    labelStyle={labelStyle}
  >
    {label}
  </PaperButton>
);

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 8,
  },
});
