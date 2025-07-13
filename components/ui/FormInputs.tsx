import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface InputField {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

interface FormInputsProps {
  inputs: InputField[];
}

const FormInputs: React.FC<FormInputsProps> = ({ inputs }) => {
  return (
    <View style={styles.container}>
      {inputs.map((input, index) => (
        <TextInput
          key={index}
          label={input.label}
          value={input.value}
          onChangeText={input.onChangeText}
          secureTextEntry={input.secureTextEntry}
          mode="outlined"
          style={styles.input}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
});

export default FormInputs;