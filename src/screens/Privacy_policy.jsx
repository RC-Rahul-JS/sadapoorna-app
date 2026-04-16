import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking
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

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <SafeAreaView style={{ flex: 1 }}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.miniBack}>
            <Ionicons name="chevron-back" size={20} color={THEME.textMain} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <View style={{ width: 36 }} /> 
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          
          <View style={styles.introBox}>
            <Text style={styles.appName}>Sadapoorna</Text>
            <Text style={styles.lastUpdated}>Effective Date: April 16, 2026</Text>
          </View>

          <PolicySection 
            title="1. Data Controller" 
            content="Sadapoorna ('we', 'us', or 'our') operates the Sadapoorna mobile application. This page informs you of our policies regarding the collection, use, and disclosure of personal data." 
          />

          <PolicySection 
            title="2. Information Collection & Use" 
            content="To provide a functional B2B experience, we collect:
• Personal Identifiers: Name, Mobile Number, and Shop Name.
• Location Data: Physical address for delivery fulfillment.
• Transaction Data: Billing history and invoice details." 
          />

          <PolicySection 
            title="3. Data Retention & Deletion" 
            content="We retain your information for as long as your account is active. Users have the right to request account and data deletion by contacting us at the email provided below. Requests are processed within 7 business days." 
          />

          <PolicySection 
            title="4. Service Providers" 
            content="We may employ third-party companies to facilitate our Service (e.g., Cloud Storage, SMS Gateways). These third parties have access to your Personal Data only to perform these tasks on our behalf." 
          />

          <PolicySection 
            title="5. Children's Privacy" 
            content="Our services are not intended for anyone under the age of 18. We do not knowingly collect identifiable information from children." 
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>For legal inquiries or data requests:</Text>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:office@sadapoorna.in')}>
              <Text style={styles.contactEmail}>office@sadapoorna.in</Text>
            </TouchableOpacity>
            
            <View style={styles.managedBy}>
                <Text style={styles.managedText}>Managed by Duniyape Technologies</Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const PolicySection = ({ title, content }) => (
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
    borderWidth: 1,
    borderColor: '#eac15a55'
  },
  appName: { fontSize: 16, fontWeight: "800", color: THEME.primary },
  lastUpdated: { fontSize: 11, color: THEME.textMuted, marginTop: 4 },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 13, fontWeight: "700", color: THEME.textMain, marginBottom: 5 },
  sectionContent: { fontSize: 12, color: THEME.textMuted, lineHeight: 18 },
  footer: { 
    marginTop: 10, 
    paddingVertical: 20, 
    borderTopWidth: 1, 
    borderTopColor: THEME.border, 
    alignItems: 'center' 
  },
  footerText: { fontSize: 11, color: THEME.textMuted },
  contactEmail: { fontSize: 13, fontWeight: "700", color: THEME.primary, marginTop: 4 },
  managedBy: { marginTop: 20 },
  managedText: { fontSize: 10, color: '#CCC', fontWeight: '500' }
});