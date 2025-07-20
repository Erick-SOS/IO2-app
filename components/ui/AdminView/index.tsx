import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUser } from "@/context/UserContext";
import { router } from "expo-router";

type SaleEntry = {
  id: number;
  product: string;
  total: number;
  date: string;
};

const AdminView: React.FC = () => {
  const { user } = useUser();
  const [filter, setFilter] = useState<"daily" | "weekly" | "monthly">("daily");
  const [filteredData, setFilteredData] = useState<SaleEntry[]>([]);

  useEffect(() => {
    if (!user || !user.admin) {
      router.replace("/home");
    }
  }, [user]);

  useEffect(() => {
    // Simula los datos de ventas por cada filtro
    const dummyData: { [key: string]: SaleEntry[] } = {
      daily: [
        { id: 1, product: "Frituras 15gr", total: 30, date: "2025-07-20" },
        { id: 2, product: "Frituras 30gr", total: 60, date: "2025-07-20" },
      ],
      weekly: [
        { id: 1, product: "Frituras 15gr", total: 210, date: "Semana 29" },
        { id: 2, product: "Frituras 30gr", total: 300, date: "Semana 29" },
      ],
      monthly: [
        { id: 1, product: "Frituras 15gr", total: 890, date: "Julio 2025" },
        { id: 2, product: "Frituras 30gr", total: 1220, date: "Julio 2025" },
      ],
    };

    setFilteredData(dummyData[filter]);
  }, [filter]);

  if (!user || !user.admin) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reportes de Ventas</Text>
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <MaterialCommunityIcons name="home" size={28} color="#A0522D" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {["daily", "weekly", "monthly"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              filter === type && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(type as "daily" | "weekly" | "monthly")}
          >
            <Text
              style={[
                styles.filterText,
                filter === type && styles.filterTextActive,
              ]}
            >
              {type === "daily" ? "Día" : type === "weekly" ? "Semana" : "Mes"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>#</Text>
          <Text style={styles.tableCell}>Producto</Text>
          <Text style={styles.tableCell}>Total</Text>
          <Text style={styles.tableCell}>Fecha</Text>
        </View>

        {filteredData.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{index + 1}</Text>
            <Text style={styles.tableCell}>{item.product}</Text>
            <Text style={styles.tableCell}>Bs. {item.total}</Text>
            <Text style={styles.tableCell}>{item.date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#A0522D",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
    marginHorizontal: 5,
  },
  filterButtonActive: {
    backgroundColor: "#A0522D",
  },
  filterText: {
    fontSize: 14,
    color: "#333",
  },
  filterTextActive: {
    color: "#FFF",
    fontWeight: "bold",
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 6,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#EEE",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableHeader: {
    backgroundColor: "#F0F0F0",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
});

export default AdminView;
