import React ,{useState,useEffect} from "react";
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
  Alert,
  Linking
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
import useApi from "../context/useApi";

const THEME = {
  bg: "#FFFFFF",
  primary: "#EE2726",
  accent: "#eac15a",
  secondaryBg: "#f8efda",
  textMain: "#000000",
  textMuted: "#666666",
  border: "#EEEEEE",
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { logout } = useAuth();

 const [user, setUser] = useState(null);
  const { getRequest , postRequest } = useApi();

  const getInvoices = async () => {
    const res = await getRequest("/api/customer/profile");
    if (res.status) {
      setUser(res?.user || []);
      console.log("User Profile:", res?.user);
    } else {
      Alert.alert("Error", res.error || "Failed to fetch invoices");
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);
const getInitials = (name) => {
  if (!name) return '';

  const words = name.trim().split(' ').filter(Boolean);

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  const first = words[0][0];
  const last = words[words.length - 1][0];

  return (first + last).toUpperCase();
};

  // --- HANDLERS ---

  const handleSettings = () => {
    navigation.navigate('/settings'); // Matches App.jsx
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive", 
          onPress: async () =>logout()
        }
      ]
    );
  };

  const handleAbout = () => {
    navigation.navigate('/about-us'); // Matches App.jsx
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.secondBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.miniBack}>
            <Ionicons name="chevron-back" size={24} color={THEME.textMain} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
          {/* <TouchableOpacity style={styles.miniBack} onPress={handleSettings}>
            <Ionicons name="settings-outline" size={20} color={THEME.textMuted} />
          </TouchableOpacity> */}
          <View></View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* PROFILE HERO */}
          <View style={styles.profileHero}>
            <TouchableOpacity style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitials(user?.owner_name||user?.shop_name)}</Text>
              </View>
              {/* <View style={styles.cameraIcon}>
                <Ionicons name="camera" size={16} color="#FFF" />
              </View> */}
            </TouchableOpacity>
            {user?.shop_name && <Text style={styles.name}>{user?.shop_name.toUpperCase()} ✨</Text>}
            <Text style={styles.shop}>{user?.owner_name.toUpperCase()}</Text>
            <Text style={styles.email}>{user?.mobile}</Text>
          </View>

          {/* STATS */}
          {/* <View style={styles.statsBar}>
            <TouchableOpacity style={styles.statItem} onPress={() => navigation.navigate('/my-orders')}>
              <Text style={styles.statNum}>12</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.statItem, styles.statBorder]} onPress={() => navigation.navigate('/payments')}>
              <Text style={styles.statNum}>₹0</Text>
              <Text style={styles.statLabel}>Wallet</Text>
            </TouchableOpacity>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>450</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View> */}

          {/* MENUS */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Account Settings</Text>
            <View style={styles.menuCard}>
              {/* <MenuItem icon="person-outline" title="Edit Profile" onPress={() => {}} /> */}
              <MenuItem icon="location-outline" title="Delivery Address" sub={user?.address}  />
              <MenuItem icon="receipt-outline" title="My Billing" onPress={() => navigation.navigate('/my-bills')} />
              <MenuItem icon="notifications-outline" title="Notifications" onPress={() => navigation.navigate('/coming-soon', { title: 'Notifications' })} last />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Support</Text>
            <View style={styles.menuCard}>
              <MenuItem icon="help-circle-outline" title="Help Center" onPress={() => navigation.navigate('/help')} />
              <MenuItem icon="information-circle-outline" title="About Us" onPress={handleAbout} />
              <MenuItem icon="information-circle-outline" title="Privacy Policy" onPress={() => navigation.navigate('PrivacyPolicy')} />
              <MenuItem icon="information-circle-outline" title="Terms & Conditions" onPress={() => navigation.navigate('TermsAndConditions')} />
              <MenuItem icon="log-out-outline" title="Logout" color={THEME.primary} onPress={handleLogout} last />
            </View>
          </View>

          <Text style={styles.versionText}>Version 2.0.4</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const MenuItem = ({ icon, title, sub, color, onPress, last }) => (
  <TouchableOpacity onPress={onPress} style={[styles.menuItem, last && { borderBottomWidth: 0 }]}>
    <View style={styles.menuLeft}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={20} color={color || THEME.textMain} />
      </View>
      <View>
        <Text style={[styles.menuTitle, color && { color }]}>{title}</Text>
        {sub && <Text style={styles.menuSub}>{sub}</Text>}
      </View>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#DDD" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  secondBackground: { position: "absolute", top: 0, left: 0, right: 0, height: 300, backgroundColor: THEME.secondaryBg, zIndex: -1 },
  header: { flexDirection: "row", alignItems: "center",gap:20, paddingHorizontal: 20,     marginTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 10 : 10, paddingBottom: 15 },
  miniBack: { width: 40, height: 40, borderRadius: 12, backgroundColor: "#FFF", justifyContent: "center", alignItems: "center", elevation: 3 },
  headerTitle: { fontSize: 18, fontWeight: "900", color: THEME.textMain },
  scrollContent: { paddingBottom: 30 },
  profileHero: { alignItems: "center", marginVertical: 20 },
  avatarWrapper: { position: "relative", marginBottom: 15 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: THEME.primary, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: 36, fontWeight: "900", color: "#FFF" },
  cameraIcon: { position: "absolute", bottom: 0, right: 0, backgroundColor: "#000", width: 28, height: 28, borderRadius: 14, justifyContent: "center", alignItems: "center", borderSize: 2, borderColor: "#FFF" },
  name: { fontSize: 18, fontWeight: "900", color: THEME.textMain },
  shop: { fontSize: 16, fontWeight: "800", color: THEME.textMuted },
  email: { fontSize: 14, color: THEME.textMuted },
  statsBar: { flexDirection: "row", backgroundColor: "#FFF", marginHorizontal: 20, borderRadius: 15, padding: 15, elevation: 2, marginBottom: 20 },
  statItem: { flex: 1, alignItems: "center" },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: THEME.border },
  statNum: { fontSize: 16, fontWeight: "900" },
  statLabel: { fontSize: 12, color: THEME.textMuted },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionLabel: { fontSize: 12, fontWeight: "800", color: THEME.textMuted, marginBottom: 8, marginLeft: 5 },
  menuCard: { backgroundColor: "#FFF", borderRadius: 15, elevation: 1, overflow: "hidden" },
  menuItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 15, borderBottomWidth: 1, borderBottomColor: THEME.border },
  menuLeft: { flexDirection: "row", alignItems: "center" },
  iconCircle: { width: 35, height: 35, borderRadius: 10, backgroundColor: THEME.secondaryBg, justifyContent: "center", alignItems: "center", marginRight: 12 },
  menuTitle: { fontSize: 15, fontWeight: "600" },
  menuSub: { fontSize: 11, color: THEME.textMuted },
  versionText: { textAlign: "center", color: "#CCC", fontSize: 11, marginTop: 10 }
});