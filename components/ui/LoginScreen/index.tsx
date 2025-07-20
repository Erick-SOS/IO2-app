import type React from "react"
import { useState } from "react"
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Image,
} from "react-native"
import Text from "../Text"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { loginUser } from "../../../firebase/firebaseServices";
import { useUser } from "@/context/UserContext";
import FloatingLabelInput from "../FloatingLabelInput";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const { theme } = useTheme()
  const colors = getThemeColors(theme)
  const { setUser } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios", [{ text: "OK" }]);
      return;
    }

    setLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.success && result.user) {
        const user = result.user;
        setUser(user);
        router.push("/home");
      } else {
        const errorMessage =
          result.error instanceof Error
            ? result.error.message
            : String(result.error);
        Alert.alert("Error", "Credenciales inválidas: " + errorMessage, [{ text: "OK" }]);
      }
    } catch (error: any) {
      Alert.alert("Error inesperado", error.message || String(error), [{ text: "OK" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Iniciar sesión con Google");
  }

  const goToRegister = () => {
    router.push("/(auth)/register");
  }

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
    },
    headerContainer: {
      alignItems: "center",
      paddingVertical: 20,
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: 24,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 20,
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
    },
    headerSubtitle: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: "center",
      marginTop: 8,
    },
    formContainer: {
      paddingHorizontal: 24,
      paddingBottom: 24,
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputWrapper: {
      position: "relative",
    },
    input: {
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      paddingHorizontal: 20,
      paddingVertical: 16,
      fontSize: 16,
      color: colors.text,
      paddingRight: 50,
      minHeight: 56,
    },
    inputFocused: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    inputIcon: {
      position: "absolute",
      right: 16,
      top: 18,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
      marginLeft: 4,
    },
    passwordToggle: {
      position: "absolute",
      right: 16,
      top: 18,
      padding: 4,
    },
    loginButton: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      alignItems: "center",
    },
    loginButtonDisabled: {
      backgroundColor: colors.secondaryText,
      opacity: 0.6,
    },
    loginButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "700",
      textAlign: "center",
    },
    googleButton: {
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      paddingVertical: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    googleButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "700",
      textAlign: "center",
      marginLeft: 10,
    },
    registerText: {
      textAlign: "center",
      color: colors.primary,
      textDecorationLine: "underline",
      marginTop: 8,
      fontSize: 14,
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      marginHorizontal: 10,
      color: colors.secondaryText,
      fontSize: 14,
    },
  })

  return (
    <KeyboardAvoidingView style={dynamicStyles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView
        style={dynamicStyles.container}
        contentContainerStyle={dynamicStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={dynamicStyles.headerContainer}>
          <View style={dynamicStyles.logoContainer}>
            <Image source={{ uri: "https://placeholder.svg?height=80&width=80" }} style={dynamicStyles.logo} />
          </View>
          <Text style={dynamicStyles.headerTitle}>¡Bienvenido!</Text>
          <Text style={dynamicStyles.headerSubtitle}>Ingresa tus datos para continuar</Text>
        </View>

        <View style={dynamicStyles.formContainer}>
          <View style={dynamicStyles.inputContainer}>
            <Text style={dynamicStyles.label}>Correo electrónico</Text>
            <View style={dynamicStyles.inputWrapper}>
              <TextInput
                style={[dynamicStyles.input, focusedField === "email" && dynamicStyles.inputFocused]}
                onChangeText={setEmail}
                value={email}
                placeholder="ejemplo@correo.com"
                placeholderTextColor={colors.secondaryText}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                editable={!loading}
              />
              <View style={dynamicStyles.inputIcon}>
                <Ionicons name="mail-outline" size={20} color={colors.secondaryText} />
              </View>
            </View>
          </View>

          <View style={dynamicStyles.inputContainer}>
            <Text style={dynamicStyles.label}>Contraseña</Text>
            <View style={dynamicStyles.inputWrapper}>
              <TextInput
                style={[dynamicStyles.input, focusedField === "password" && dynamicStyles.inputFocused]}
                onChangeText={setPassword}
                value={password}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor={colors.secondaryText}
                secureTextEntry={secureTextEntry}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
              <TouchableOpacity
                style={dynamicStyles.passwordToggle}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.secondaryText}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[dynamicStyles.loginButton, loading && dynamicStyles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={dynamicStyles.loginButtonText}>{loading ? "Procesando..." : "Ingresar"}</Text>
          </TouchableOpacity>

          <View style={dynamicStyles.dividerContainer}>
            <View style={dynamicStyles.dividerLine} />
            <Text style={dynamicStyles.dividerText}>o</Text>
            <View style={dynamicStyles.dividerLine} />
          </View>

          <TouchableOpacity
            style={dynamicStyles.googleButton}
            onPress={handleGoogleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Image 
              source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }} 
              style={{ width: 20, height: 20 }}
            />
            <Text style={dynamicStyles.googleButtonText}>Continuar con Google</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToRegister}>
            <Text style={dynamicStyles.registerText}>¿No tienes cuenta aún? Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;
