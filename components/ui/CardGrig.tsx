import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Card from "./Card";
import { images } from "../../assets/images";

interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  unit: string;
}

interface CardGridProps {
  onProductPress: (product: Product) => void;
}

const products: Product[] = [
  {
    id: "1",
    name: "Frituras de oca 15gr",
    price: 3,
    image: images.oca15,
    unit: "1 unidad",
  },
  {
    id: "2",
    name: "Frituras de oca 30gr",
    price: 5,
    image: images.oca30,
    unit: "1 unidad",
  },
  {
    id: "3",
    name: "Combo oca x4",
    price: 20,
    image: images.oca30,
    unit: "4 unidades",
  },
  {
    id: "4",
    name: "Promoción especial",
    price: 15,
    image: images.oca15,
    unit: "combo",
  },
];

const CardGrid: React.FC<CardGridProps> = ({ onProductPress }) => {
  const handlePress = (product: Product) => () => onProductPress(product);

  return (
    <View style={styles.container}>
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          onPress={handlePress(product)}
          activeOpacity={0.8}
          style={styles.cardWrapper}
        >
          <Card
            image={product.image}
            price={`Bs. ${product.price.toFixed(2)}`}
            name={product.name}
            unit={product.unit}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  cardWrapper: {
    width: "47%",
  },
});

export default CardGrid;