import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Card from "./Card";
import { images } from "../../assets/images";

type CardSocialProps = {
  platform: "Instagram" | "TikTok" | "Facebook";
  onPress: () => void;
};

const CardSocial: React.FC<CardSocialProps> = ({ platform, onPress }) => {
  const platformInfo = {
    Instagram: {
      label: "Síguenos en Instagram",
      image: images.logoi,
    },
    TikTok: {
      label: "Síguenos en TikTok",
      image: images.logot,
    },
    Facebook: {
      label: "Síguenos en Facebook",
      image: images.logof,
    },
  };

  const { label, image } = platformInfo[platform];

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
      <Card name={label} image={image} price="" unit="" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    minWidth: "48%",
    marginBottom: 10,
    paddingTop: 1,
  },
});

export default CardSocial;