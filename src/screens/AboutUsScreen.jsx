import React from "react";
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
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

export default function AboutUsScreen() {
  const navigation = useNavigation();

  // Removed the ': string' type annotation here
  const openURL = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.headerTitle}>About Sadapoorna</Text>
          <View style={{ width: 42 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.heroContainer}>
            <Image
              source={{
                uri: "https://png.pngtree.com/thumb_back/fh260/background/20240923/pngtree-raw-organic-uncooked-white-rice-in-wooden-bowl-with-green-plant-image_16243933.jpg",
              }}
              style={styles.heroImage}
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.85)"]}
              style={styles.heroOverlay}
            >
              <Text style={styles.heroTag}>Trusted Name in Premium Rice</Text>
              <Text style={styles.heroTitle}>Sadapoorna Traders</Text>
            </LinearGradient>
          </View>

          <View style={styles.content}>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Organic & Healthy Rice</Text>
                <Text style={styles.paragraph}>
                  Sadapoorna is a premium rice brand dedicated to delivering the
                  purest and most authentic rice to households across India.
                </Text>
              </View>
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2023/09/25/16/18/agriculture-8275498_1280.jpg",
                }}
                style={styles.sideImage}
              />
            </View>

            <Text style={styles.sectionTitle}>What We Provide</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.serviceScroll}
            >
              <ServiceCard
                img="https://cdn.zeebiz.com/sites/default/files/2024/02/02/278961-rice-fp.png?im=FitAndFill=(848,477)&format=webp&quality=medium"
                title="Retail Sales"
              />
              <ServiceCard
                img="https://static.wixstatic.com/media/4733d6_432d243c8a404652bd56595b14aac186~mv2.jpg/v1/fill/w_280,h_280,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rice%20Distributors%20US.jpg"
                title="Wholesale Supply"
              />
              <ServiceCard
                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3J3DlGD2K8rycELQe7bGeR_3TN5KH5YzTdw&s"
                title="Custom Packing"
              />
            </ScrollView>

            <View style={styles.darkSection}>
              <Text style={[styles.sectionTitle, { color: "#FFF", textAlign: "center" }]}>
                The Agriculture Process
              </Text>
              <View style={styles.processRow}>
                <ProcessStep num="1" title="Planning" />
                <ProcessStep num="2" title="Growing" />
                <ProcessStep num="3" title="Harvesting" />
                <ProcessStep num="4" title="Processing" />
              </View>
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2023/06/22/04/19/rye-8080482_1280.jpg",
                }}
                style={styles.processImage}
              />
            </View>

            <Text style={styles.sectionTitle}>Customer Feedback</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.testimonialScroll}
            >
              <TestimonialCard
                name="Michelle Marry"
                text="The quality is consistently top-notch. Freshness and taste is far superior!"
              />
              <TestimonialCard
                name="Sarah Albert"
                text="Sadapoorna never disappoints! Feeding my family the healthiest food."
              />
            </ScrollView>

            <View style={styles.footerBrand}>
              <Image
                source={{ uri: "https://sadapoorna.in/icons/Group.png" }}
                style={styles.footerLogo}
              />
              <Text style={styles.footerText}>
                Rooted in tradition and driven by purity.
              </Text>
              
              <View style={styles.socialRow}>
                <Ionicons name="logo-facebook" size={22} color={THEME.textMuted} />
                <Ionicons name="logo-instagram" size={22} color={THEME.textMuted} style={{ marginHorizontal: 25 }} />
                <Ionicons name="logo-twitter" size={22} color={THEME.textMuted} />
              </View>

              <TouchableOpacity
                style={styles.managedByContainer}
                onPress={() => openURL("https://duniyape.in")}
              >
                <Text style={styles.managedByText}>Managed by</Text>
                <Image
                  source={{ uri: "https://duniyape.in/img/logo.png" }}
                  style={styles.duniyapeLogo}
                />
              </TouchableOpacity>

              <Text style={styles.copyright}>
                © 2026 SADAPOORNA TRADERS. All Rights Reserved.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// Removed ': any' from props below
