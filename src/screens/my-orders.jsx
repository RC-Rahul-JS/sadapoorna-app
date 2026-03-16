import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import {
  LayoutAnimation,
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

const ORDER_STATUSES = ["All", "Pending", "Delivery", "Done", "Cancel"];

const DUMMY_ORDERS = [
  {
    id: "ORD-001",
    status: "Pending",
    items: "Basmati x2",
    date: "18 Feb",
    price: "₹1200",
    color: "#FFA500",
  },
  {
    id: "ORD-002",
    status: "Delivery",
    items: "Mustard Oil x1",
    date: "17 Feb",
    price: "₹2100",
    color: "#2196F3",
  },
  {
    id: "ORD-003",
    status: "Done",
    items: "Brown Rice x5",
    date: "10 Feb",
    price: "₹3750",
    color: "#4CAF50",
  },
];

export default function MyOrdersScreen() {
 const navigation = useNavigation();
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Filter Logic: Status + Search Query
  const filteredOrders = useMemo(() => {
    return DUMMY_ORDERS.filter((order) => {
      const matchesStatus =
        activeStatus === "All" || order.status === activeStatus;
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [activeStatus, searchQuery]);

  const toggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) setSearchQuery(""); // Clear search when closing
  };

  return (
    <View style={styles.container}>
      {/* <Stack.Screen options={{}} /> */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.secondBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Modern Searchable Header */}
        <View style={styles.header}>
          {!isSearchActive ? (
            <>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.miniBack}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={THEME.textMain}
                />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Orders</Text>

              <TouchableOpacity style={styles.miniBack} onPress={toggleSearch}>
                <Ionicons name="search" size={20} color={THEME.textMuted} />
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.searchBarContainer}>
              <TouchableOpacity
                onPress={toggleSearch}
                style={styles.searchBackBtn}
              >
                <Ionicons name="close" size={20} color={THEME.textMain} />
              </TouchableOpacity>
              <TextInput
                placeholder="Search Order ID or Item..."
                style={styles.searchInput}
                autoFocus
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor={THEME.textMuted}
              />
            </View>
          )}
        </View>

        <View style={styles.content}>
          {/* Tabs */}
          <View style={styles.tabBar}>
            {ORDER_STATUSES.map((status) => (
              <TouchableOpacity
                key={status}
                onPress={() => setActiveStatus(status)}
                style={styles.tab}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeStatus === status && styles.tabTextActive,
                  ]}
                >
                  {status}
                </Text>
                {activeStatus === status && <View style={styles.activeLine} />}
              </TouchableOpacity>
            ))}
          </View>

          {/* List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }}
          >
            {filteredOrders.length === 0 ? (
              <View style={styles.emptyBox}>
                <Ionicons
                  name="search-outline"
                  size={50}
                  color={THEME.border}
                />
                <Text style={styles.emptyText}>No matching orders found</Text>
              </View>
            ) : (
              filteredOrders.map((order) => (
                <TouchableOpacity
                  key={order.id}
                  style={styles.miniCard}
                  activeOpacity={0.7}
                >
                  <View style={styles.iconCircle}>
                    <Ionicons name="cube" size={20} color={THEME.accent} />
                  </View>

                  <View style={styles.infoArea}>
                    <View style={styles.row}>
                      <Text style={styles.orderId}>{order.id}</Text>
                      <Text style={styles.priceText}>{order.price}</Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.itemsText}>
                        {order.items} • {order.date}
                      </Text>
                      <View style={styles.statusRow}>
                        <View
                          style={[styles.dot, { backgroundColor: order.color }]}
                        />
                        <Text
                          style={[
                            styles.statusMiniText,
                            { color: order.color },
                          ]}
                        >
                          {order.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
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
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: { fontSize: 20, fontWeight: "900", color: THEME.textMain },

  // New Search Styles
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 14,
    paddingHorizontal: 10,
    height: 45,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchBackBtn: { padding: 5, marginRight: 5 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: THEME.textMain,
  },

  content: { flex: 1, paddingHorizontal: 20 },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  tab: { paddingVertical: 10, alignItems: "center", flex: 1 },
  tabText: { fontSize: 13, fontWeight: "600", color: THEME.textMuted },
  tabTextActive: { color: THEME.textMain, fontWeight: "800" },
  activeLine: {
    position: "absolute",
    bottom: -1,
    width: "50%",
    height: 3,
    backgroundColor: THEME.primary,
    borderRadius: 10,
  },
  miniCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 20,
    marginBottom: 12,
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
    marginBottom: 3,
  },
  orderId: { fontSize: 15, fontWeight: "800", color: THEME.textMain },
  priceText: { fontSize: 15, fontWeight: "900", color: THEME.primary },
  itemsText: { fontSize: 12, color: THEME.textMuted, fontWeight: "500" },
  statusRow: { flexDirection: "row", alignItems: "center" },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  statusMiniText: {
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  emptyBox: { alignItems: "center", marginTop: 50 },
  emptyText: { color: THEME.textMuted, fontWeight: "600", marginTop: 10 },
});
