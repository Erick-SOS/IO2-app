import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

interface CardProps {
  title: string;
  description: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ title, description, image }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "45%",
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
    
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
});

export default Card;