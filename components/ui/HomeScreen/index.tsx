import React from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../Header";
import Banner from "../Banner";
import Title from "../Title";
import CardGrid from "../CardGrig"; // Asegúrate de que esté bien escrito, parece "CardGrig" en lugar de "CardGrid"
import Text from "../Text"; // o usa de react-native-paper

const HomeScreen: React.FC = () => {
  const handleCartPress = () => {
    // Navega al carrito o muestra modal, etc.
    console.log("Carrito presionado");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado con título y carrito */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>IO 2 APP (nombre)</Text>
        <TouchableOpacity onPress={handleCartPress}>
          <MaterialCommunityIcons name="cart-outline" size={28} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* Banner promocional opcional */}
      <Banner />

      {/* Sección productos */}
      <Text style={styles.sectionTitle}>Productos</Text>
      <CardGrid /> //productos

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
});

export default HomeScreen;
