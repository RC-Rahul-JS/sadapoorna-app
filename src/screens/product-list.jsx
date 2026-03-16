import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

import React, { useMemo, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const THEME = {
  bg: "#FFFFFF",
  primary: "#EE2726",
  accent: "#eac15a",
  secondaryBg: "#f8efda",
  textMain: "#000000",
  textMuted: "#666666",
  border: "#EEEEEE",
};

const DUMMY_PRODUCTS = [
  { name: "Imperial Basmati", category: "Grains", stock: "In Stock" },
  { name: "Black Forbidden Rice", category: "Superfood", stock: "In Stock" },
  { name: "Organic Brown Rice", category: "Grains", stock: "Low Stock" },
  { name: "Pure Mustard Oil", category: "Oils", stock: "In Stock" },
  { name: "Organic Tur Dal", category: "Pulses", stock: "In Stock" },
  { name: "Farm Fresh Wheat", category: "Grains", stock: "In Stock" },
];

export default function ProductListScreen() {
    const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return DUMMY_PRODUCTS.filter((prod) =>
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Brand Background Layer */}
      <View style={styles.secondBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Modern Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.miniBack}
          >
            <Ionicons name="chevron-back" size={24} color={THEME.textMain} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Inventory</Text>
          <View style={{ width: 42 }} />
        </View>

        <View style={styles.content}>
          {/* Working Search Bar */}
          <View style={styles.searchBarContainer}>
            <Ionicons
              name="search"
              size={18}
              color={THEME.textMuted}
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Search inventory..."
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={THEME.textMuted}
            />
          </View>

          <Text style={styles.noteText}>
            Current items available in Sadapoorna warehouse.
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            {filteredProducts.map((prod, index) => (
              <View key={index} style={styles.miniCard}>
                <View style={styles.iconCircle}>
                  <Ionicons name="leaf" size={20} color={THEME.accent} />
                </View>

                <View style={styles.infoArea}>
                  <View style={styles.row}>
                    <Text style={styles.productName}>{prod.name}</Text>
                    <View
                      style={[
                        styles.stockBadge,
                        {
                          backgroundColor:
                            prod.stock === "Low Stock" ? "#FFF0F0" : "#F0FFF4",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.stockText,
                          {
                            color:
                              prod.stock === "Low Stock"
                                ? THEME.primary
                                : "#2F855A",
                          },
                        ]}
                      >
                        {prod.stock}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.categoryText}>
                    {prod.category} • Sadapoorna Pure
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  secondBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: THEME.secondaryBg,
    zIndex: -1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
    paddingBottom: 15,
  },
  miniBack: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: { fontSize: 20, fontWeight: "900", color: THEME.textMain },
  content: { flex: 1, paddingHorizontal: 20 },

  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: THEME.textMain,
  },

  noteText: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 15,
    fontWeight: "600",
    marginLeft: 5,
  },

  miniCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.border,
    elevation: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFF9EA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoArea: { flex: 1 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: { fontSize: 15, fontWeight: "800", color: THEME.textMain },
  categoryText: {
    fontSize: 12,
    color: THEME.textMuted,
    fontWeight: "500",
    marginTop: 2,
  },

  stockBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  stockText: { fontSize: 10, fontWeight: "800", textTransform: "uppercase" },
});
