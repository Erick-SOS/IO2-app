import React from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "./IconButton";

const Header: React.FC = () => (
    <View style={styles.container}>
      <IconButton icon="account" onPress={() => console.log("Profile pressed")} />
      <IconButton icon="magnify" onPress={() => console.log("Search pressed")} />
    </View>
  );


export default Header;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 16,
    },
  });