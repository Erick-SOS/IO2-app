import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CardGrid from "../CardGrid";
import Cart from "../Cart";
import ModalBottomSheet from "../ModalBottomSheet";
import { images } from "../../../assets/images";
import Text from "../Text";
import { useUser } from "@/context/UserContext";
import { router } from "expo-router";
import CardSocial from "../CardSocial";

const HomeScreen: React.FC = () => {
  const { user } = useUser();

  const [cartItems, setCartItems] = React.useState<
    { id: string; name: string; price: number; quantity: number }[]
  >([]);
  const [cartVisible, setCartVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  const [quantity, setQuantity] = React.useState(1);

  const userData = {
    fullName: user?.nombre || "Cliente Ejemplo",
    phone: `+591${user?.celular || "00000000"}`,
    address: user?.direccion || "Dirección no registrada",
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearCart = () => setCartItems([]);

  const handleProductPress = (product: any) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalVisible(true);
  };

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
    if (cartItems.length === 0) {
      Alert.alert("Carrito vacío", "Tu carrito está vacío");
      return;
    }

    const orderNumber = `PED-${Math.floor(100000 + Math.random() * 900000)}`;
    const productsText = cartItems.map(item =>
      `- ${item.name} (${item.quantity} x Bs. ${item.price}) = Bs. ${(item.price * item.quantity).toFixed(2)}`
    ).join('%0A');

    const whatsappMessage = `*NUEVO PEDIDO - ANDIKO CHIPS*%0A%0A` +
      `*Número de pedido:* ${orderNumber}%0A` +
      `*Cliente:* ${userData.fullName}%0A` +
      `*Teléfono:* ${userData.phone}%0A` +
      `*Dirección:* ${userData.address}%0A%0A` +
      `*Detalle del pedido:*%0A${productsText}%0A%0A` +
      `*Total a pagar:* Bs. ${total.toFixed(2)}`;

    const salesWhatsappNumber = '+59165371410';

    Linking.openURL(`https://wa.me/${salesWhatsappNumber}?text=${whatsappMessage}`)
      .catch(() => Alert.alert("Error", `No se pudo abrir WhatsApp. Por favor contacta al número: ${salesWhatsappNumber}`));

    clearCart();
    setCartVisible(false);
    Alert.alert("¡Gracias por tu compra!", "Se ha enviado tu pedido al equipo de ventas.");
  };

  const handleOpenSocialLinkInstagram = () => {
    Linking.openURL("https://www.instagram.com/andiko_chips/#");
  };

  const handleOpenSocialLinkTikTok = () => {
    Linking.openURL("https://www.tiktok.com/@andiko_chips");
  };

  const handleOpenSocialLinkFacebook = () => {
    Linking.openURL("https://www.facebook.com/share/1B8PvCsA46/");
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.mainTitle}>ANDIKO CHIPS</Text>
            <Text style={styles.subtitle}>¡Que crujan los Andes!</Text>
          </View>
          
          <View style={styles.headerIcons}>
              {user?.admin && (
                <TouchableOpacity
                  onPress={() => router.push("/AdminView")}
                  style={styles.adminButton}
                >
                  <MaterialCommunityIcons name="shield-account" size={28} color="#A0522D" />
                </TouchableOpacity>
              )}
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
        </View>

        <Image source={images.Logo} style={styles.bannerImage} resizeMode="contain" />

        <Text style={styles.sectionTitle}>Productos</Text>

        <CardGrid onProductPress={handleProductPress} />

        <Text style={styles.sectionTitle}>Nuestras redes sociales</Text>
        
        <CardSocial platform="Instagram" onPress={handleOpenSocialLinkInstagram} />
        <CardSocial platform="TikTok" onPress={handleOpenSocialLinkTikTok} />
        <CardSocial platform="Facebook" onPress={handleOpenSocialLinkFacebook} />


      </ScrollView>

      <Cart
        visible={cartVisible}
        onClose={handleCloseCart}
        items={cartItems}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        total={total}
        userAddress={userData.address}
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
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
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
  adminButton: {
    marginRight: 15,
  },

});

export default HomeScreen;