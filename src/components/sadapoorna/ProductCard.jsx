import Ionicons from 'react-native-vector-icons/Ionicons';

import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.43;

const THEME = {
  card: "#FFFFFF",
  primary: "#EE2726",
  textMain: "#000000",
  border: "#EEEEEE",
};


export const ProductCard = ({ item, onAddPress }) => {
  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={onAddPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImg} />
        <View style={[styles.tag, { backgroundColor: THEME.primary }]}>
          <Text style={{ color: "#FFF", fontSize: 9, fontWeight: "800" }}>
            {item.tag}
          </Text>
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.priceText}>₹{item.price}</Text>
            <Text style={styles.perKg}>per kg</Text>
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={onAddPress}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: ITEM_WIDTH,
    backgroundColor: THEME.card,
    borderRadius: 25,
    marginBottom: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: THEME.border,
    // Add shadow for a premium feel
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  imageContainer: {
    width: "100%",
    height: 120,
    borderRadius: 20,
    overflow: "hidden",
  },
  productImg: { width: "100%", height: "100%", resizeMode: "cover" },
  productInfo: { paddingVertical: 10, paddingHorizontal: 5 },
  tag: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "800",
    color: THEME.textMain,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: { fontSize: 18, fontWeight: "900", color: THEME.textMain },
  perKg: { fontSize: 10, color: "#666", fontWeight: "600" },
  addBtn: {
    backgroundColor: "#000",
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
