import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Linking,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { saveOrder } from "../../../firebase/firebaseServices";

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
  onClearCart: () => void;
  onOrder: (items: CartItem[], total: number, note: string) => void;
}

const Cart: React.FC<Props> = ({
  visible,
  onClose,
  items,
  onIncrease,
  onDecrease,
  total,
  userAddress,
  onClearCart,
}) => {
  const [userNote, setUserNote] = useState("");

  const handleOrder = async () => {
    if (items.length === 0) {
      Alert.alert("Carrito vacío", "Agrega productos antes de hacer un pedido.");
      return;
    }

    const productosStr = items
      .map((item) => `${item.quantity} x ${item.name} (Bs. ${item.price.toFixed(2)})`)
      .join(", ");

    try {
      const response = await saveOrder({
        monto: total,
        productos: productosStr,
      });

      if (response.success) {
        const message = `Hola, quiero hacer un pedido:\n📦 ${productosStr}\n🏠 Dirección: ${userAddress}\n📝 Nota: ${userNote || "Ninguna"}\n💵 Total: Bs. ${total.toFixed(2)}`;
        const phoneNumber = "59165371410";
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        Linking.openURL(whatsappURL);

        Alert.alert("Pedido realizado", "Compra guardada correctamente");
        onClearCart();
        setUserNote(""); // limpiar nota
        onClose();
      } else {
        Alert.alert("Error", "No se pudo guardar la compra: " + getErrorMessage(response.error));
      }
    } catch (error: any) {
      Alert.alert("Error inesperado", error.message || String(error));
    }
  };

  function getErrorMessage(error: unknown): string {
    if (!error) return "Error desconocido";
    if (typeof error === "string") return error;
    if (typeof error === "object" && error !== null && "message" in error) {
      return (error as any).message;
    }
    return "Error desconocido";
  }

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

        <View style={styles.topButtons}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Text style={styles.backButtonText}>ATRÁS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButton} onPress={onClearCart}>
            <Text style={styles.clearButtonText}>Vaciar carrito</Text>
          </TouchableOpacity>
        </View>

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
          Pagos en efectivo al momento de la entrega o por QR a través de WhatsApp
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe una nota o instrucción..."
          value={userNote}
          onChangeText={setUserNote}
          multiline
        />

        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
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
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#A0522D",
    borderRadius: 8,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
  input: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    minHeight: 60,
    textAlignVertical: "top",
  },
  orderButton: {
    marginTop: 20,
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
});

export default Cart;
