import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
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

export default function SettingsScreen() {
  const navigation = useNavigation();
  
  // States for toggles
  const [notif, setNotif] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to exit?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => console.log("User Logged Out") }
    ]);
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
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 42 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Notifications Section */}
          <Text style={styles.sectionLabel}>Notifications</Text>
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.rowLeft}>
                <Ionicons name="notifications-outline" size={20} color={THEME.textMain} />
                <Text style={styles.settingText}>Push Notifications</Text>
              </View>
              <Switch
                value={notif}
                onValueChange={setNotif}
                trackColor={{ false: "#D1D1D1", true: THEME.primary }}
                thumbColor={Platform.OS === 'ios' ? undefined : "#FFF"}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.rowLeft}>
                <Ionicons name="mail-outline" size={20} color={THEME.textMain} />
                <Text style={styles.settingText}>Marketing Emails</Text>
              </View>
              <Switch
                value={marketing}
                onValueChange={setMarketing}
                trackColor={{ false: "#D1D1D1", true: THEME.primary }}
                thumbColor={Platform.OS === 'ios' ? undefined : "#FFF"}
              />
            </View>
          </View>

          {/* Preferences Section */}
          <Text style={styles.sectionLabel}>Preferences</Text>
          <View style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.rowLeft}>
                <Ionicons name="language-outline" size={20} color={THEME.textMain} />
                <Text style={styles.settingText}>Language</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.subText}>English</Text>
                <Ionicons name="chevron-forward" size={18} color={THEME.border} />
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.rowLeft}>
                <Ionicons name="location-outline" size={20} color={THEME.textMain} />
                <Text style={styles.settingText}>Default Address</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={THEME.border} />
            </TouchableOpacity>
          </View>

          {/* Account Actions */}
          <Text style={styles.sectionLabel}>Account</Text>
          <View style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow} onPress={handleLogout}>
              <View style={styles.rowLeft}>
                <Ionicons name="log-out-outline" size={20} color={THEME.primary} />
                <Text style={[styles.settingText, { color: THEME.primary }]}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.versionText}>Sadapoorna v2.0.4</Text>
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
    // Fix: Fallback for Status bar height
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
  
  sectionLabel: { 
    fontSize: 12, 
    fontWeight: "800", 
    color: THEME.textMuted, 
    textTransform: "uppercase", 
    marginTop: 20, 
    marginBottom: 10,
    marginLeft: 5
  },
  settingCard: {
    backgroundColor: "#FFF",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: THEME.border,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  settingText: { fontSize: 15, fontWeight: "700", color: THEME.textMain, marginLeft: 12 },
  subText: { fontSize: 14, color: THEME.textMuted, marginRight: 8, fontWeight: "600" },
  divider: { height: 1, backgroundColor: THEME.border },
  versionText: { textAlign: 'center', color: THEME.border, fontSize: 12, marginTop: 30, fontWeight: '700' }
});