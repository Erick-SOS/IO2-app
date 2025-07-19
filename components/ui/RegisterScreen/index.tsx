import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Form from "../Form";
import FormHeader from "../FormHeader";
import FormContent from "../FormContent";
import FormInputs from "../FormInputs";
import Button from "../Button";
import Text from "../Text";
import IconButton from "../IconButton";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tener esta importación

const RegisterScreen: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleRegister = () => {
    console.log("Datos ingresados:", {
      fullName,
      phoneNumber,
      email,
      password,
      address,
    });
  };

  const handleGoogleLogin = () => {
    // Lógica para inicio de sesión con Google
    console.log("Iniciar sesión con Google");
  };

  const handleBack = () => {
    router.push("/(auth)/login");
  };

  const inputFields = [
    { label: "Nombre completo", value: fullName, onChangeText: setFullName },
    { label: "Número de celular", value: phoneNumber, onChangeText: setPhoneNumber, keyboardType: "phone-pad" },
    { label: "Correo electrónico", value: email, onChangeText: setEmail, keyboardType: "email-address" },
    {
      label: "Contraseña",
      value: password,
      onChangeText: setPassword,
      secureTextEntry: secureTextEntry,
    },
    { label: "Dirección", value: address, onChangeText: setAddress },
  ];

  return (
    <Form style={styles.form}>
      <FormHeader>
        <View style={styles.headerRow}>
          <IconButton icon="arrow-left" onPress={handleBack} style={styles.iconButton} />
          <Text style={styles.headerTitle}>Crear cuenta</Text>
        </View>
      </FormHeader>
      <FormContent>
        <FormInputs inputs={inputFields} />
        <Button
          label="Registrarse"
          onPress={handleRegister}
          style={styles.registerButton}
          labelStyle={styles.registerButtonText}
        />

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>o</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          activeOpacity={0.8}
        >
          <Ionicons name="logo-google" size={20} color="#DB4437" />
          <Text style={styles.googleButtonText}>Continuar con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBack} style={styles.loginOptionContainer}>
          <Text style={styles.backToLogin}>¿Ya tienes una cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </FormContent>
    </Form>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 16,
  },
  iconButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  registerButton: {
    marginTop: 16,
    backgroundColor: "#007BFF",
    borderRadius: 20,
    paddingVertical: 12,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  backToLogin: {
    color: "#007BFF",
    fontSize: 16,
    textDecorationLine: "underline",
    marginTop: 8,
    textAlign: "center",
  },
  loginOptionContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 12,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  googleButtonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDDDDD",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#888888",
    fontSize: 14,
  },
});

export default RegisterScreen;