import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HomeScreen from "@/components/ui/HomeScreen";

export default function LandingScreen() {
  return (
    <HomeScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});