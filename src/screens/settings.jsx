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

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

// If you haven't run 'npm install react-native-maps', this might cause an error.
// I've added a try-catch style logic or a simple View replacement below.
let MapView;
try {
  MapView = require('react-native-maps').default;
} catch (e) {
  MapView = null; // Fallback to a View if not installed
}

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
  
  const [notif, setNotif] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to exit?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Logout", 
        style: "destructive", 
        onPress: () => navigation.replace('Login') 
      }
    ]);
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
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 42 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* LOCATION SECTION WITH FALLBACK */}
          <Text style={styles.sectionLabel}>Default Delivery Location</Text>
          <View style={styles.mapContainer}>
            {MapView ? (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 23.2599,
                  longitude: 77.4126,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
              />
            ) : (
              <View style={[styles.map, { backgroundColor: '#e2e2e2', justifyContent: 'center', alignItems: 'center' }]}>
                <Ionicons name="map-outline" size={40} color={THEME.textMuted} />
                <Text style={{color: THEME.textMuted, fontSize: 12}}>Map Module Not Installed</Text>
              </View>
            )}
            <View style={styles.mapOverlay}>
               <View>
                 <Text style={styles.mapText}>Bhopal, MP</Text>
                 <Text style={styles.mapSubText}>Arera Colony, Sector E</Text>
               </View>
               <TouchableOpacity style={styles.editLocBtn} onPress={() => Alert.alert("Location", "Location picker coming soon!")}>
                  <Text style={styles.editLocText}>Change</Text>
               </TouchableOpacity>
            </View>
          </View>

          {/* NOTIFICATIONS */}
          <Text style={styles.sectionLabel}>Notifications</Text>
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.rowLeft}>
                <View style={styles.iconBox}><Ionicons name="notifications-outline" size={18} color={THEME.primary} /></View>
                <Text style={styles.settingText}>Push Notifications</Text>
              </View>
              <Switch
                value={notif}
                onValueChange={setNotif}
                trackColor={{ false: "#D1D1D1", true: THEME.primary }}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.rowLeft}>
                <View style={styles.iconBox}><Ionicons name="mail-outline" size={18} color={THEME.primary} /></View>
                <Text style={styles.settingText}>Marketing Emails</Text>
              </View>
              <Switch
                value={marketing}
                onValueChange={setMarketing}
                trackColor={{ false: "#D1D1D1", true: THEME.primary }}
              />
            </View>
          </View>

          {/* PREFERENCES */}
          <Text style={styles.sectionLabel}>Preferences</Text>
          <View style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.rowLeft}>
                <View style={styles.iconBox}><Ionicons name="language-outline" size={18} color={THEME.textMain} /></View>
                <Text style={styles.settingText}>Language</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.subText}>English</Text>
                <Ionicons name="chevron-forward" size={18} color="#DDD" />
              </View>
            </TouchableOpacity>
          </View>

          {/* ACCOUNT */}
          <Text style={styles.sectionLabel}>Account</Text>
          <View style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow} onPress={handleLogout}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, {backgroundColor: '#ffebee'}]}><Ionicons name="log-out-outline" size={18} color={THEME.primary} /></View>
                <Text style={[styles.settingText, { color: THEME.primary }]}>Log Out</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={THEME.primary} />
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
  secondBackground: { position: "absolute", top: 0, left: 0, right: 0, height: 400, backgroundColor: THEME.secondaryBg, zIndex: -1 },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15,
  },
  miniBack: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: "#FFF", justifyContent: "center", alignItems: "center", elevation: 4
  },
  headerTitle: { fontSize: 18, fontWeight: "900", color: THEME.textMain },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionLabel: { fontSize: 12, fontWeight: "800", color: THEME.textMuted, textTransform: "uppercase", marginTop: 25, marginBottom: 12, marginLeft: 5 },
  
  mapContainer: { height: 200, borderRadius: 22, overflow: 'hidden', borderWidth: 1, borderColor: THEME.border, backgroundColor: '#FFF', elevation: 3 },
  map: { flex: 1 },
  mapOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.95)', padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mapText: { fontSize: 14, fontWeight: '800', color: THEME.textMain },
  mapSubText: { fontSize: 11, color: THEME.textMuted },
  editLocBtn: { backgroundColor: THEME.primary, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10 },
  editLocText: { color: '#FFF', fontSize: 12, fontWeight: '800' },

  settingCard: { backgroundColor: "#FFF", borderRadius: 22, paddingHorizontal: 15, elevation: 2, borderWidth: 1, borderColor: THEME.border },
  settingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 15 },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 32, height: 32, borderRadius: 8, backgroundColor: THEME.secondaryBg, justifyContent: 'center', alignItems: 'center' },
  settingText: { fontSize: 15, fontWeight: "700", color: THEME.textMain, marginLeft: 12 },
  subText: { fontSize: 14, color: THEME.textMuted, marginRight: 5, fontWeight: "600" },
  divider: { height: 1, backgroundColor: THEME.border },
  versionText: { textAlign: 'center', color: '#BBB', fontSize: 12, marginTop: 30, fontWeight: '700' }
});