import { Alert, Pressable, StyleSheet, View } from "react-native";
import { Link, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import Colors from "@constants/Colors";
import { supabase } from "@/src/lib/supabase";

export default function MenuLayout() {
  const signOutHandler = () => {
    Alert.alert(
      "Sign out",
      "Are you sure you want to sign out?",
      [{ text: "No" }, { text: "Yes", onPress: () => supabase.auth.signOut() }],
      { cancelable: true }
    );
    supabase.auth.signOut();
  };

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <View style={styles.headerRightContainer}>
            <Link href="/cart" asChild>
              <Pressable onPress={() => console.debug("PRESSED")}>
                {({ pressed }) => (
                  <FontAwesome
                    name="shopping-cart"
                    size={25}
                    color={Colors.light.tint}
                    style={[
                      styles.headerRightIcon,
                      { opacity: pressed ? 0.5 : 1 },
                    ]}
                  />
                )}
              </Pressable>
            </Link>

            <Pressable onPress={signOutHandler}>
              {({ pressed }) => (
                <FontAwesome
                  name="sign-out"
                  size={25}
                  color={Colors.light.tint}
                  style={[
                    styles.headerRightIcon,
                    { opacity: pressed ? 0.5 : 1 },
                  ]}
                />
              )}
            </Pressable>
          </View>
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: "row",
  },

  headerRightIcon: {
    marginHorizontal: 10,
  },
});
