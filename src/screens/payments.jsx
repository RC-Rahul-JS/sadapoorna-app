import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPrint from 'react-native-print';
import Share from 'react-native-share';
import { useNavigation } from "@react-navigation/native";

const THEME = {
  bg: "#FFFFFF",
  primary: "#EE2726",
  accent: "#eac15a",
  secondaryBg: "#f8efda",
  textMain: "#000000",
  textMuted: "#666666",
  border: "#EEEEEE",
};

export default function PaymentsScreen() {
  const navigation = useNavigation();

  const [currentDue, setCurrentDue] = useState(6000.0);
  const [payAmount, setPayAmount] = useState("6000");
  const [isCustom, setIsCustom] = useState(false);

  const [entries, setEntries] = useState([
    { date: "20/02/2026", particular: "Payment - Raju Rai", debit: "0.00", credit: "500.00", balance: "0.00" },
    { date: "14/02/2026", particular: "Payment - Bhagchad Nageshwar", debit: "0.00", credit: "520.00", balance: "500.00" },
    { date: "14/02/2026", particular: "Goods Sold - INV/1709", debit: "1020.00", credit: "0.00", balance: "1020.00" },
    { date: "08/02/2026", particular: "Payment - Bhagchad Nageshwar", debit: "0.00", credit: "1300.00", balance: "0.00" },
    { date: "01/05/2025", particular: "Opening Balance", debit: "0.00", credit: "0.00", balance: "0.00" },
  ]);

  useEffect(() => {
    if (!isCustom) setPayAmount(currentDue.toString());
  }, [currentDue, isCustom]);

  const handleRazorpay = () => {
    const amountToPay = parseFloat(payAmount);
    if (isNaN(amountToPay) || amountToPay <= 0) {
      Alert.alert("Error", "Sahi amount bharein.");
      return;
    }
    Alert.alert("Razorpay", `Confirm payment of ₹${amountToPay}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Pay",
        onPress: () => {
          const newDue = currentDue - amountToPay;
          const newEntry = {
            date: "21/02/2026",
            particular: "Payment Received - Razorpay",
            debit: "0.00",
            credit: amountToPay.toFixed(2),
            balance: newDue.toFixed(2),
          };
          setEntries([newEntry, ...entries]);
          setCurrentDue(newDue);
          Alert.alert("Success", "Payment successful!");
        },
      },
    ]);
  };

  // --- REACT NATIVE PRINT & SHARE ---
  const downloadStatement = async () => {
    const htmlContent = `
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1 style="color: #EE2726; text-align: center;">SADAPOORNA TRADERS</h1>
          <hr/>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #f8efda;">
              <th style="border: 1px solid #000; padding: 8px;">DATE</th>
              <th style="border: 1px solid #000; padding: 8px;">PARTICULAR</th>
              <th style="border: 1px solid #000; padding: 8px;">BALANCE</th>
            </tr>
            ${entries.map(e => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${e.date}</td>
                <td style="border: 1px solid #000; padding: 8px;">${e.particular}</td>
                <td style="border: 1px solid #000; padding: 8px;">${e.balance}</td>
              </tr>
            `).join("")}
          </table>
        </body>
      </html>
    `;

    try {
      // 1. Generate and Print/Save PDF
      const results = await RNPrint.print({
        html: htmlContent,
        fileName: 'Statement_Sadapoorna',
      });

      // 2. Share option (Optional: can also use react-native-share with base64 if needed)
      if (Platform.OS === 'android') {
        Alert.alert("PDF Generated", "Your statement is ready to print or save.");
      }
    } catch (error) {
      Alert.alert("Error", "Could not generate PDF");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.secondBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.miniBack}>
            <Ionicons name="chevron-back" size={24} color={THEME.textMain} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Statement & Payments</Text>

          <TouchableOpacity onPress={downloadStatement} style={styles.miniBack}>
            <Ionicons name="cloud-download" size={22} color={THEME.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.mainCard}>
            <Text style={styles.label}>Current Outstanding</Text>
            <Text style={styles.dueValue}>₹ {currentDue.toFixed(2)}</Text>
          </View>

          <View style={styles.paySection}>
            <Text style={styles.sectionTitle}>Quick Payment</Text>
            <View style={styles.optionRow}>
              <TouchableOpacity
                style={[styles.optionBtn, !isCustom && styles.activeBtn]}
                onPress={() => setIsCustom(false)}
              >
                <Text style={[styles.optionText, !isCustom && styles.activeText]}>Full Due</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionBtn, isCustom && styles.activeBtn]}
                onPress={() => { setIsCustom(true); setPayAmount(currentDue.toString()); }}
              >
                <Text style={[styles.optionText, isCustom && styles.activeText]}>Custom</Text>
              </TouchableOpacity>
            </View>

            {isCustom && (
              <TextInput
                style={styles.input}
                placeholder="₹ Amount"
                keyboardType="numeric"
                value={payAmount}
                onChangeText={setPayAmount}
              />
            )}

            <TouchableOpacity style={styles.razorBtn} onPress={handleRazorpay}>
              <Text style={styles.razorText}>Pay ₹{payAmount} via Razorpay</Text>
              <Ionicons name="flash" size={18} color="#FFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Account Particulars</Text>
          <View style={styles.table}>
            <View style={styles.thRow}>
              <Text style={[styles.th, { flex: 1.2 }]}>Date</Text>
              <Text style={[styles.th, { flex: 2.5 }]}>Particular</Text>
              <Text style={[styles.th, { flex: 1, textAlign: "right" }]}>Balance</Text>
            </View>
            {entries.map((entry, i) => (
              <View key={i} style={styles.tr}>
                <Text style={[styles.td, { flex: 1.2 }]}>{entry.date}</Text>
                <View style={{ flex: 2.5 }}>
                  <Text style={styles.tdMain}>{entry.particular}</Text>
                  <Text style={styles.tdSub}>Cr: {entry.credit} | Dr: {entry.debit}</Text>
                </View>
                <Text style={[styles.td, { flex: 1, textAlign: "right", fontWeight: "800" }]}>
                  ₹{entry.balance}
                </Text>
              </View>
            ))}
          </View>
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
  content: { paddingHorizontal: 20, paddingBottom: 30 },
  mainCard: {
    backgroundColor: "#FFF", padding: 20, borderRadius: 25,
    borderWidth: 1, borderColor: THEME.primary, marginBottom: 15,
  },
  label: { fontSize: 11, fontWeight: "800", color: THEME.textMuted, marginBottom: 5 },
  dueValue: { fontSize: 30, fontWeight: "900", color: THEME.primary },
  paySection: { backgroundColor: "#FFF", padding: 20, borderRadius: 25, marginBottom: 20, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: "900", marginBottom: 12, color: THEME.textMain },
  optionRow: { flexDirection: "row", marginBottom: 15 },
  optionBtn: { flex: 1, padding: 12, alignItems: "center", borderRadius: 12, backgroundColor: "#F5F5F5", marginRight: 8 },
  activeBtn: { backgroundColor: THEME.textMain },
  optionText: { fontSize: 12, fontWeight: "700", color: THEME.textMuted },
  activeText: { color: "#FFF" },
  input: { borderBottomWidth: 2, borderBottomColor: THEME.accent, padding: 10, fontSize: 18, fontWeight: "700", marginBottom: 15 },
  razorBtn: { backgroundColor: THEME.primary, height: 55, borderRadius: 15, justifyContent: "center", alignItems: "center", flexDirection: "row" },
  razorText: { color: "#FFF", fontWeight: "900", fontSize: 16 },
  table: { backgroundColor: "#FFF", borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: THEME.border },
  thRow: { flexDirection: "row", backgroundColor: THEME.secondaryBg, padding: 12 },
  th: { fontSize: 11, fontWeight: "900", color: THEME.textMuted },
  tr: { flexDirection: "row", padding: 12, borderBottomWidth: 1, borderBottomColor: THEME.border, alignItems: "center" },
  td: { fontSize: 11, fontWeight: "600" },
  tdMain: { fontSize: 12, fontWeight: "800", color: THEME.textMain },
  tdSub: { fontSize: 10, color: THEME.textMuted, fontWeight: "600" },
});