import Ionicons from 'react-native-vector-icons/Ionicons';

import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");
const THEME = { primary: "#EE2726", textMain: "#000000", textMuted: "#666666" };

export const ProductSelectionModal = ({ visible, product, onClose, onAdd }) => {
  const [weight, setWeight] = useState(5);
  const [qty, setQty] = useState(1);
  const weights = [5, 10, 20, 25, 30];

  useEffect(() => {
    if (visible) {
      setWeight(5);
      setQty(1);
    }
  }, [visible]);

  if (!product) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.heading}>Select Packaging</Text>

          <Text style={styles.label}>Choose Weight (kg):</Text>
          <View style={styles.grid}>
            {weights.map((w) => (
              <TouchableOpacity
                key={w}
                onPress={() => setWeight(w)}
                style={[styles.chip, weight === w && styles.chipActive]}
              >
                <Text
                  style={[
                    styles.chipText,
                    weight === w && styles.chipTextActive,
                  ]}
                >
                  {w} kg
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Quantity:</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity
              onPress={() => setQty(Math.max(1, qty - 1))}
              style={styles.qtyBtn}
            >
              <Ionicons name="remove" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{qty}</Text>
            <TouchableOpacity
              onPress={() => setQty(qty + 1)}
              style={styles.qtyBtn}
            >
              <Ionicons name="add" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.mainBtn}
            onPress={() => onAdd(product, weight, qty)}
          >
            <Text style={styles.mainBtnText}>
              Add to Bag • ₹{product.price * weight * qty}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: width * 0.85,
    backgroundColor: "#FFF",
    borderRadius: 30,
    padding: 25,
    alignItems: "center",
  },
  heading: { fontSize: 22, fontWeight: "900", marginBottom: 10 },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 15,
    color: "#444",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "center",
  },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    margin: 5,
  },
  chipActive: { backgroundColor: THEME.primary },
  chipText: { fontWeight: "700", color: "#666" },
  chipTextActive: { color: "#FFF" },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    padding: 5,
  },
  qtyBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
  },
  qtyText: { marginHorizontal: 20, fontSize: 18, fontWeight: "900" },
  mainBtn: {
    backgroundColor: "#000",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 25,
    alignItems: "center",
  },
  mainBtnText: { color: "#FFF", fontWeight: "800", fontSize: 16 },
  close: { marginTop: 15, color: THEME.textMuted, fontWeight: "600" },
});
