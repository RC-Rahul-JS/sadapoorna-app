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
  Alert,
  Linking
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

export default function ProfileScreen() {
  const navigation = useNavigation();

  // --- FUNCTIONAL HANDLERS ---

  const handleEditProfile = () => {
    // navigation.navigate('EditProfile'); 
    Alert.alert("Edit Profile", "Redirecting to edit your personal details.");
  };

  const handleAddress = () => {
    Alert.alert("Address", "Your saved address is: Bhopal, MP. Would you like to change it?");
  };

  const handleBilling = () => {
    // This would navigate to the PaymentsScreen we built earlier
    navigation.navigate('Payments'); 
  };

  const handleSupport = () => {
    Linking.openURL('mailto:support@sadapoorna.in');
  };

  const handleAbout = () => {
    navigation.navigate('AboutUs');
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout from Sadapoorna?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive", 
          onPress: () => Alert.alert("Logged Out", "You have been successfully logged out.") 
        }
      ]
    );
  };

  const handleAvatarUpdate = () => {
    Alert.alert("Update Photo", "Choose from Gallery or Take a New Photo.");
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
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity style={styles.miniBack} onPress={() => Alert.alert("Settings", "App Settings coming soon!")}>
            <Ionicons name="settings-outline" size={20} color={THEME.textMuted} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.profileHero}>
            <TouchableOpacity onPress={handleAvatarUpdate} style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>R</Text>
              </View>
              <View style={styles.cameraIcon}>
                <Ionicons name="camera" size={16} color="#FFF" />
              </View>
            </TouchableOpacity>
            <Text style={styles.name}>Rahul ✨</Text>
            <Text style={styles.email}>rahulrc7089@gmail.com</Text>
          </View>

          <View style={styles.statsBar}>
            <TouchableOpacity style={styles.statItem} onPress={() => navigation.navigate('MyOrders')}>
              <Text style={styles.statNum}>12</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.statItem, styles.statBorder]} onPress={handleBilling}>
              <Text style={styles.statNum}>₹0</Text>
              <Text style={styles.statLabel}>Wallet</Text>
            </TouchableOpacity>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>450</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Account Settings</Text>
            <View style={styles.menuCard}>
              <MenuItem icon="person-outline" title="Edit Profile" onPress={handleEditProfile} />
              <MenuItem icon="location-outline" title="Delivery Address" sub="Bhopal, Madhya Pradesh" onPress={handleAddress} />
              <MenuItem icon="receipt-outline" title="My Billing & Statements" onPress={handleBilling} />
              <MenuItem icon="notifications-outline" title="Notifications" onPress={() => Alert.alert("Notifications", "No new alerts.")} last />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Support & Info</Text>
            <View style={styles.menuCard}>
              <MenuItem icon="help-circle-outline" title="Help Center" onPress={handleSupport} />
              <MenuItem icon="information-circle-outline" title="About Sadapoorna" onPress={handleAbout} />
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
  <TouchableOpacity 
    onPress={onPress} 
    activeOpacity={0.7} 
    style={[styles.menuItem, last && { borderBottomWidth: 0 }]}
  >
    <View style={styles.menuLeft}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={20} color={color || THEME.textMain} />
      </View>
      <View>
        <Text style={[styles.menuTitle, color && { color }]}>{title}</Text>
        {sub && <Text style={styles.menuSub}>{sub}</Text>}
      </View>
    </View>
    <Ionicons name="chevron-forward" size={18} color={THEME.border} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  secondBackground: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: THEME.secondaryBg, zIndex: -1 },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10, paddingBottom: 15,
  },
  miniBack: {
    width: 42, height: 42, borderRadius: 14, backgroundColor: "#FFF", justifyContent: "center", alignItems: "center",
    elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3,
  },
  headerTitle: { fontSize: 18, fontWeight: "900", color: THEME.textMain },
  scrollContent: { paddingBottom: 30 },
  profileHero: { alignItems: "center", marginVertical: 20 },
  avatarWrapper: { position: "relative", marginBottom: 15 },
  avatar: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: THEME.primary,
    justifyContent: "center", alignItems: "center", elevation: 10, shadowColor: THEME.primary, shadowOpacity: 0.3, shadowRadius: 10
  },
  avatarText: { fontSize: 40, fontWeight: "900", color: "#FFF" },
  cameraIcon: {
    position: "absolute", bottom: 0, right: 0, backgroundColor: THEME.textMain, width: 32, height: 32,
    borderRadius: 16, justifyContent: "center", alignItems: "center", borderWidth: 3, borderColor: "#FFF"
  },
  name: { fontSize: 24, fontWeight: "900", color: THEME.textMain },
  email: { fontSize: 14, color: THEME.textMuted, marginTop: 4 },
  statsBar: {
    flexDirection: "row", backgroundColor: "#FFF", marginHorizontal: 20, borderRadius: 20, padding: 20,
    elevation: 4, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, marginBottom: 25, borderWidth: 1, borderColor: THEME.border
  },
  statItem: { flex: 1, alignItems: "center" },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: THEME.border },
  statNum: { fontSize: 18, fontWeight: "900", color: THEME.textMain },
  statLabel: { fontSize: 12, color: THEME.textMuted, marginTop: 2 },
  section: { paddingHorizontal: 20, marginBottom: 25 },
  sectionLabel: { fontSize: 13, fontWeight: "800", color: THEME.textMuted, textTransform: "uppercase", marginBottom: 10, marginLeft: 5 },
  menuCard: { backgroundColor: "#FFF", borderRadius: 22, borderWidth: 1, borderColor: THEME.border, overflow: "hidden" },
  menuItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 15, borderBottomWidth: 1, borderBottomColor: THEME.border },
  menuLeft: { flexDirection: "row", alignItems: "center" },
  iconCircle: { width: 38, height: 38, borderRadius: 12, backgroundColor: THEME.secondaryBg, justifyContent: "center", alignItems: "center", marginRight: 15 },
  menuTitle: { fontSize: 15, fontWeight: "700", color: THEME.textMain },
  menuSub: { fontSize: 11, color: THEME.textMuted, marginTop: 2 },
  versionText: { textAlign: "center", color: THEME.border, fontSize: 12, fontWeight: "700" }
});