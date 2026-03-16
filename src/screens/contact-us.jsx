import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const THEME = {
  bg: "#FFFFFF",
  primary: "#EE2726",
  accent: "#eac15a",
  secondaryBg: "#f8efda",
  textMain: "#000000",
  textMuted: "#666666",
  border: "#EEEEEE",
};

export default function ContactUsScreen() {
  const navigation = useNavigation();
  const phone1 = "7553524977";
  const email = "office@sadapoorna.in";

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleWhatsApp = () => {
    Linking.openURL(
      `whatsapp://send?phone=91${phone1}&text=Hello Sadapoorna Traders, I need help.`,
    );
  };

  const openURL = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <View style={styles.secondBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.miniBack}
          >
            <Ionicons name="chevron-back" size={24} color={THEME.textMain} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact Us</Text>
          <View style={{ width: 42 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* --- FIXED HERO SECTION --- */}
          <View style={styles.heroCard}>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/5945672/pexels-photo-5945672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              }}
              style={StyleSheet.absoluteFillObject} // Image ko poore card mein stretch karega
              resizeMode="cover"
            />
            {/* Dark overlay for text readability */}
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>Get in Touch</Text>
              <Text style={styles.heroSub}>We'd love to hear from you!</Text>
            </View>
          </View>

          {/* Contact Methods */}
          <View style={styles.infoRow}>
            <TouchableOpacity
              style={styles.infoCard}
              onPress={() => handleCall(phone1)}
            >
              <View style={[styles.iconCircle, { backgroundColor: "#E8F5E9" }]}>
                <Ionicons name="call" size={20} color="#2E7D32" />
              </View>
              <Text style={styles.infoLabel}>Call Us</Text>
              <Text style={styles.infoValue}>{phone1}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.infoCard} onPress={handleWhatsApp}>
              <View style={[styles.iconCircle, { backgroundColor: "#E1F5FE" }]}>
                <Ionicons name="logo-whatsapp" size={22} color="#0288D1" />
              </View>
              <Text style={styles.infoLabel}>WhatsApp</Text>
              <Text style={styles.infoValue}>Chat Now</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.longCard}
            onPress={() => openURL(`mailto:${email}`)}
          >
            <View style={[styles.iconCircle, { backgroundColor: "#FFF3E0" }]}>
              <Ionicons name="mail" size={20} color="#EF6C00" />
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>{email}</Text>
            </View>
          </TouchableOpacity>

          {/* Form Section */}
          <Text style={styles.sectionTitle}>Send us a Message</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor={THEME.textMuted}
          />
          <TextInput
            style={[styles.input, { height: 120, textAlignVertical: "top" }]}
            placeholder="How can we help you today?"
            placeholderTextColor={THEME.textMuted}
            multiline
          />

          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitText}>Submit Inquiry</Text>
            <Ionicons
              name="send"
              size={18}
              color="#FFF"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>

          {/* Partner Footer */}
          <View style={styles.footerBrand}>
            <TouchableOpacity
              style={styles.managedByContainer}
              onPress={() => openURL("https://duniyape.in")}
            >
              <Text style={styles.managedByText}>Technology Partner</Text>
              <Image
                source={{ uri: "https://duniyape.in/img/logo.png" }}
                style={styles.duniyapeLogo}
              />
            </TouchableOpacity>
            <Text style={styles.copyright}>© 2026 SADAPOORNA TRADERS.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  secondBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: THEME.secondaryBg,
    zIndex: -1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
    paddingBottom: 15,
  },
  miniBack: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  headerTitle: { fontSize: 20, fontWeight: "900", color: THEME.textMain },
  content: { padding: 20 },

  heroCard: {
    width: "100%",
    height: 160,
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 25,
    elevation: 5,
    backgroundColor: "#333", // Fallback color
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // Image ke upar halka dark layer
    justifyContent: "center",
    padding: 25,
  },
  heroTitle: { color: "#FFF", fontSize: 26, fontWeight: "900" },
  heroSub: { color: "#F0F0F0", fontSize: 14, fontWeight: "600" },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoCard: {
    width: "48%",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    elevation: 2,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  longCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    marginBottom: 25,
    elevation: 2,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: THEME.textMuted,
    marginTop: 5,
  },
  infoValue: { fontSize: 14, fontWeight: "800", color: THEME.textMain },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: THEME.textMain,
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: THEME.border,
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    fontSize: 14,
    color: THEME.textMain,
  },
  submitBtn: {
    backgroundColor: THEME.primary,
    padding: 18,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },
  submitText: { color: "#FFF", fontWeight: "900", fontSize: 16 },
  footerBrand: { alignItems: "center", marginTop: 40, paddingBottom: 20 },
  managedByContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  managedByText: {
    fontSize: 10,
    color: THEME.textMuted,
    marginRight: 5,
    fontWeight: "700",
  },
  duniyapeLogo: { width: 70, height: 25, resizeMode: "contain" },
  copyright: { fontSize: 10, color: THEME.textMuted },
});
