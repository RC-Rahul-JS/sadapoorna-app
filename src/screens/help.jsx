import React, { useState } from "react";
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
  Linking,
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

const FAQ_DATA = [
  { id: 1, question: "How to cancel an order?", answer: "Go to My Orders, select your active order, and tap 'Cancel Order' before it is packed." },
  { id: 2, question: "Delivery times and fees?", answer: "We usually deliver within 2-4 business days. Fees depend on your location and order value." },
  { id: 3, question: "Refund Policy", answer: "Refunds are processed within 5-7 working days after the quality check of the returned item." },
  { id: 4, question: "Is your rice 100% Organic?", answer: "Yes, Sadapoorna guarantees 100% organic and pesticide-free grains direct from farms." },
];

export default function HelpScreen() {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleWhatsAppSupport = () => {
    Linking.openURL('whatsapp://send?phone=91XXXXXXXXXX&text=Hello Sadapoorna Support!');
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
          <Text style={styles.headerTitle}>Help & FAQ</Text>
          <View style={{ width: 42 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Support Banner */}
          <View style={styles.supportBanner}>
            <View style={styles.iconCircleLarge}>
              <Ionicons name="headset" size={30} color={THEME.primary} />
            </View>
            <Text style={styles.bannerTitle}>How can we help?</Text>
            <Text style={styles.bannerSub}>We are here to assist you 24/7</Text>
          </View>

          <Text style={styles.sectionLabel}>Frequently Asked Questions</Text>
          
          {FAQ_DATA.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              activeOpacity={0.7} 
              onPress={() => toggleExpand(item.id)}
              style={[styles.faqCard, expanded === item.id && styles.faqCardActive]}
            >
              <View style={styles.faqHeader}>
                <Text style={[styles.faqTitle, expanded === item.id && { color: THEME.primary }]}>
                  {item.question}
                </Text>
                <Ionicons 
                  name={expanded === item.id ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={expanded === item.id ? THEME.primary : THEME.textMuted} 
                />
              </View>
              {expanded === item.id && (
                <View style={styles.answerContainer}>
                  <Text style={styles.faqAnswer}>{item.answer}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}

          {/* Contact Methods */}
          <Text style={styles.sectionLabel}>Direct Contact</Text>
          
          <TouchableOpacity style={styles.chatBtn} onPress={handleWhatsAppSupport}>
            <Ionicons name="logo-whatsapp" size={22} color="#FFF" style={{ marginRight: 12 }} />
            <Text style={styles.chatText}>Chat on WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.emailBtn} 
            onPress={() => Linking.openURL('mailto:support@sadapoorna.in')}
          >
            <Ionicons name="mail-outline" size={22} color={THEME.textMain} style={{ marginRight: 12 }} />
            <Text style={styles.emailText}>Email Support</Text>
          </TouchableOpacity>

          <Text style={styles.footerNote}>Typically responds within 2 hours</Text>
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

  supportBanner: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: THEME.border,
    elevation: 4, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10
  },
  iconCircleLarge: {
    width: 60, height: 60, borderRadius: 20,
    backgroundColor: THEME.secondaryBg,
    justifyContent: 'center', alignItems: 'center', marginBottom: 15
  },
  bannerTitle: { fontSize: 20, fontWeight: "900", color: THEME.textMain },
  bannerSub: { fontSize: 13, color: THEME.textMuted, marginTop: 4, fontWeight: "600" },

  sectionLabel: { 
    fontSize: 12, fontWeight: "800", color: THEME.textMuted, 
    textTransform: "uppercase", marginBottom: 12, marginLeft: 5 
  },
  faqCard: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  faqCardActive: { borderColor: THEME.primary, elevation: 2 },
  faqHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  faqTitle: { fontSize: 15, fontWeight: "700", color: THEME.textMain, flex: 0.9 },
  answerContainer: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: THEME.border },
  faqAnswer: { fontSize: 13, color: THEME.textMuted, lineHeight: 18, fontWeight: "500" },

  chatBtn: {
    flexDirection: "row",
    backgroundColor: "#25D366", // WhatsApp Green
    padding: 18,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 12
  },
  chatText: { color: "#FFF", fontWeight: "900", fontSize: 15 },
  
  emailBtn: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.border
  },
  emailText: { color: THEME.textMain, fontWeight: "900", fontSize: 15 },
  footerNote: { textAlign: 'center', color: THEME.textMuted, fontSize: 11, marginTop: 15, fontWeight: "600" }
});