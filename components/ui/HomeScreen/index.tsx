import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CardGrid from "../CardGrig";
import Cart from "../Cart";
import ModalBottomSheet from "../ModalBottomSheet";
import { images } from "../../../assets/images";
import Text from "../Text";
import Card from "../Card";

interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  unit: string;
}

const HomeScreen: React.FC = () => {
  const [cartItems, setCartItems] = useState<
    { id: string; name: string; price: number; quantity: number }[]
  >([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const userAddress = "Av. Principal #123, La Paz";

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearCart = () => {
    setCartItems([]);
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setTimeout(() => {
      setModalVisible(true);
    }, 0);
  };

  // Añadir producto con cantidad al carrito
  const handleAddToCartFromModal = () => {
    if (!selectedProduct) return;

    setCartItems((items) => {
      const existing = items.find((item) => item.id === selectedProduct.id);
      if (existing) {
        return items.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...items,
          {
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            quantity,
          },
        ];
      }
    });
    setModalVisible(false);
  };

  const handleIncrease = (id: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: string) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCartPress = () => setCartVisible(true);
  const handleCloseCart = () => setCartVisible(false);

  const handleOrder = () => {
    alert("¡Gracias por tu compra!");
    clearCart();
    setCartVisible(false);
  };

  const handleOpenSocialLink = () => {
    Linking.openURL("https://linktr.ee/ANDIKOCHIPS");
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.mainTitle}>ANDIKO CHIPS</Text>
            <Text style={styles.subtitle}>¡Que crujan los Andes!</Text>
          </View>

          <View style={styles.cartWrapper}>
            <TouchableOpacity onPress={handleCartPress}>
              <MaterialCommunityIcons name="cart-outline" size={28} color="#A0522D" />
            </TouchableOpacity>
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </Text>
              </View>
            )}
          </View>
        </View>

        <Image source={images.Logo} style={styles.bannerImage} resizeMode="contain" />

        <Text style={styles.sectionTitle}>Productos</Text>

        {/* Aquí abrimos modal para cantidad */}
        <CardGrid onProductPress={handleProductPress} />

        <Text style={styles.sectionTitle}>Sobre nosotros</Text>
        <View style={styles.aboutContainer}>
          <TouchableOpacity onPress={handleOpenSocialLink} style={styles.cardWrapper}>
            <Card name="Síguenos en Instagram, TikTok y Facebook" image={images.Logo} price="" unit="" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Cart
        visible={cartVisible}
        onClose={handleCloseCart}
        items={cartItems}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        total={total}
        userAddress={userAddress}
        onOrder={handleOrder}
        onClearCart={clearCart}
      />

      <ModalBottomSheet
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={selectedProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        onAddToCart={handleAddToCartFromModal}
      />
    </>
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
    alignItems: "flex-start",
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#A0522D",
  },
  subtitle: {
    fontSize: 16,
    color: "#A0522D",
    marginTop: 4,
  },
  cartWrapper: {
    position: "relative",
    paddingRight: 4,
  },
  cartBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#A0522D",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  bannerImage: {
    width: "100%",
    height: 180,
    marginBottom: 24,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    color: "#333",
  },
  aboutContainer: {
    marginBottom: 20,
  },
  cardWrapper: {
    flex: 1,
    minWidth: "48%",
  },
});

export default HomeScreen;