import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

const THEME = { textMain: "#000000", border: "#EEEEEE" };

const QUICK_ACTIONS = [
  { label: "My Order", icon: "cube-outline", route: "/my-orders" },
  { label: "My Bill", icon: "receipt-outline", route: "/my-bills" },
  { label: "Payments", icon: "card-outline", route: "/payments" },
  { label: "Product List", icon: "list-outline", route: "/product-list" },
  { label: "About Us", icon: "business-outline", route: "/about-us" },
  { label: "Contact Us", icon: "call-outline", route: "/contact-us" },
  { label: "Profile", icon: "person-outline", route: "/profile" },
  { label: "Tracker", icon: "location-outline", route: "/tracker" },
  { label: "Wishlist", icon: "heart-outline", route: "/wishlist" },
  { label: "Offers", icon: "pricetag-outline", route: "/offers" },
  { label: "Settings", icon: "settings-outline", route: "/settings" },
  { label: "Help", icon: "help-buoy-outline", route: "/help" },
];

export const QuickActions = () => {
  const router = useNavigation();

  return (
    <>
      <Text style={styles.sectionTitle}>Dashboard Actions</Text>
      <View style={styles.quickActionGrid}>
        {QUICK_ACTIONS.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.gridItem}
            onPress={() => {
              if (item.route) router.navigate(item.route);
            }}
          >
            <View
              style={[
                styles.actionIcon,
                {
                  backgroundColor: "#F9F9F9",
                  borderWidth: 1,
                  borderColor: THEME.border,
                },
              ]}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={THEME.textMain}
              />
            </View>
            <Text style={styles.actionLabel} numberOfLines={1}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: THEME.textMain,
    marginBottom: 15,
  },
  quickActionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  gridItem: { width: (width - 50) / 4, alignItems: "center", marginBottom: 20 },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  actionLabel: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: "700",
    color: THEME.textMain,
    textAlign: "center",
  },
});
