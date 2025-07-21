import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Text from "./Text";
import Button from "./Button";

interface Product {
  image: any;
  name: string;
  price: number;  // Cambiado a number
}

interface Props {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
  quantity: number;
  setQuantity: (n: number) => void;
  onAddToCart: () => void;
}

const ModalBottomSheet: React.FC<Props> = ({
  visible,
  onClose,
  product,
  quantity,
  setQuantity,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Image source={product.image} style={styles.image} resizeMode="contain" />
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.price}>{`Bs. ${product.price.toFixed(2)}`}</Text>

              <View style={styles.quantityRow}>
                <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>

              <Button
                label="Añadir al carrito"
                onPress={() => {
                  onAddToCart();
                  onClose();
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    color: "#A0522D",
    fontSize: 16,
    marginBottom: 16,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 24,
    color: "#A0522D",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ModalBottomSheet;
