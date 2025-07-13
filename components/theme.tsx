export type ThemeColors = {
  
  background: string;
  text: string;
  secondaryText: string;
  primary: string;

  label: string;
  inputBackground: string;
  border: string;
  placeholder: string;
  icon: string;
  textSecondary: string;
  
  bannerBackground: string;
  bannerImageBackground: string;
  shadow: string;
  primaryLight: string;
  buttonText: string;
  
  sectionHeaderBackground?: string;
  sectionHeaderText?: string;
  itemBackground?: string;

  iconBackground: string;
  buttonBackground: string;
  cardBackground: string;

  tabBarBackground: string;
  subtitle: string;
  cardText: string;
};

export const lightColors: ThemeColors = {
  // Colores base
  background: "#FFFFFF",
  text: "#000000",
  secondaryText: "#444444",
  primary: "#007BFF",
  
  label: "#444444",
  inputBackground: "#F9F9F9",
  border: "#CCCCCC",
  placeholder: "#999999",
  icon: "#000000",
  textSecondary: "#444444",
  
  bannerBackground: "#f8f9ff",
  bannerImageBackground: "#f0f4ff",
  shadow: "#000000",
  primaryLight: "#e0e7ff",
  buttonText: "#FFFFFF",
  
  sectionHeaderBackground: "#f0f0f0",
  sectionHeaderText: "#333333",
  itemBackground: "#FFFFFF",

  iconBackground: '#EEF2F6',
  buttonBackground: '#EEF2F6',
  cardBackground: '#FFFFFF',

  tabBarBackground: '#FFF',
  subtitle: "#FFFFFF",
  cardText: "#000000",
};

export const darkColors: ThemeColors = {
  // Colores base
  background: "#121212",
  text: "#FFFFFF",
  secondaryText: "#AAAAAA",
  primary: "#007BFF",
  
  label: "#CCCCCC",
  inputBackground: "#1E1E1E",
  border: "#333333",
  placeholder: "#888888",
  icon: "#FFFFFF",
  textSecondary: "#AAAAAA",
  
  bannerBackground: '#1E1E1E',
  bannerImageBackground: '#2A2A2A',
  shadow: "#FFFFFF",
  primaryLight: "#0f3460",
  buttonText: "#000000",

  sectionHeaderBackground: "#1a1a1a",
  sectionHeaderText: "#FFFFFF",
  itemBackground: "#2a2a2a",

  iconBackground: '#1E1E1E',
  buttonBackground: '#1E1E1E',
  cardBackground: '#2A2A2A',

  tabBarBackground: '#1E1E1E',
  subtitle: "#FFFFFF",
  cardText: "#FFFFFF",
};

export const getThemeColors = (theme: "Claro" | "Oscuro"): ThemeColors => {
  return theme === "Oscuro" ? darkColors : lightColors;
};