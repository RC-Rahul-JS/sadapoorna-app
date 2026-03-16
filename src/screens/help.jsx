import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';

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

export default function HelpScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={THEME.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & FAQ</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.faqCard}>
          <Text style={styles.faqTitle}>How to cancel an order?</Text>
          <Ionicons name="chevron-down" size={20} color={THEME.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.faqCard}>
          <Text style={styles.faqTitle}>Delivery times and fees?</Text>
          <Ionicons name="chevron-down" size={20} color={THEME.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.faqCard}>
          <Text style={styles.faqTitle}>Refund Policy</Text>
          <Ionicons name="chevron-down" size={20} color={THEME.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.chatBtn}>
          <Ionicons
            name="chatbubbles"
            size={20}
            color="#FFF"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.chatText}>Chat with Support</Text>
        </TouchableOpacity>
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
  faqCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: THEME.cardBg,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  faqTitle: { fontSize: 16, fontWeight: "600", color: THEME.textMain },
  chatBtn: {
    flexDirection: "row",
    backgroundColor: THEME.textMain,
    padding: 18,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  chatText: { color: "#FFF", fontWeight: "800", fontSize: 16 },
});
