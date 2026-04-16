import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import React, { use, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// --- COMPONENTS ---
import { Navbar } from "./Navbar";
import { CartDrawer } from "./CartDrawer";
import { ProductCard } from "./ProductCard";
import { ProductSelectionModal } from "./ProductSelectionModal";
import { PromiseSection } from "./PromiseSection";
import { PromoBanners } from "./PromoBanners";
import { QuickActions } from "./QuickActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import Footer from './Footer';

const { width } = Dimensions.get("window");

const THEME = {
  bg: "#FFFFFF",
  primary: "#EE2726",
  accent: "#eac15a",
  textMain: "#000000",
  textMuted: "#666666",
  border: "#EEEEEE",
  secondaryBg: "#f8efda",
};

const ALL_PRODUCTS = Array.from({ length: 100 }).map((_, i) => {
  const base = [
    {     
      name: "Imperial Basmati",
      price: 120,
      tag: "Best Seller",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    },
    {
      name: "Black Forbidden",
      price: 350,
      tag: "Superfood",
      image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400",
    },
    {
      name: "Organic Brown",
      price: 150,
      tag: "Fiber Rich",
      image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400",
    },
    {
      name: "Pure Mustard Oil",
      price: 210,
      tag: "Cold Pressed",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    },
  ];
  const pick = base[i % 4];
  return { ...pick, id: `item-${i}`, name: `${pick.name} ${i + 1}` };
});



export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [limit, setLimit] = useState(12);

  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const navigation = useNavigation();

  const openURL = (url) => Linking.openURL(url);

  const [user, setUser] = useState(null);
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem("userData");

    if (data) {
      const parsedUser = JSON.parse(data);
      setUser(parsedUser);
    }else {
      navigation.replace("Home");
    }
  };

  const filteredData = useMemo(() => {
    let data = [...ALL_PRODUCTS];
    if (searchQuery)
      data = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    if (sortOrder === "low") data.sort((a, b) => a.price - b.price);
    else if (sortOrder === "high") data.sort((a, b) => b.price - a.price);
    return data.slice(0, limit);
  }, [searchQuery, sortOrder, limit]);

  const onAddProductToCart = (product, weight, qty) => {
    const newItem = {
      ...product,
      cartId: `${product.id}-${weight}-${Date.now()}`,
      selectedWeight: weight,
      quantity: qty,
      totalItemPrice: product.price * weight * qty,
    };
    setCart([...cart, newItem]);
    setShowWeightModal(false);
    Alert.alert("Added!", "Product added to your bag.");
  };

  const onFinalOrder = () => {
    Alert.alert("Order Placed!", "Your order is successfully placed. ✨");
    setCart([]);
    setShowCartDrawer(false);
  };

  // --- REORDERED HEADER ---
  const Header = () => (
    <View style={styles.header}>
      <LinearGradient
        colors={["#efd697", "#FFFFFF"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.backgroundGradient}
      />

      <View style={styles.helloContainer}>
      <View>
        <Text style={styles.helloText}>Welcome Back,</Text>

        {/* 🔹 Dynamic Name */}
        <Text style={styles.userName}>
          {user?.owner_name || "User"} ✨
        </Text>

        {/* 🔹 Optional: Show shop name */}
        <Text style={{ fontSize: 12, color: "gray" }}>
          {user?.shop_name}
        </Text>
      </View>
    </View>

      {/* 2. Banners (Moved here, directly below Rahul) */}
      <View style={{ marginBottom: 15 }}>
        <PromoBanners />
      </View>

      {/* 3. Secondary Info Sections */}
      <PromiseSection />
      <QuickActions />

      {/* 4. Search Bar */}
      {/* <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={THEME.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search items..."
          style={styles.searchInput}
          placeholderTextColor={THEME.textMuted}
          value={searchQuery}
          onChangeText={(t) => {
            setSearchQuery(t);
            setLimit(12);
          }}
        />
      </View> */}

      {/* 5. Note Section */}
      {/* <View style={styles.noteContainer}>
        <View style={styles.noteHeader}>
          <Ionicons name="alert-circle" size={16} color={THEME.primary} />
          <Text style={styles.noteTitle}> Note:</Text>
        </View>
        <Text style={styles.noteText}>
          Order directly for{" "}
          <Text style={{ fontWeight: "900", color: THEME.primary }}>
            100% purity
          </Text>
          .
        </Text>
      </View> */}

      {/* 6. Filter Chips */}
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
      >
        {["low", "high"].map((order) => (
          <TouchableOpacity
            key={order}
            style={[
              styles.filterChip,
              sortOrder === order && styles.filterChipActive,
            ]}
            onPress={() => setSortOrder(sortOrder === order ? "none" : order)}
          >
            <Text
              style={[
                styles.filterChipText,
                sortOrder === order && styles.filterChipTextActive,
              ]}
            >
              ₹ {order === "low" ? "Low to High" : "High to Low"}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <Text style={styles.sectionTitle}>Popular Products</Text> */}
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.secondBackground} />
        <LinearGradient
          colors={["#eac15a", "#FFFFFF"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.navBackgroundGradient}
        />

        <Navbar
          cartCount={cart.length}
          onCartPress={() => setShowCartDrawer(true)}
        />

        <FlatList
          data={filteredData}
          ListHeaderComponent={Header}
          ListFooterComponent={() => (
            <View>
              {/* {filteredData.length >= limit && (
                <View style={styles.seeMoreContainer}>
                  <TouchableOpacity
                    style={styles.seeMoreBtn}
                    onPress={() => setLimit((prev) => prev + 12)}
                  >
                    <Text style={styles.seeMoreText}>See More Products</Text>
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color={THEME.primary}
                    />
                  </TouchableOpacity>
                </View>
              )} */}
              <Footer />
            </View>
          )}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.scrollContent}
          // renderItem={({ item }) => (
          // <ProductCard
          //     item={item}
          //     onAddPress={() => {
          //       setSelectedProduct(item);
          //       setShowWeightModal(true);
          //     }}
          //   />
          // )}
        />

        <ProductSelectionModal
          visible={showWeightModal}
          product={selectedProduct}
          onClose={() => setShowWeightModal(false)}
          onAdd={onAddProductToCart}
        />

        <CartDrawer
          visible={showCartDrawer}
          cart={cart}
          onClose={() => setShowCartDrawer(false)}
          onCheckout={onFinalOrder}
        />
      </View>
    </GestureHandlerRootView>
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
    zIndex: -2,
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: -25,
    right: -25,
    height: 870,
    zIndex: -1,
  },
  navBackgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: -1,
  },
  header: { paddingHorizontal: 25, paddingTop: 10 },
  helloContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10, // Reduced to sit closer to banner
  },
  helloText: { color: THEME.textMuted, fontSize: 14 },
  userName: { fontSize: 28, fontWeight: "900", color: THEME.textMain },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: THEME.textMain,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 50,
    borderWidth: 1,
    borderColor: THEME.border,
    backgroundColor: "#FFF",
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: THEME.textMain,
  },
  noteContainer: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: THEME.primary,
    backgroundColor: "rgba(238, 39, 38, 0.05)",
  },
  noteHeader: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  noteTitle: { fontWeight: "900", fontSize: 14, color: THEME.primary },
  noteText: { fontSize: 12, color: THEME.textMuted, lineHeight: 18 },
  filterBar: { marginBottom: 20, flexDirection: "row" },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#FFF",
    marginRight: 10,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  filterChipActive: {
    backgroundColor: THEME.textMain,
    borderColor: THEME.textMain,
  },
  filterChipText: { fontSize: 12, fontWeight: "700", color: THEME.textMuted },
  filterChipTextActive: { color: "#FFF" },
  // scrollContent: { paddingBottom: 30 },
  columnWrapper: { justifyContent: "space-between", paddingHorizontal: 25 },
  seeMoreContainer: { paddingHorizontal: 25, marginTop: 10 },
  seeMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 15,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: THEME.primary,
  },
  seeMoreText: {
    color: THEME.primary,
    fontWeight: "800",
    fontSize: 15,
    marginRight: 8,
  },
  footerBrand: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: THEME.secondaryBg,
    marginTop: 10,
  },
  footerLogo: {
    width: 140,
    height: 50,
    resizeMode: "contain",
    marginBottom: 5,
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  socialRow: { flexDirection: "row", marginBottom: 25 },
 managedByContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#F9F9F9", // Very subtle grey
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 15
  },
  managedByText: {
    fontSize: 11,
    color: THEME.textMuted,
    fontWeight: "500",
  },
  brandText: {
    color: THEME.primary, // Using your red for the brand name
    fontWeight: "700",
  },
  duniyapeLogo: { width: 70, height: 25, resizeMode: "contain" },
  copyright: { fontSize: 10, color: THEME.textMuted, marginBottom: 20 },
});