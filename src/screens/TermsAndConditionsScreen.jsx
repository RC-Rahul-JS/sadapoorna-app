import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const THEME = {
  bg: "#FFFFFF",
  primary: "#EE2726",
  secondaryBg: "#f8efda",
  textMain: "#1A1A1A",
  textMuted: "#666666",
  border: "#EEEEEE",
};

export default function TermsAndConditionsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <SafeAreaView style={{ flex: 1 }}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.miniBack}>
            <Ionicons name="chevron-back" size={20} color={THEME.textMain} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Terms & Conditions</Text>
          <View style={{ width: 36 }} /> 
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          
          <View style={styles.introBox}>
            <Text style={styles.introTitle}>User Agreement</Text>
            <Text style={styles.lastUpdated}>Effective as of April 16, 2026</Text>
          </View>

          <TncSection 
            title="1. Acceptance of Terms" 
            content="By downloading or using the Sadapoorna app, these terms will automatically apply to you. You should make sure that you read them carefully before using the app." 
          />

          <TncSection 
            title="2. Account Security" 
            content="Users are responsible for maintaining the confidentiality of their login credentials. Any activity performed under your account is your sole responsibility." 
          />

          <TncSection 
            title="3. B2B Commercial Use" 
            content="This app is intended for business-to-business transactions. You agree to provide accurate shop and GST information where applicable. We reserve the right to suspend accounts providing false information." 
          />

          <TncSection 
            title="4. Pricing and Payments" 
            content="While we strive for accuracy, pricing errors may occur. Sadapoorna reserves the right to cancel orders placed for products listed at an incorrect price." 
          />

          <TncSection 
            title="5. Intellectual Property" 
            content="The app itself, and all the trademarks, copyrights, and other intellectual property rights related to it, still belong to Sadapoorna and its partners." 
          />

          <TncSection 
            title="6. Limitation of Liability" 
            content="Sadapoorna will not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the service." 
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By using this app, you acknowledge that you have read and agree to these terms.
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const TncSection = ({ title, content }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionContent}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 16, 
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
    marginTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 10 : 10,
  },
  headerTitle: { fontSize: 15, fontWeight: "700", color: THEME.textMain },
  miniBack: { 
    width: 34, height: 34, borderRadius: 8, 
    backgroundColor: "#FFF", justifyContent: "center", 
    alignItems: "center", borderWidth: 1, borderColor: THEME.border
  },
  content: { padding: 20 },
  introBox: { 
    backgroundColor: THEME.secondaryBg, 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: THEME.primary
  },
  introTitle: { fontSize: 14, fontWeight: "800", color: THEME.textMain },
  lastUpdated: { fontSize: 11, color: THEME.textMuted, marginTop: 2 },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 13, fontWeight: "700", color: THEME.textMain, marginBottom: 5 },
  sectionContent: { fontSize: 12, color: THEME.textMuted, lineHeight: 18 },
  footer: { 
    marginTop: 10, 
    paddingVertical: 30, 
    borderTopWidth: 1, 
    borderTopColor: THEME.border
  },
  footerText: { 
    fontSize: 11, 
    color: THEME.textMuted, 
    textAlign: 'center', 
    fontStyle: 'italic' 
  },
});