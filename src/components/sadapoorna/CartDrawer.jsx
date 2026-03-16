import Ionicons from 'react-native-vector-icons/Ionicons';
import React from "react";
import {
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const THEME = { primary: "#EE2726", textMain: "#000000", border: "#EEEEEE" };

export const CartDrawer = ({ visible, cart, onClose, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.totalItemPrice, 0);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Bag ({cart.length})</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={cart}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.img} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.sub}>
                  {item.selectedWeight}kg | Qty: {item.quantity}
                </Text>
              </View>
              <Text style={styles.price}>₹{item.totalItemPrice}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Your bag is empty</Text>
          }
          contentContainerStyle={{ paddingHorizontal: 25 }}
        />

        {cart.length > 0 && (
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Price</Text>
              <Text style={styles.totalVal}>₹{total}</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={onCheckout}>
              <Text style={styles.btnText}>Proceed to Order</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", paddingTop: 50 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "900" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  img: { width: 60, height: 60, borderRadius: 12, marginRight: 15 },
  name: { fontSize: 16, fontWeight: "800" },
  sub: { fontSize: 12, color: "#666" },
  price: { fontSize: 18, fontWeight: "900", color: THEME.primary },
  empty: { textAlign: "center", marginTop: 50, fontSize: 16, color: "#999" },
  footer: { padding: 25, borderTopWidth: 1, borderColor: "#EEE" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  totalLabel: { fontSize: 16, fontWeight: "600", color: "#666" },
  totalVal: { fontSize: 24, fontWeight: "900" },
  btn: {
    backgroundColor: THEME.primary,
    flexDirection: "row",
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { color: "#FFF", fontSize: 18, fontWeight: "900", marginRight: 10 },
});
