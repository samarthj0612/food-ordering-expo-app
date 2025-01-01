import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack screenOptions={{ headerBackVisible: false }}>
      <Stack.Screen name="signin" options={{ title: "Sign in" }} />
      <Stack.Screen name="signup" options={{ title: "Sign up" }} />
    </Stack>
  );
}
