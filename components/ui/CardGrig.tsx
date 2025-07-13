import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "./Card";

const CardGrid: React.FC = () => {
  return (
    <View style={styles.container}>
      <Card
        title="Producto"
        description="1 unidad"
        image="https://via.placeholder.com/50"
      />
      <Card
        title="Producto"
        description="4 unidades"
        image="https://via.placeholder.com/50"
      />
      <Card
        title="Producto"
        description="combo"
        image="https://via.placeholder.com/50"
      />
      <Card
        title="Nuestra sucursal"
        description="combo"
        image="https://via.placeholder.com/50"
      />
      <Card
        title="social"
        description="redes-sociales"
        image="https://via.placeholder.com/50"
      />
      <Card
        title="sobre nosotros"
        description="combo"
        image="https://via.placeholder.com/50"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});

export default CardGrid;