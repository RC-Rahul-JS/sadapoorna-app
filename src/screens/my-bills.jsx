
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useMemo } from "react";
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
  FlatList,
} from "react-native";
import useApi from "../context/useApi";
import { API_URL } from "../../config";
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const THEME = {
  bg: "#FFFFFF",
  primary: "#EE2726",
  secondaryBg: "#f8efda", // Soft cream
  textMain: "#1A1A1A",
  textMuted: "#888888",
  border: "#EEEEEE",
};

export default function MyBillsScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

  const { getRequest } = useApi();

  const getInvoices = async () => {
    const res = await getRequest("/api/my/invoices");
    if (res.status) setInvoices(res?.invoices || []);
  };

  useEffect(() => { getInvoices(); }, []);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((bill) =>
      bill?.invoiceNo?.toString().includes(searchQuery)
    );
  }, [searchQuery, invoices]);

  const toggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) setSearchQuery("");
  };

  const downloadBill = async (bill) => {
    try {
      const res = await fetch(API_URL + "/generate-pdf", {
        method: "POST",
        body: JSON.stringify(bill),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        const blob = await res.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          const base64data = reader.result.split(',')[1];
          const path = `${RNFS.CachesDirectoryPath}/INV_${bill.invoiceNo}.pdf`;
          await RNFS.writeFile(path, base64data, 'base64');
          await Share.open({ url: `file://${path}`, type: 'application/pdf' });
        };
      }
    } catch (e) { Alert.alert("Error", "Download failed"); }
  };

  if (selectedBill) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setSelectedBill(null)} style={styles.miniBack}>
              <Ionicons name="chevron-back" size={20} color={THEME.textMain} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Invoice Detail</Text>
            <TouchableOpacity onPress={() => downloadBill(selectedBill)} style={styles.miniBack}>
              <Ionicons name="share-outline" size={18} color={THEME.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.detailContainer}>
            <View style={styles.detailCard}>
              <View style={styles.detailHeader}>
                <View>
                  <Text style={styles.smallLabel}>INVOICE NO</Text>
                  <Text style={styles.detailId}>INV/{selectedBill.invoiceNo}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.smallLabel}>DATE</Text>
                  <Text style={styles.detailDate}>{new Date(selectedBill.billingdate).toLocaleDateString("en-GB")}</Text>
                </View>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.sectionTitle}>PARTICULARS</Text>
              {selectedBill.items?.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemName}>{item.description} ({item.pkg}kg)</Text>
                    <Text style={styles.itemQty}>{item.bags} Bags • Rate: ₹{item.rate * item.pkg}</Text>
                  </View>
                  <Text style={styles.itemPrice}>₹{item.amount}</Text>
                </View>
              ))}

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValueText}>₹{selectedBill.total}</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => downloadBill(selectedBill)}>
              <Ionicons name="cloud-download-outline" size={18} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.primaryBtnText}>Download PDF</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          {!isSearchActive ? (
            <>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.miniBack}>
                <Ionicons name="chevron-back" size={20} color={THEME.textMain} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>My Bills</Text>
              <TouchableOpacity onPress={toggleSearch} style={styles.miniBack}>
                <Ionicons name="search-outline" size={18} color={THEME.textMain} />
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.searchBar}>
              <TextInput
                placeholder="Search Invoice ID..."
                style={styles.searchInput}
                autoFocus
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity onPress={toggleSearch}>
                <Ionicons name="close-circle" size={18} color={THEME.textMuted} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <FlatList
          data={filteredInvoices}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item: bill }) => (
            <TouchableOpacity style={styles.miniCard} onPress={() => setSelectedBill(bill)}>
              <View style={styles.iconBox}>
                <Ionicons name="receipt-outline" size={18} color={THEME.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.row}>
                  <Text style={styles.billId}>#INV-{bill.invoiceNo}</Text>
                  <Text style={styles.billPrice}>₹{bill.total}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.billDate}>{new Date(bill.billingdate).toLocaleDateString("en-GB")}</Text>
                  <Text style={styles.viewLink}>View Details</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, height: 70,  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10, },
  headerTitle: { fontSize: 16, fontWeight: "700", color: THEME.textMain },
  miniBack: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#FFF", justifyContent: "center", alignItems: "center", elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5 },
  searchBar: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: "#F5F5F5", borderRadius: 10, paddingHorizontal: 10, height: 40 },
  searchInput: { flex: 1, fontSize: 14, color: THEME.textMain },

  // List Cards
  miniCard: { flexDirection: "row", backgroundColor: "#FFF", padding: 12, borderRadius: 15, marginBottom: 10, alignItems: "center", borderWidth: 1, borderColor: THEME.border },
  iconBox: { width: 40, height: 40, borderRadius: 10, backgroundColor: THEME.secondaryBg, justifyContent: "center", alignItems: "center", marginRight: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  billId: { fontSize: 14, fontWeight: "600", color: THEME.textMain },
  billPrice: { fontSize: 14, fontWeight: "700", color: THEME.primary },
  billDate: { fontSize: 11, color: THEME.textMuted },
  viewLink: { fontSize: 10, fontWeight: "700", color: "#CCC" },

  // Details
  detailContainer: { padding: 16 },
  detailCard: { backgroundColor: "#FFF", borderRadius: 15, padding: 16, borderWidth: 1, borderColor: THEME.border },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  smallLabel: { fontSize: 10, color: THEME.textMuted, fontWeight: "700", marginBottom: 2 },
  detailId: { fontSize: 14, fontWeight: "700", color: THEME.textMain },
  detailDate: { fontSize: 13, color: THEME.textMain },
  divider: { height: 1, backgroundColor: THEME.border, marginVertical: 15 },
  sectionTitle: { fontSize: 11, fontWeight: "800", color: THEME.textMuted, marginBottom: 12 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  itemName: { fontSize: 13, fontWeight: "600", color: THEME.textMain },
  itemQty: { fontSize: 11, color: THEME.textMuted, marginTop: 2 },
  itemPrice: { fontSize: 13, fontWeight: "600", color: THEME.textMain },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  totalLabel: { fontSize: 14, fontWeight: "700", color: THEME.textMain },
  totalValueText: { fontSize: 16, fontWeight: "800", color: THEME.primary },

  footerContainer: { padding: 16, borderTopWidth: 1, borderTopColor: THEME.border },
  primaryBtn: { backgroundColor: THEME.primary, height: 50, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  primaryBtnText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
});