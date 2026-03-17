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
  Clipboard,
  Alert
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

const OFFERS = [
  {
    id: 1,
    title: "Flat 20% Off",
    desc: "Valid on your first order of Organic Pulses & Dals.",
    code: "FRESH20",
    color: "#EE2726",
  },
  {
    id: 2,
    title: "Extra ₹100 Off",
    desc: "Flat discount on orders above ₹1500 using UPI.",
    code: "SADA100",
    color: "#2E7D32", // Green accent for savings
  },
  {
    id: 3,
    title: "Buy 1 Get 1",
    desc: "Get free packing on selected Premium Basmati variants.",
    code: "BOGOFREE",
    color: "#FB8C00", // Orange accent
  },
];

export default function OffersScreen() {
  const navigation = useNavigation();

  const copyToClipboard = (code) => {
    // Clipboard.setString(code); // Requires @react-native-clipboard/clipboard
    Alert.alert("Coupon Copied", `${code} has been copied to your clipboard!`);
  };

  return (
    <View style={styles.container}>
      {/* Consistent Translucent StatusBar */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Background layer */}
      <View style={styles.secondBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Consistent Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.miniBack}
          >
            <Ionicons name="chevron-back" size={24} color={THEME.textMain} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Active Offers</Text>
          <View style={{ width: 42 }} />
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          {/* Promo Section */}
          <View style={styles.promoBanner}>
            <Ionicons name="gift-outline" size={40} color={THEME.accent} />
            <View style={styles.promoTextContainer}>
              <Text style={styles.promoTitle}>Exclusive Deals</Text>
              <Text style={styles.promoSub}>Handpicked savings just for you, Rahul!</Text>
            </View>
          </View>

          {OFFERS.map((item) => (
            <View key={item.id} style={[styles.offerCard, { borderLeftColor: item.color }]}>
              <View style={styles.cardHeader}>
                <View style={styles.iconCircle}>
                   <Ionicons name="pricetag" size={18} color={item.color} />
                </View>
                <Text style={[styles.offerTitle, { color: item.color }]}>{item.title}</Text>
              </View>
              
              <Text style={styles.offerDesc}>{item.desc}</Text>

              <View style={styles.dashLine} />

              <View style={styles.codeRow}>
                <View style={styles.codeLabelContainer}>
                   <Text style={styles.codeLabel}>COUPON CODE</Text>
                   <Text style={styles.codeText}>{item.code}</Text>
                </View>
                <TouchableOpacity 
                  onPress={() => copyToClipboard(item.code)}
                  style={[styles.copyBtn, { backgroundColor: item.color }]}
                >
                  <Text style={styles.copyText}>COPY</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
          <Text style={styles.footerNote}>Terms & Conditions apply to all coupons.</Text>
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
    // Safe View Fix for Android & iOS
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
  scrollContent: { paddingHorizontal: 20, paddingBottom: 30 },

  promoBanner: {
    flexDirection: 'row',
    backgroundColor: THEME.textMain,
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  promoTextContainer: { marginLeft: 15 },
  promoTitle: { color: "#FFF", fontSize: 18, fontWeight: "900" },
  promoSub: { color: "#AAA", fontSize: 11, marginTop: 2, fontWeight: "600" },

  offerCard: {
    backgroundColor: "#FFF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: THEME.border,
    borderLeftWidth: 6, // Thick colored accent on the left
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  iconCircle: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: "#F5F5F5", justifyContent: "center", alignItems: "center",
    marginRight: 10
  },
  offerTitle: { fontSize: 20, fontWeight: "900" },
  offerDesc: { fontSize: 13, color: THEME.textMuted, lineHeight: 18, marginBottom: 15 },
  
  dashLine: {
    height: 1,
    backgroundColor: THEME.border,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    marginBottom: 15,
  },

  codeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  codeLabelContainer: { flex: 1 },
  codeLabel: { fontSize: 10, fontWeight: "800", color: THEME.textMuted, letterSpacing: 0.5 },
  codeText: { fontSize: 18, fontWeight: "900", color: THEME.textMain, letterSpacing: 1 },
  
  copyBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  copyText: { fontSize: 12, fontWeight: "900", color: "#FFF" },
  footerNote: { textAlign: 'center', color: THEME.textMuted, fontSize: 11, marginTop: 10, fontWeight: "600" }
});