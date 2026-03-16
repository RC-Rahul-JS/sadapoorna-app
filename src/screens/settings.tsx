import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Switch,
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

export default function SettingsScreen() {
  const router = useRouter();
  const [notif, setNotif] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={THEME.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.content}>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Push Notifications</Text>
          <Switch
            value={notif}
            onValueChange={setNotif}
            trackColor={{ true: THEME.primary }}
          />
        </View>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>Change Language</Text>
          <Ionicons name="chevron-forward" size={20} color={THEME.textMuted} />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.settingRow}>
          <Text style={[styles.settingText, { color: THEME.primary }]}>
            Log Out
          </Text>
          <Ionicons name="log-out-outline" size={20} color={THEME.primary} />
        </TouchableOpacity>
      </View>
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
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  settingText: { fontSize: 16, fontWeight: "600", color: THEME.textMain },
  divider: { height: 1, backgroundColor: THEME.border },
});
