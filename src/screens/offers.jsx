import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
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

export default function OffersScreen() {
 const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={THEME.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Active Offers</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.offerCard}>
          <Text style={styles.offerTitle}>Flat 20% Off</Text>
          <Text style={styles.offerDesc}>
            On your first order of Organic Pulses.
          </Text>
          <View style={styles.codeRow}>
            <Text style={styles.codeText}>ORGANIC20</Text>
            <TouchableOpacity>
              <Text style={styles.copyText}>COPY</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  offerCard: {
    backgroundColor: THEME.cardBg,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: THEME.primary,
    borderStyle: "dashed",
    marginBottom: 15,
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: THEME.primary,
    marginBottom: 5,
  },
  offerDesc: { fontSize: 14, color: THEME.textMuted, marginBottom: 15 },
  codeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: THEME.bg,
    padding: 10,
    borderRadius: 8,
  },
  codeText: {
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 2,
    color: THEME.textMain,
  },
  copyText: { fontSize: 12, fontWeight: "800", color: THEME.primary },
});