const ServiceCard = ({ img, title }) => (
  <View style={styles.serviceCard}>
    <Image source={{ uri: img }} style={styles.serviceImg} />
    <Text style={styles.serviceTitle}>{title}</Text>
  </View>
);

const ProcessStep = ({ num, title }) => (
  <View style={styles.pStep}>
    <View style={styles.pCircle}>
      <Text style={styles.pNum}>{num}</Text>
    </View>
    <Text style={styles.pText}>{title}</Text>
  </View>
);

const TestimonialCard = ({ name, text }) => (
  <View style={styles.tCard}>
    <View style={styles.stars}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Ionicons key={s} name="star" size={12} color={THEME.accent} style={{marginRight: 2}} />
      ))}
    </View>
    <Text style={styles.tText}>{text}</Text>
    <Text style={styles.tName}>{name}</Text>
  </View>
);

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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
    paddingBottom: 15,
  },
  miniBack: {
    width: 42, height: 42, borderRadius: 14,
    backgroundColor: "#FFF", justifyContent: "center", alignItems: "center",
    elevation: 4, shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3,
  },
  headerTitle: { fontSize: 18, fontWeight: "900", color: THEME.textMain },
  heroContainer: { width: width, height: 220 },
  heroImage: { width: "100%", height: "100%", resizeMode: "cover" },
  heroOverlay: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    padding: 20, paddingTop: 40,
  },
  heroTag: { color: THEME.accent, fontSize: 10, fontWeight: "800", textTransform: "uppercase" },
  heroTitle: { color: "#FFF", fontSize: 26, fontWeight: "900" },
  content: { padding: 20 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  sideImage: { width: 110, height: 110, borderRadius: 20, marginLeft: 15 },
  sectionTitle: { fontSize: 20, fontWeight: "900", color: THEME.textMain, marginBottom: 12 },
  paragraph: { fontSize: 13, color: THEME.textMuted, lineHeight: 21 },
  serviceScroll: { marginBottom: 30 },
  serviceCard: { width: 150, marginRight: 15 },
  serviceImg: { width: 150, height: 110, borderRadius: 18, marginBottom: 8 },
  serviceTitle: { fontSize: 13, fontWeight: "800", textAlign: 'center', color: THEME.textMain },
  darkSection: { backgroundColor: "#1A1A1A", padding: 20, borderRadius: 25, marginBottom: 30 },
  processRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  pStep: { alignItems: "center" },
  pCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: THEME.primary, justifyContent: "center", alignItems: "center" },
  pNum: { color: "#FFF", fontSize: 12, fontWeight: "900" },
  pText: { color: "#AAA", fontSize: 10, marginTop: 6, fontWeight: '700' },
  processImage: { width: "100%", height: 150, borderRadius: 20 },
  testimonialScroll: { marginBottom: 30 },
  tCard: {
    width: width * 0.7, backgroundColor: "#FFF", padding: 20,
    borderRadius: 22, marginRight: 15, borderWidth: 1, borderColor: THEME.border,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5
  },
  stars: { flexDirection: "row", marginBottom: 10 },
  tText: { fontSize: 12, color: THEME.textMuted, fontStyle: "italic", marginBottom: 10, lineHeight: 18 },
  tName: { fontSize: 14, fontWeight: "800", color: THEME.textMain },
  footerBrand: { alignItems: "center", marginTop: 10, paddingBottom: 20 },
  footerLogo: { width: 140, height: 50, resizeMode: "contain", marginBottom: 15 },
  footerText: { textAlign: "center", fontSize: 12, color: THEME.textMuted, marginBottom: 20 },
  socialRow: { flexDirection: "row", marginBottom: 25 },
  managedByContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  managedByText: { fontSize: 11, color: THEME.textMuted, marginRight: 6, fontWeight: "600" },
  duniyapeLogo: { width: 70, height: 25, resizeMode: "contain" },
  copyright: { fontSize: 10, color: THEME.textMuted },
});