import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerBackVisible: false }}>
      <Stack.Screen name="signin" options={{ title: "Sign in" }} />
      <Stack.Screen name="signup" options={{ title: "Sign up" }} />
    </Stack>
  );
}
