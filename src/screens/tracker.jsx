import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    SafeAreaView,
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

export default function TrackerScreen() {
 const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={THEME.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Tracker</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.orderId}>Tracking: ORD-002</Text>
        <View style={styles.trackCard}>
          {["Order Placed", "Packed", "Out for Delivery", "Delivered"].map(
            (step, index) => (
              <View key={index} style={styles.stepRow}>
                <View style={styles.nodeContainer}>
                  <View
                    style={[styles.node, index <= 2 ? styles.nodeActive : {}]}
                  />
                  {index < 3 && (
                    <View
                      style={[styles.line, index < 2 ? styles.lineActive : {}]}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.stepText,
                    index <= 2 ? styles.stepTextActive : {},
                  ]}
                >
                  {step}
                </Text>
              </View>
            ),
          )}
        </View>
      </View>
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
  orderId: {
    fontSize: 18,
    fontWeight: "900",
    color: THEME.primary,
    marginBottom: 20,
  },
  trackCard: {
    backgroundColor: THEME.cardBg,
    padding: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  stepRow: { flexDirection: "row", alignItems: "flex-start", height: 70 },
  nodeContainer: { alignItems: "center", marginRight: 15, width: 20 },
  node: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: THEME.border,
    zIndex: 1,
  },
  nodeActive: { backgroundColor: THEME.primary },
  line: {
    width: 2,
    height: 56,
    backgroundColor: THEME.border,
    position: "absolute",
    top: 14,
  },
  lineActive: { backgroundColor: THEME.primary },
  stepText: { fontSize: 16, fontWeight: "600", color: THEME.textMuted },
  stepTextActive: { color: THEME.textMain, fontWeight: "900" },
});
