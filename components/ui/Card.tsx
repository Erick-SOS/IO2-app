import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface CardProps {
  image: any;
  price: string;
  name: string;
  unit: string;
}

const Card: React.FC<CardProps> = ({ image, price, name, unit }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.unit}>{unit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
    paddingBottom: 8,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 120,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6,
    color: "#A0522D",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
    color: "#333",
  },
  unit: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});

export default Card;
