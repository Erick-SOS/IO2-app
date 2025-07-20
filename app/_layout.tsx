import { Stack } from 'expo-router';
import React from 'react';
import { ThemeProvider } from "@/components/ui/ThemeContext";
import { Slot } from "expo-router";
import { UserProvider } from "@/context/UserContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)/login" options={{ title: 'Login' }} /> 
          <Stack.Screen name="(auth)/register" options={{ title: 'Register' }} />
          <Stack.Screen name="landing" options={{ title: 'landing' }} />
          <Stack.Screen name="AdminView" options={{ title: 'Admin View' }} />
        </Stack>
      </UserProvider>
    </ThemeProvider>
  );
}