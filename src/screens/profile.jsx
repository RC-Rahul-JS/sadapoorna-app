import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    SafeAreaView,
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

export default function ProfileScreen() {
 const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={THEME.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>R</Text>
          </View>
          <Text style={styles.name}>Rahul</Text>
          <Text style={styles.email}>rahulrc7089@gmail.com</Text>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>+91 ••••• ••••</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Delivery Address</Text>
            <Text style={styles.value}>Bhopal, Madhya Pradesh</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit Profile</Text>
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
  content: { padding: 20, alignItems: "center" },
  avatarContainer: { alignItems: "center", marginBottom: 30 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: THEME.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: { fontSize: 40, fontWeight: "900", color: "#FFF" },
  name: { fontSize: 24, fontWeight: "900", color: THEME.textMain },
  email: { fontSize: 14, color: THEME.textMuted, marginTop: 5 },
  detailsCard: {
    width: "100%",
    backgroundColor: THEME.cardBg,
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 20,
  },
  row: { paddingVertical: 10 },
  divider: { height: 1, backgroundColor: THEME.border, marginVertical: 5 },
  label: { fontSize: 12, color: THEME.textMuted, marginBottom: 5 },
  value: { fontSize: 16, fontWeight: "700", color: THEME.textMain },
  editBtn: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: THEME.primary,
    alignItems: "center",
  },
  editBtnText: { color: THEME.primary, fontWeight: "800", fontSize: 16 },
});
