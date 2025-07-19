import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Modal from "react-native-modal";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  items: CartItem[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  total: number;
  userAddress: string;
  onOrder: () => void;
  onClearCart: () => void;
}

const Cart: React.FC<Props> = ({
  visible,
  onClose,
  items,
  onIncrease,
  onDecrease,
  total,
  userAddress,
  onOrder,
  onClearCart
}) => {
  return (
    <Modal
      isVisible={visible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      style={styles.modal}
      onBackdropPress={onClose}
      useNativeDriver
      hideModalContentWhileAnimating
    >
    
      <View style={styles.container}>
        <Text style={styles.address}>Dirección: {userAddress}</Text>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Text style={styles.backButtonText}>ATRAS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={onClearCart}>
            <Text style={styles.clearButtonText}>Vaciar carrito</Text>
        </TouchableOpacity>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>

              <View style={styles.quantityControls}>
                <TouchableOpacity onPress={() => onDecrease(item.id)}>
                  <Text style={styles.controlButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => onIncrease(item.id)}>
                  <Text style={styles.controlButton}>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.price}>
                Bs. {(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          )}
        />

        <Text style={styles.total}>Total: Bs. {total.toFixed(2)}</Text>
        <Text style={styles.note}>
          Todos los productos se pagan en efectivo al momento de la entrega
        </Text>

        <TouchableOpacity style={styles.orderButton} onPress={onOrder}>
          <Text style={styles.orderButtonText}>Pedir</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 40,
  },
  address: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  controlButton: {
    fontSize: 24,
    color: "#A0522D",
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 20,
    textAlign: "center",
  },
  price: {
    width: 80,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "right",
  },
  note: {
    marginTop: 10,
    fontStyle: "italic",
    color: "#666",
  },
  orderButton: {
    marginTop: 30,
    backgroundColor: "#A0522D",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#A0522D",
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  clearButton: {
    marginTop: 20,
    backgroundColor: "#A0522D",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Cart;
