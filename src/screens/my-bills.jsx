import Ionicons from 'react-native-vector-icons/Ionicons';
// import RNPrint from 'react-native-print';
 // PDF Generation ke liye
import { useNavigation } from "@react-navigation/native";
// import Share from 'react-native-share';
import React, { useMemo, useState } from "react";
import {
  Alert,
  LayoutAnimation,
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

const THEME = {
  bg: "#FFFFFF",
  primary: "#EE2726",
  accent: "#eac15a",
  secondaryBg: "#f8efda",
  textMain: "#000000",
  textMuted: "#666666",
  border: "#EEEEEE",
};

const DUMMY_BILLS = [
  {
    id: "INV-2026-01",
    date: "10 Feb 2026",
    amount: 4500,
    type: "Grain Purchase",
  },
  { id: "INV-2026-02", date: "05 Feb 2026", amount: 1200, type: "Organic Oil" },
  {
    id: "INV-2026-03",
    date: "01 Feb 2026",
    amount: 2800,
    type: "Seeds & Spices",
  },
];

export default function MyBillsScreen() {
    const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  // --- PDF DOWNLOAD LOGIC ---
  const downloadBill = async (bill) => {
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 40px; color: #333;">
          <h1 style="color: #EE2726; text-align: center;">SadaPoorna Organics</h1>
          <hr />
          <div style="margin-top: 20px;">
            <p><strong>Invoice ID:</strong> ${bill.id}</p>
            <p><strong>Date:</strong> ${bill.date}</p>
            <p><strong>Category:</strong> ${bill.type}</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-top: 30px;">
            <tr style="background-color: #f8efda;">
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Description</th>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Amount</th>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">${bill.type} Payment</td>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹${bill.amount}</td>
            </tr>
          </table>
          <h2 style="text-align: right; margin-top: 20px;">Total: ₹${bill.amount}</h2>
          <p style="margin-top: 50px; text-align: center; color: #666; font-size: 12px;">
            Thank you for choosing SadaPoorna - Pure & Organic.
          </p>
        </body>
      </html>
    `;

    // try {
    //   const { uri } = await Print.printToFileAsync({ html: htmlContent });
    //   if (Platform.OS === "ios") {
    //     await Sharing.shareAsync(uri);
    //   } else {
    //     await Sharing.shareAsync(uri, {
    //       mimeType: "application/pdf",
    //       dialogTitle: "Download Invoice",
    //     });
    //   }
    // } catch (error) {
    //   Alert.alert("Error", "Could not generate PDF.");
    // }
  };

  const filteredBills = useMemo(() => {
    return DUMMY_BILLS.filter(
      (bill) =>
        bill.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.type.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const toggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.secondBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          {!isSearchActive ? (
            <>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.miniBack}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={THEME.textMain}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>My Bills</Text>
              <TouchableOpacity style={styles.miniBack} onPress={toggleSearch}>
                <Ionicons name="search" size={20} color={THEME.textMuted} />
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.searchBarContainer}>
              <TouchableOpacity
                onPress={toggleSearch}
                style={styles.searchBackBtn}
              >
                <Ionicons name="close" size={20} color={THEME.textMain} />
              </TouchableOpacity>
              <TextInput
                placeholder="Search Invoice ID..."
                style={styles.searchInput}
                autoFocus
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor={THEME.textMuted}
              />
            </View>
          )}
        </View>

        <View style={styles.content}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 40 }}
          >
            {filteredBills.map((bill) => (
              <View key={bill.id} style={styles.miniCard}>
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="document-text"
                    size={22}
                    color={THEME.accent}
                  />
                </View>

                <View style={styles.infoArea}>
                  <View style={styles.row}>
                    <Text style={styles.billId}>{bill.id}</Text>
                    <Text style={styles.priceText}>₹{bill.amount}</Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.subText}>
                      {bill.type} • {bill.date}
                    </Text>
                    <TouchableOpacity
                      style={styles.pdfBadge}
                      onPress={() => downloadBill(bill)} // Click par download trigger
                    >
                      <Ionicons
                        name="cloud-download-outline"
                        size={14}
                        color={THEME.primary}
                      />
                      <Text style={styles.pdfLabel}>PDF</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  secondBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  headerTitle: { fontSize: 20, fontWeight: "900", color: THEME.textMain },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 14,
    paddingHorizontal: 10,
    height: 45,
    elevation: 4,
  },
  searchBackBtn: { padding: 5, marginRight: 5 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: THEME.textMain,
  },
  content: { flex: 1, paddingHorizontal: 20 },
  miniCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 20,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.border,
    elevation: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFF9EA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoArea: { flex: 1 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  billId: { fontSize: 15, fontWeight: "800", color: THEME.textMain },
  priceText: { fontSize: 15, fontWeight: "900", color: THEME.primary },
  subText: { fontSize: 12, color: THEME.textMuted, fontWeight: "500" },
  pdfBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.primary + "10",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pdfLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: THEME.primary,
    marginLeft: 4,
  },
});
