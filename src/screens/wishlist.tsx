import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const THEME = {
  bg: "#FFFFFF",
  primary: "#EE2726",
  textMain: "#000000",
  textMuted: "#666666",
  border: "#EEEEEE",
  cardBg: "#F9F9F9",
};
const WISHLIST = ["Imperial Basmati", "Pure Mustard Oil"];

export default function WishlistScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={THEME.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {WISHLIST.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="heart"
                size={24}
                color={THEME.primary}
                style={{ marginRight: 15 }}
              />
              <Text style={styles.itemName}>{item}</Text>
            </View>
            <TouchableOpacity style={styles.cartBtn}>
              <Ionicons name="cart" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.cardBg,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.border,
  },
  headerTitle: { fontSize: 18, fontWeight: "900", color: THEME.textMain },
  content: { padding: 20 },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: THEME.cardBg,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  itemName: { fontSize: 16, fontWeight: "700", color: THEME.textMain },
  cartBtn: { backgroundColor: THEME.textMain, padding: 10, borderRadius: 10 },
});
