import React from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const Banner: React.FC = () => (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://imgs.search.brave.com/y8KxH6rZQEz7n_N3V3MXlV2BVxx2WJp2m9zicHMpEcg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzQzL01hcmNhX1Zl/cnRpY2FsX1VuaXZl/cnNpZGFkX01heW9y/X2RlX1Nhbl9TaW0l/QzMlQjNuX0NvY2hh/YmFtYmFfQm9saXZp/YS5wbmc" }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );



export default Banner;

const styles = StyleSheet.create({
    container: {
        width: "100%", 
        height: width * 0.5, 
        marginBottom: 16,
        backgroundColor: "#F5F5DC",
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 8,
    },
  });