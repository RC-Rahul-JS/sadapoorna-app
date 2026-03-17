import React from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const THEME = {
  bg: "#FFFFFF",
  primary: "#EE2726",
  accent: "#eac15a",
  secondaryBg: "#f8efda",
  textMain: "#000000",
  textMuted: "#666666",
  border: "#EEEEEE",
};

const WISHLIST = [
  { id: 1, name: "Imperial Basmati", price: "₹120", weight: "1kg", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400" },
  { id: 2, name: "Pure Mustard Oil", price: "₹210", weight: "1Ltr", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400" },
];

export default function WishlistScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.secondBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.miniBack}
          >
            <Ionicons name="chevron-back" size={24} color={THEME.textMain} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Wishlist</Text>
          <View style={{ width: 42 }} />
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          {WISHLIST.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="heart-dislike-outline" size={80} color={THEME.border} />
              <Text style={styles.emptyTitle}>Wishlist is Empty</Text>
              <Text style={styles.emptySub}>Save your favorite items here!</Text>
            </View>
          ) : (
            WISHLIST.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.infoContainer}>
                  <View>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemSub}>{item.weight} • High Quality</Text>
                  </View>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
                <View style={styles.actionContainer}>
                  <TouchableOpacity style={styles.removeBtn}>
                    <Ionicons name="trash-outline" size={20} color={THEME.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cartBtn}>
                    <Ionicons name="cart-outline" size={20} color="#FFF" />
                    <Text style={styles.cartBtnText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  secondBackground: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: THEME.secondaryBg,
    zIndex: -1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    // FIX: Fallback to 0 if currentHeight is undefined
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 10 : 10,
    paddingBottom: 15,
  },
  miniBack: {
    width: 42, height: 42, borderRadius: 14,
    backgroundColor: "#FFF", justifyContent: "center", alignItems: "center",
    elevation: 4, shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3,
  },
  headerTitle: { fontSize: 18, fontWeight: "900", color: THEME.textMain },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 30 },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 22,
    marginBottom: 15,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.border,
    elevation: 3,
  },
  itemImage: { width: 70, height: 70, borderRadius: 15, backgroundColor: THEME.secondaryBg },
  infoContainer: { flex: 1, paddingHorizontal: 15, justifyContent: 'space-between', height: 70 },
  itemName: { fontSize: 15, fontWeight: "800", color: THEME.textMain },
  itemSub: { fontSize: 11, color: THEME.textMuted, marginTop: 2 },
  itemPrice: { fontSize: 16, fontWeight: "900", color: THEME.primary },
  actionContainer: { alignItems: "center", justifyContent: "space-between", height: 75 },
  removeBtn: { padding: 5 },
  cartBtn: { backgroundColor: THEME.textMain, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  cartBtnText: { color: "#FFF", fontSize: 12, fontWeight: "800", marginLeft: 5 },
  emptyContainer: { alignItems: "center", marginTop: 100 },
  emptyTitle: { fontSize: 20, fontWeight: "900", color: THEME.textMain, marginTop: 20 },
  emptySub: { fontSize: 14, color: THEME.textMuted, marginTop: 5 }
});