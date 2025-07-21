import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TextInputProps,
} from "react-native";

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onChangeText,
  isPassword = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: "absolute" as const,
    left: 12,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: "#000000",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 4,
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        style={[styles.input, isFocused && styles.focusedInput]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={isPassword}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    marginBottom: 20,
  },
  input: {
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f2f2f2",
  },
  focusedInput: {
    borderColor: "#007BFF",
  },
});

export default FloatingLabelInput;
