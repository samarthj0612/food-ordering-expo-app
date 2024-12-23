import React from "react";
import { StyleSheet, View } from "react-native";
import { Link, Redirect, Stack } from "expo-router";

import Button from "@components/Button";
import { Config } from "@/src/config";

const App = () => {
  if (Config.PRODUCTION) {
    return <Redirect href={"/(auth)"} />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: "Screen Navigator", headerBackVisible: false }}
      />
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/(auth)"} asChild>
        <Button text="Authentication" />
      </Link>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});
