import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Modal,
  Alert
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
  const [reportVisible, setReportVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [salesData, setSalesData] = useState<{
    daily: {date: string; total: number}[];
    weekly: {week: string; total: number}[];
    byProduct: {product: string; quantity: number; total: number}[];
  }>({
    daily: [],
    weekly: [],
    byProduct: []
  });

  // Datos del usuario (deberían venir de tu sistema de login)
  const userData = {
    fullName: "Cliente Ejemplo", // Reemplaza con datos reales
    phone: "+59171234567", // Reemplaza con datos reales
    address: "Av. Principal #123, La Paz" // Reemplaza con datos reales
  };

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

  const generateReportData = () => {
    const today = new Date().toISOString().split('T')[0];
    const dailyTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setSalesData({
      daily: [
        {date: '2023-05-01', total: 150},
        {date: '2023-05-02', total: 230},
        {date: today, total: dailyTotal}
      ],
      weekly: [
        {week: 'Semana 18', total: 1200},
        {week: 'Semana 19', total: 1450},
        {week: 'Semana actual', total: dailyTotal * 7}
      ],
      byProduct: [
        {product: 'Frituras de oca 15gr', quantity: 45, total: 135},
        {product: 'Frituras de oca 30gr', quantity: 30, total: 150},
        ...cartItems.map(item => ({
          product: item.name,
          quantity: item.quantity,
          total: item.price * item.quantity
        }))
      ]
    });
  };

  const handleReportPress = () => {
    generateReportData();
    setReportVisible(true);
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

    // Generar número de pedido aleatorio
    const orderNumber = `PED-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Formatear los productos del pedido
    const productsText = cartItems.map(item => 
      `- ${item.name} (${item.quantity} x Bs. ${item.price}) = Bs. ${(item.price * item.quantity).toFixed(2)}`
    ).join('%0A');

    // Crear mensaje para WhatsApp
    const whatsappMessage = `*NUEVO PEDIDO - ANDIKO CHIPS*%0A%0A` +
      `*Número de pedido:* ${orderNumber}%0A` +
      `*Cliente:* ${userData.fullName}%0A` +
      `*Teléfono:* ${userData.phone}%0A` +
      `*Dirección:* ${userData.address}%0A%0A` +
      `*Detalle del pedido:*%0A${productsText}%0A%0A` +
      `*Total a pagar:* Bs. ${total.toFixed(2)}`;

    // Número de WhatsApp del equipo de ventas (REEMPLAZA CON EL NÚMERO REAL)
    const salesWhatsappNumber = '+59165371410'; // Ejemplo: Bolivia +591
    
    // Abrir WhatsApp con el mensaje
    Linking.openURL(`https://wa.me/${salesWhatsappNumber}?text=${whatsappMessage}`)
      .catch(() => Alert.alert(
        "Error", 
        `No se pudo abrir WhatsApp. Por favor contacta al número: ${salesWhatsappNumber}`
      ));

    // Limpiar carrito
    clearCart();
    setCartVisible(false);
    
    Alert.alert(
      "¡Gracias por tu compra!", 
      "Se ha enviado tu pedido al equipo de ventas."
    );
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

          <View style={styles.headerIcons}>
            {/* Botón de reportes */}
            <TouchableOpacity onPress={handleReportPress} style={styles.reportButton}>
              <MaterialCommunityIcons name="chart-bar" size={28} color="#A0522D" />
            </TouchableOpacity>
            
            {/* Botón de carrito */}
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

        <Text style={styles.sectionTitle}>Sobre nosotros</Text>
        <View style={styles.aboutContainer}>
          <TouchableOpacity onPress={handleOpenSocialLink} style={styles.cardWrapper}>
            <Card name="Síguenos en Instagram, TikTok y Facebook" image={images.Logo} price="" unit="" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal del Carrito */}
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

      {/* Modal para seleccionar cantidad */}
      <ModalBottomSheet
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={selectedProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        onAddToCart={handleAddToCartFromModal}
      />

      {/* Modal de Reportes */}
      <Modal
        visible={reportVisible}
        animationType="slide"
        onRequestClose={() => setReportVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Reportes de Ventas</Text>
            <TouchableOpacity onPress={() => setReportVisible(false)}>
              <MaterialCommunityIcons name="close" size={24} color="#A0522D" />
            </TouchableOpacity>
          </View>
          
          <ScrollView>
            <Text style={styles.reportSectionTitle}>Ventas por día</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Fecha</Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>Total (Bs.)</Text>
              </View>
              {salesData.daily.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.date}</Text>
                  <Text style={styles.tableCell}>{item.total}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.reportSectionTitle}>Ventas semanales</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Semana</Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>Total (Bs.)</Text>
              </View>
              {salesData.weekly.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.week}</Text>
                  <Text style={styles.tableCell}>{item.total}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.reportSectionTitle}>Ventas por producto</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Producto</Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>Cantidad</Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>Total (Bs.)</Text>
              </View>
              {salesData.byProduct.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.product}</Text>
                  <Text style={styles.tableCell}>{item.quantity}</Text>
                  <Text style={styles.tableCell}>{item.total}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
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
  reportButton: {
    marginRight: 15,
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A0522D',
  },
  reportSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  table: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#F0F0F0',
  },
});

export default HomeScreen;