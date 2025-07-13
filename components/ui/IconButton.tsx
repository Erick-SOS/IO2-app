import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { IconButton as PaperIconButton } from "react-native-paper";

interface IconButtonProps {
  icon: string;
  size?: number;
  onPress: () => void;
  style?: ViewStyle;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, size = 24, onPress, style }) => (
  <PaperIconButton 
   icon={icon} 
   size={size} 
   onPress={onPress} 
   style={[styles.iconButton, style]} 
   />
);

export default IconButton;

const styles = StyleSheet.create({
  iconButton: {
    margin: 0,
  },
});