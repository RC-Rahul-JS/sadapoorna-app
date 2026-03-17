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
} from "react-native";
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

export default function TrackerScreen() {
  const navigation = useNavigation();

  const currentStep = 2; // 0: Placed, 1: Packed, 2: Out for Delivery, 3: Delivered

  const TRACKING_STEPS = [
    { title: "Order Placed", desc: "We have received your order", time: "10:30 AM" },
    { title: "Packed", desc: "Item is being prepared & quality checked", time: "11:45 AM" },
    { title: "Out for Delivery", desc: "Agent is on the way to your location", time: "02:15 PM" },
    { title: "Delivered", desc: "Enjoy your fresh Sadapoorna product", time: "" },
  ];

  return (
    <View style={styles.container}>
      {/* Same Status Bar as your other screens */}
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
          <Text style={styles.headerTitle}>Live Tracker</Text>
          <TouchableOpacity style={styles.miniBack}>
            <Ionicons name="help-circle-outline" size={20} color={THEME.textMuted} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Order Brief Info */}
          <View style={styles.topInfo}>
            <View>
              <Text style={styles.orderLabel}>Order ID</Text>
              <Text style={styles.orderId}>#ORD-002-SADA</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>In Transit</Text>
            </View>
          </View>

          {/* Vertical Tracker Card */}
          <View style={styles.trackCard}>
            {TRACKING_STEPS.map((step, index) => {
              const isActive = index <= currentStep;
              const isLast = index === TRACKING_STEPS.length - 1;

              return (
                <View key={index} style={styles.stepRow}>
                  <View style={styles.nodeContainer}>
                    {/* The Node/Circle */}
                    <View style={[styles.node, isActive && styles.nodeActive]}>
                      {isActive && <View style={styles.nodeInner} />}
                    </View>
                    
                    {/* The Connecting Line */}
                    {!isLast && (
                      <View style={[styles.line, index < currentStep && styles.lineActive]} />
                    )}
                  </View>

                  <View style={styles.stepContent}>
                    <View style={styles.stepHeader}>
                      <Text style={[styles.stepTitle, isActive && styles.textActive]}>{step.title}</Text>
                      <Text style={styles.stepTime}>{step.time}</Text>
                    </View>
                    <Text style={styles.stepDesc}>{step.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Delivery Partner Card */}
          <View style={styles.partnerCard}>
            <View style={styles.partnerLeft}>
              <View style={styles.partnerAvatar}>
                <Ionicons name="person" size={24} color={THEME.primary} />
              </View>
              <View>
                <Text style={styles.partnerLabel}>Delivery Partner</Text>
                <Text style={styles.partnerName}>Bhagchand Nageshwar</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.callBtn}>
              <Ionicons name="call" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.supportBtn}>
            <Text style={styles.supportBtnText}>View Order Details</Text>
          </TouchableOpacity>

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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
    paddingBottom: 15,
  },
  miniBack: {
    width: 42, height: 42, borderRadius: 14,
    backgroundColor: "#FFF", justifyContent: "center", alignItems: "center",
    elevation: 4, shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3,
  },
  headerTitle: { fontSize: 18, fontWeight: "900", color: THEME.textMain },
  scrollContent: { padding: 20 },

  topInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  orderLabel: { fontSize: 12, color: THEME.textMuted, fontWeight: "600" },
  orderId: { fontSize: 20, fontWeight: "900", color: THEME.textMain },
  statusBadge: {
    backgroundColor: THEME.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusText: { color: "#FFF", fontSize: 11, fontWeight: "800", textTransform: "uppercase" },

  trackCard: {
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 20,
    elevation: 4, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10
  },
  stepRow: { flexDirection: "row", minHeight: 80 },
  nodeContainer: { alignItems: "center", marginRight: 20 },
  node: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: THEME.border,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  nodeActive: { borderColor: THEME.primary },
  nodeInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: THEME.primary },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: THEME.border,
    marginVertical: -2,
    zIndex: 1,
  },
  lineActive: { backgroundColor: THEME.primary },

  stepContent: { flex: 1, paddingTop: 2 },
  stepHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  stepTitle: { fontSize: 15, fontWeight: "700", color: THEME.textMuted },
  textActive: { color: THEME.textMain, fontWeight: "900" },
  stepTime: { fontSize: 11, color: THEME.textMuted, fontWeight: "600" },
  stepDesc: { fontSize: 12, color: THEME.textMuted, marginTop: 4, lineHeight: 18 },

  partnerCard: {
    flexDirection: "row",
    backgroundColor: THEME.textMain,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  partnerLeft: { flexDirection: "row", alignItems: "center" },
  partnerAvatar: {
    width: 45, height: 45, borderRadius: 15,
    backgroundColor: THEME.secondaryBg,
    justifyContent: "center", alignItems: "center",
    marginRight: 15
  },
  partnerLabel: { color: "#AAA", fontSize: 10, fontWeight: "600" },
  partnerName: { color: "#FFF", fontSize: 14, fontWeight: "800" },
  callBtn: {
    width: 45, height: 45, borderRadius: 15,
    backgroundColor: THEME.primary,
    justifyContent: "center", alignItems: "center"
  },

  supportBtn: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: THEME.primary,
    alignItems: "center"
  },
  supportBtnText: { color: THEME.primary, fontWeight: "900", fontSize: 15 }
});