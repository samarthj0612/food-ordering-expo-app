import { useEffect } from "react";
import { Platform } from "react-native";
import "react-native-reanimated";

import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useColorScheme } from "@components/useColorScheme";
import CartProvider from "@/src/providers/CartProvider";
import { Config } from "../config";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(user)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <CartProvider>
        <Stack>
          <Stack.Screen
            name="(auth)"
            options={{
              title: "Authentication",
              headerShown: !Config.PRODUCTION,
              headerBackVisible: !Config.PRODUCTION,
            }}
          />
          <Stack.Screen
            name="(admin)"
            options={{
              title: "Admin Panel",
              headerShown: !Config.PRODUCTION,
              headerBackVisible: !Config.PRODUCTION,
            }}
          />
          <Stack.Screen
            name="(user)"
            options={{
              title: "User Panel",
              headerShown: !Config.PRODUCTION,
              headerBackVisible: !Config.PRODUCTION,
            }}
          />
          <Stack.Screen
            name="cart"
            options={{ title: "Cart", presentation: "modal" }}
          />
        </Stack>
      </CartProvider>
    </ThemeProvider>
  );
}
