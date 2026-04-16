import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const THEME = {
  bg: "#FFFFFF",
  primary: "#EE2726",
  accent: "#eac15a",
  textMain: "#000000",
  textMuted: "#666666",
  border: "#EEEEEE",
  secondaryBg: "#f8efda",
};  

const Footer = () => (
    <View style={styles.footerBrand}>
      <TouchableOpacity onPress={() => Linking.openURL("https://sadapoorna.in")}>
        <Image
          source={{ uri: "https://sadapoorna.in/icons/Group.png" }}
          style={styles.footerLogo}
        />
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Rooted in tradition and driven by purity.
      </Text>

      {/* <View style={styles.socialRow}>
        <Ionicons name="logo-facebook" size={22} color={THEME.textMuted} />
        <Ionicons
          name="logo-instagram"
          size={22}
          color={THEME.textMuted}
          style={{ marginHorizontal: 25 }}
        />
        <Ionicons name="logo-twitter" size={22} color={THEME.textMuted} />
      </View> */}

        <TouchableOpacity 
                   activeOpacity={0.7}
                   onPress={() => Linking.openURL("https://duniyape.in")}
                   style={styles.managedByContainer}
                 >
                   <Text style={styles.managedByText}>
                     Managed by <Text style={styles.brandText}>Duniyape Technologies</Text>
                   </Text>
                   <Ionicons name="open-outline" size={12} color={THEME.textMuted} style={{ marginLeft: 4 }} />
        </TouchableOpacity>
     

      <Text style={styles.copyright}>
        © 2026 SADAPOORNA TRADERS. All Rights Reserved.
      </Text>
    </View>
  );

  
const styles = StyleSheet.create({
  footerBrand: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: THEME.secondaryBg,
    marginTop: 10,
  },
  footerLogo: {
    width: 140,
    height: 50,
    resizeMode: "contain",
    marginBottom: 5,
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  socialRow: { flexDirection: "row", marginBottom: 25 },
 managedByContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#F9F9F9", // Very subtle grey
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 15
  },
  managedByText: {
    fontSize: 11,
    color: THEME.textMuted,
    fontWeight: "500",
  },
  brandText: {
    color: THEME.primary, // Using your red for the brand name
    fontWeight: "700",
  },
  duniyapeLogo: { width: 70, height: 25, resizeMode: "contain" },
  copyright: { fontSize: 10, color: THEME.textMuted, marginBottom: 20 },
});

export default Footer
